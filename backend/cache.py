import redis
import json
from config import Config

redis_client = redis.from_url(Config.REDIS_URL)

def cache_results(key, data, timeout=Config.CACHE_TIMEOUT):
    redis_client.setex(key, timeout, json.dumps(data))

def get_cached_results(key):
    data = redis_client.get(key)
    return json.loads(data) if data else None