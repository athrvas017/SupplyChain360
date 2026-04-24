import os
import base64
import json
from email.message import EmailMessage
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import logging

logger = logging.getLogger(__name__)

# If modifying these SCOPES, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.compose']

def get_gmail_service():
    """Authenticates and returns the Gmail service."""
    creds = None
    if os.path.exists('token.json'):
        # Using authorized user file saved during our manual OAuth callback flow
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            try:
                creds.refresh(Request())
            except:
                return None
        else:
            return None # Must go through our manual OAuth flow

    return build('gmail', 'v1', credentials=creds)

from engine.ai_engine import _safe_generate

async def generate_draft_content(company: str, score: float, context: str):
    """Generates professional risk report content without creating the draft yet."""
    prompt = f"""
    You are a Senior Strategic Risk Officer. 
    Write a professional executive alert regarding '{company}'.
     Resilience Score: {score}/10. 
    Context: {context}
    
    Return ONLY a JSON object with this structure:
    {{
        "subject": "...",
        "body": "..."
    }}
    Include 3 tactical actions in the body.
    """
    try:
        raw = await _safe_generate(prompt, model="gemini-2.5-flash")
        import re
        json_match = re.search(r'\{.*\}', raw, re.DOTALL)
        if json_match:
            return json.loads(json_match.group(0))
        return {
            "subject": f"🚨 [Syn3rgy Intel] Critical Resilience Update: {company}",
            "body": f"Urgent analysis required for {company}. Resilience posture has shifted to {score}/10."
        }
    except Exception as e:
        logger.error(f"Gemini draft generation error: {e}")
        return {
            "subject": f"Strategic Update: {company}",
            "body": "Manual review required for supply chain telemetry."
        }

async def send_final_email(to_email: str, subject: str, body: str):
    """Sends a professional alert email directly."""
    service = get_gmail_service()
    if not service:
        return False

    email_msg = EmailMessage()
    email_msg.set_content(body)
    email_msg['Subject'] = subject
    email_msg['To'] = to_email

    encoded_message = base64.urlsafe_b64encode(email_msg.as_bytes()).decode()

    send_body = {
        'raw': encoded_message
    }

    try:
        service.users().messages().send(userId="me", body=send_body).execute()
        return True
    except Exception as e:
        logger.error(f"Failed to send gmail: {e}")
        return False
