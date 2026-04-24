import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
key = os.getenv("GEMINI_API_KEY")
if not key:
    print("NO API KEY")
    exit()

try:
    client = genai.Client(api_key=key)
    models = client.models.list()
    supported = []
    for m in models:
        try:
            supported.append(m.name)
        except Exception:
            pass
    print("AVAILABLE MODELS:")
    for m in supported:
        if "gemini" in m.lower():
            print(f"- {m}")
except Exception as e:
    print(f"ERROR: {e}")
