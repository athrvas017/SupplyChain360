"""
routes/chat.py
==============
Gemini-powered supply-chain chatbot endpoint.

Loads all JSON knowledge-bases from backend/data/ and feeds them as context
so the LLM can answer precise questions about trade flows, HS codes,
country risk, BOM mappings, and specific companies.
"""
from __future__ import annotations

import json
import logging
import os
import asyncio
import random
from functools import lru_cache
from typing import Optional

from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

load_dotenv()
log = logging.getLogger("chat.route")

chat_router = APIRouter(prefix="/api/chat", tags=["chat"])

# ── Data loading (cached) ────────────────────────────────────────────────────
DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")


@lru_cache(maxsize=1)
def _load_knowledge_base() -> str:
    """Load all JSON files from backend/data/ and format as context."""
    knowledge = {}
    for fname in os.listdir(DATA_DIR):
        if fname.endswith(".json"):
            fpath = os.path.join(DATA_DIR, fname)
            try:
                with open(fpath, "r", encoding="utf-8") as f:
                    knowledge[fname] = json.load(f)
            except Exception as exc:
                log.warning(f"Failed to load {fname}: {exc}")

    sections = []

    # Country risk data
    if "country_risk.json" in knowledge:
        cr = knowledge["country_risk.json"]
        cr_clean = {k: v for k, v in cr.items() if not k.startswith("_")}
        sections.append(
            "## COUNTRY RISK DATABASE\n"
            "Each country has political_stability (-2.5 worst to 2.5 best), region, and trade_tension level.\n"
            f"{json.dumps(cr_clean, indent=2)}"
        )

    # HS code descriptions
    if "hs_descriptions.json" in knowledge:
        sections.append(
            "## HS CODE DESCRIPTIONS\n"
            "HS (Harmonized System) codes and their product descriptions:\n"
            f"{json.dumps(knowledge['hs_descriptions.json'], indent=2)}"
        )

    # BOM map
    if "hs_bom_map.json" in knowledge:
        bom = knowledge["hs_bom_map.json"]
        bom_clean = {k: v for k, v in bom.items() if not k.startswith("_")}
        sections.append(
            "## BILL OF MATERIALS (BOM) MAP\n"
            "Maps finished product HS codes to their upstream input HS codes:\n"
            f"{json.dumps(bom_clean, indent=2)}"
        )

    # Trade data
    if "mock_trade_data.json" in knowledge:
        td = knowledge["mock_trade_data.json"]
        companies = td.get("companies", {})
        sanctioned = td.get("sanctioned_entities", [])

        # Build concise company summaries
        company_summaries = []
        for name, info in companies.items():
            shipments = info.get("shipments", [])
            suppliers = [s["shipper"] for s in shipments] if shipments else []
            company_summaries.append({
                "name": name,
                "country": info.get("country"),
                "city": info.get("city"),
                "role": info.get("role"),
                "suppliers": suppliers,
                "shipment_count": sum(s.get("shipment_count", 0) for s in shipments),
                "products_received": [s.get("hs_description", "") for s in shipments],
            })

        sections.append(
            "## COMPANY & TRADE FLOW DATABASE\n"
            f"Total companies tracked: {len(companies)}\n"
            f"Sanctioned entities: {sanctioned}\n\n"
            f"{json.dumps(company_summaries, indent=2)}"
        )

    return "\n\n".join(sections)


# ── Gemini client (lazy-init) ────────────────────────────────────────────────
_gemini_client = None


def _get_gemini():
    global _gemini_client
    if _gemini_client is None:
        try:
            from google import genai
            key = os.getenv("GEMINI_API_KEY", "")
            if not key:
                log.error("GEMINI_API_KEY not set")
                return None
            _gemini_client = genai.Client(api_key=key)
        except Exception as exc:
            log.error("Failed to init Gemini: %s", exc)
            return None
    return _gemini_client


# ── Conversation memory (per-session, in-memory) ─────────────────────────────
_conversations: dict[str, list[dict]] = {}
MAX_HISTORY = 20  # keep last 20 messages per session


def _build_system_prompt() -> str:
    kb = _load_knowledge_base()
    return f"""You are SYN3RGY AI, an expert supply chain intelligence assistant built into the SYN3RGY platform.

You have access to a comprehensive knowledge base containing real trade data, company supply chains, HS codes, BOM mappings, country risk scores, and sanctioned entities.

YOUR CAPABILITIES:
- Answer questions about specific companies, their suppliers, and trade flows
- Explain HS codes and product categories  
- Analyze country risk profiles (political stability, trade tensions)
- Trace supply chain dependencies through BOM mappings
- Identify sanctioned entities and compliance risks
- Provide strategic supply chain insights and recommendations

RESPONSE STYLE:
- Be concise but comprehensive
- Use specific data from the knowledge base when available
- Format responses with markdown for readability (bold, lists, tables when helpful)
- When discussing risk, provide specific scores and data points
- If asked about something outside the knowledge base, say so honestly
- Use emojis sparingly for visual appeal (⚠️ for risks, ✅ for safe, 🔍 for analysis)

KNOWLEDGE BASE:
{kb}

Remember: You are a domain expert. Be authoritative and precise."""


# ── Request/Response models ──────────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = "default"


class ChatResponse(BaseModel):
    reply: str
    session_id: str
    sources_used: list[str]


# ── Chat endpoint ────────────────────────────────────────────────────────────
@chat_router.post("", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """
    Send a message to the SYN3RGY AI chatbot.
    Maintains conversation history per session_id.
    """
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    session_id = req.session_id or "default"

    # Get or create conversation history
    if session_id not in _conversations:
        _conversations[session_id] = []

    history = _conversations[session_id]
    history.append({"role": "user", "content": req.message})

    # Trim history if too long
    if len(history) > MAX_HISTORY:
        history = history[-MAX_HISTORY:]
        _conversations[session_id] = history

    # Build the full prompt with history
    system_prompt = _build_system_prompt()

    conversation_text = ""
    for msg in history:
        role = "User" if msg["role"] == "user" else "Assistant"
        conversation_text += f"\n{role}: {msg['content']}\n"

    full_prompt = f"""{system_prompt}

CONVERSATION HISTORY:
{conversation_text}

Respond to the user's latest message. Be helpful and precise."""

    # Call Gemini
    client = _get_gemini()
    if client is None:
        raise HTTPException(
            status_code=503,
            detail="AI service unavailable. Check GEMINI_API_KEY configuration."
        )

    reply_text = None
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-pro",
                contents=full_prompt,
            )
            reply_text = response.text.strip()
            break
        except Exception as exc:
            str_exc = str(exc).lower()
            if ("429" in str_exc or "503" in str_exc) and attempt < 2:
                wait = (attempt + 1) * 3 + random.uniform(0, 1)
                log.warning(f"Gemini busy. Retrying in {wait:.1f}s...")
                await asyncio.sleep(wait)
                continue
            log.error(f"Gemini error after {attempt + 1} attempts: {exc}")
            break

    if reply_text is None:
        reply_text = (
            "I'm experiencing high demand right now. Please try again in a moment. "
            "In the meantime, you can explore the dashboard for supply chain data."
        )

    # Save assistant response to history
    history.append({"role": "assistant", "content": reply_text})
    _conversations[session_id] = history

    # Determine which data sources were referenced
    sources = []
    msg_lower = req.message.lower()
    if any(kw in msg_lower for kw in ["country", "risk", "stability", "tension", "geopolitical"]):
        sources.append("country_risk.json")
    if any(kw in msg_lower for kw in ["hs", "code", "product", "tariff", "commodity"]):
        sources.append("hs_descriptions.json")
    if any(kw in msg_lower for kw in ["bom", "bill of materials", "upstream", "input", "component"]):
        sources.append("hs_bom_map.json")
    if any(kw in msg_lower for kw in ["company", "supplier", "shipment", "trade", "apple", "tesla", "tsmc",
                                        "samsung", "nike", "pfizer", "sanction"]):
        sources.append("mock_trade_data.json")
    if not sources:
        sources.append("general_knowledge")

    return ChatResponse(
        reply=reply_text,
        session_id=session_id,
        sources_used=sources,
    )


@chat_router.delete("/session/{session_id}")
async def clear_session(session_id: str):
    """Clear conversation history for a session."""
    removed = _conversations.pop(session_id, None)
    return {"cleared": session_id, "had_history": removed is not None}


@chat_router.get("/sessions")
async def list_sessions():
    """List active chat sessions."""
    return {
        "sessions": [
            {"id": sid, "message_count": len(msgs)}
            for sid, msgs in _conversations.items()
        ]
    }
