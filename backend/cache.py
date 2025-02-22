import redis
import json
from config import Config

redis_client = redis.from_url(Config.REDIS_URL)

def cache_results(key, data, timeout=Config.CACHE_TIMEOUT):
    redis_client.setex(key, timeout, json.dumps(data))

def get_cached_results(key):
    data = redis_client.get(key)
    return json.loads(data) if data else None

def cache_video_metadata(video_id, metadata):
    cache_key = f"video:{video_id}:metadata"
    cache_results(cache_key, metadata, timeout=3600)  # Cache metadata for 1 hour

def cache_video_comments(video_id, comments):
    cache_key = f"video:{video_id}:comments"
    cache_results(cache_key, comments, timeout=600)  # Cache comments for 10 minutes
