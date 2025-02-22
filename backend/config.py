import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
    REDIS_URL = os.getenv('REDIS_URL', 'redis://redis:6379')
    POSTGRES_URL = os.getenv('POSTGRES_URL', 'postgresql://user:password@db:5432/sentiment')
    CACHE_TIMEOUT = 3600  # 1 hour