"""
Supply Chain Intelligence Platform — FastAPI Application
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from config import HOST, PORT, CORS_ORIGINS
from routes.company import router as company_router
from routes.supply_chain import router as supply_chain_router
from routes.dashboard import router as dashboard_router
from routes.ai import router as ai_router
from routes.risk import risk_router
from routes.chat import chat_router
from routes.graph_library import router as graph_library_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    title="SYN3RGY — Supply Chain Intelligence",
    description=(
        "Multi-tier supply chain graph traversal with BOM filtering, "
        "risk scoring, and interactive visualization. "
        "Includes /api/v1/risk/country/{iso2} for Gemini-powered trade-risk intelligence."
    ),
    version="2.0.0",
    lifespan=lifespan,
)

# Broadly permissive CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routes
app.include_router(company_router)
app.include_router(supply_chain_router)
app.include_router(dashboard_router)
app.include_router(ai_router)
app.include_router(risk_router)
from routes.intelligence import router as intelligence_router
app.include_router(intelligence_router)
from routes.resilience import router as resilience_router
app.include_router(resilience_router)
app.include_router(chat_router)
app.include_router(graph_library_router)


@app.get("/")
async def root():
    return {
        "name": "SYN3RGY Supply Chain Intelligence",
        "version": "2.0.0",
        "status": "running",
        "docs": "/docs",
    }


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)
