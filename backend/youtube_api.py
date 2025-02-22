# backend/youtube_api.py
from googleapiclient.discovery import build
from backend.cache import cache_results, get_cached_results
import hashlib

def fetch_comments(video_id, api_key):
    """
    Fetches YouTube comments for a given video ID using the YouTube API.

    Args:
        video_id (str): The ID of the YouTube video.
        api_key (str): The API key for YouTube Data API v3.

    Returns:
        list: A list of comment texts, or None if there's an error.
    """
    cache_key = f"video:{video_id}:comments"
    cached_comments = get_cached_results(cache_key)
    if cached_comments:
        return cached_comments

    try:
        youtube = build('youtube', 'v3', developerKey=api_key)
        comments = []
        request = youtube.commentThreads().list(
            part="snippet,replies",
            videoId=video_id,
            maxResults=100  # You can adjust maxResults as needed
        )
        while request:
            response = request.execute()

            for item in response['items']:
                comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
                comments.append(comment)

                if 'replies' in item:
                    for reply in item['replies']['comments']:
                        reply_comment = reply['snippet']['textDisplay']
                        comments.append(reply_comment)

            request = youtube.commentThreads().list_next(request, response)
        
        cache_results(cache_key, comments, timeout=600)  # Cache comments for 10 minutes
        return comments
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def fetch_video_metadata(video_id, api_key):
    """
    Fetches YouTube video metadata for a given video ID using the YouTube API.

    Args:
        video_id (str): The ID of the YouTube video.
        api_key (str): The API key for YouTube Data API v3.

    Returns:
        dict: A dictionary containing video metadata, or None if there's an error.
    """
    cache_key = f"video:{video_id}:metadata"
    cached_metadata = get_cached_results(cache_key)
    if cached_metadata:
        return cached_metadata

    try:
        youtube = build('youtube', 'v3', developerKey=api_key)
        request = youtube.videos().list(
            part="snippet,contentDetails,statistics",
            id=video_id
        )
        response = request.execute()
        if response['items']:
            metadata = response['items'][0]
            cache_results(cache_key, metadata, timeout=3600)  # Cache metadata for 1 hour
            return metadata
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def invalidate_cache(video_id):
    """
    Invalidates the cache for a given video ID.

    Args:
        video_id (str): The ID of the YouTube video.
    """
    cache_keys = [
        f"video:{video_id}:metadata",
        f"video:{video_id}:comments"
    ]
    for key in cache_keys:
        redis_client.delete(key)

if __name__ == '__main__':
    # Example usage (replace with your video ID and API key)
    video_id = "dQw4w9WgXcQ"  # Example video ID (Never Gonna Give You Up)
    api_key = "YOUR_API_KEY"  # Replace with your actual API key
    comments = fetch_comments(video_id, api_key)
    if comments:
        print(f"Fetched {len(comments)} comments:")
        for comment in comments:
            print(comment)
    else:
        print("Failed to fetch comments.")
    
    metadata = fetch_video_metadata(video_id, api_key)
    if metadata:
        print(f"Fetched metadata for video ID {video_id}:")
        print(metadata)
    else:
        print("Failed to fetch metadata.")
