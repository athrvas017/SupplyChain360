import json
import redis
import os
from typing import Optional, Any
import logging

logger = logging.getLogger(__name__)

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD", None)
REDIS_URL = os.getenv("REDIS_URL", None)

class CacheManager:
    def __init__(self):
        try:
            if REDIS_URL:
                self.client = redis.Redis.from_url(REDIS_URL, decode_responses=True)
            else:
                self.client = redis.Redis(
                    host=REDIS_HOST,
                    port=REDIS_PORT,
                    password=REDIS_PASSWORD,
                    decode_responses=True,
                    socket_timeout=2
                )
            self.available = self.client.ping()
        except Exception as e:
            logger.warning(f"Redis not available: {e}")
            self.available = False

    def get(self, key: str) -> Optional[Any]:
        if not self.available:
            return None
        try:
            data = self.client.get(key)
            if data:
                return json.loads(data)
        except Exception as e:
            logger.error(f"Redis get error: {e}")
            self.available = False
        return None

    def set(self, key: str, value: Any, ttl: int = 3600):
        if not self.available:
            return
        try:
            self.client.set(key, json.dumps(value), ex=ttl)
        except Exception as e:
            logger.error(f"Redis set error: {e}")
            self.available = False

    def delete(self, key: str):
        if self.available:
            try:
                self.client.delete(key)
            except Exception as e:
                logger.error(f"Redis delete error: {e}")
                self.available = False

# Singleton
cache = CacheManager()
