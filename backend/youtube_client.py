from googleapiclient.discovery import build
from config import Config
import logging

def get_youtube_client():
    try:
        return build('youtube', 'v3', developerKey=Config.YOUTUBE_API_KEY)
    except Exception as e:
        logging.error(f"Failed to initialize YouTube client: {e}")
        raise