# backend/youtube_api.py
from googleapiclient.discovery import build

def fetch_comments(video_id, api_key):
    """
    Fetches YouTube comments for a given video ID using the YouTube API.

    Args:
        video_id (str): The ID of the YouTube video.
        api_key (str): The API key for YouTube Data API v3.

    Returns:
        list: A list of comment texts, or None if there's an error.
    """
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
        return comments
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

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
