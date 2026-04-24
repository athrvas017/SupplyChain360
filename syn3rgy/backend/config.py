"""
Configuration management for the Supply Chain Intelligence Platform.
Loads from .env file if available, falls back to defaults.
"""
import os
from dotenv import load_dotenv

load_dotenv()

# API Keys (optional — platform works with mock data without these)
OPENSANCTIONS_API_KEY = os.getenv("OPENSANCTIONS_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
HSN_API_KEY = os.getenv("HSN_API_KEY", "")
HSN_API_SECRET = os.getenv("HSN_API_SECRET", "")
COMTRADE_API_PRIMARY_KEY = os.getenv("COMTRADE_API_PRIMARY_KEY", "")
COMTRADE_API_SECONDARY_KEY = os.getenv("COMTRADE_API_SECONDARY_KEY", "")

# Server config
HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", "8000"))
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177,http://localhost:5178,http://localhost:5179,http://localhost:5180,http://127.0.0.1:5173,http://127.0.0.1:5174,http://127.0.0.1:5175,http://127.0.0.1:5176,http://127.0.0.1:5177,http://127.0.0.1:5178,http://127.0.0.1:5179,http://127.0.0.1:5180").split(",")

# Traversal defaults
MAX_TIERS = int(os.getenv("MAX_TIERS", "4"))
MAX_NODES_PER_TIER = int(os.getenv("MAX_NODES_PER_TIER", "15"))

# Data paths
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
GRAPH_PERSIST_PATH = os.path.join(DATA_DIR, "graph_cache.json")

# Feature flags
USE_MOCK_DATA = os.getenv("USE_MOCK_DATA", "true").lower() == "true"
USE_LIVE_SANCTIONS = os.getenv("USE_LIVE_SANCTIONS", "false").lower() == "true"

# Neo4j Config
NEO4J_URI = os.getenv("NEO4J_URI", "bolt://localhost:7687")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME", "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "")
NEO4J_DATABASE = os.getenv("NEO4J_DATABASE", "neo4j")
AURA_INSTANCEID = os.getenv("AURA_INSTANCEID", "")
AURA_INSTANCENAME = os.getenv("AURA_INSTANCENAME", "")
