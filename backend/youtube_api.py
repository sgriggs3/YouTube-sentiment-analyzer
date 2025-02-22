from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from .exceptions import YouTubeAPIError, VideoNotFoundError, QuotaExceededError
import os
import googleapiclient.discovery
import googleapiclient.errors
import logging

logging.basicConfig(level=logging.ERROR)

def get_video_comments(video_id, api_key):
    try:
        youtube = build('youtube', 'v3', developerKey=api_key)
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')

youtube = googleapiclient.discovery.build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=YOUTUBE_API_KEY)
def get_video_comments(video_url):
    video_id = video_url.split('v=')[-1]
        comments = []
    try:
        request = youtube.commentThreads().list(
            part='snippet',
            videoId=video_id,
            maxResults=100,
            textFormat="plainText"
        )
        response = request.execute()

        for item in response['items']:
            comments.append(item['snippet']['topLevelComment']['snippet']['textDisplay'])

        # Handle pagination
        while 'nextPageToken' in response:
            request = youtube.commentThreads().list(
                part='snippet',
                videoId=video_id,
                maxResults=100,
                pageToken=response['nextPageToken'],
                textFormat="plainText"
            )
            response = request.execute()
        while response:
            for item in response['items']:
                comments.append(item['snippet']['topLevelComment']['snippet']['textDisplay'])
                comment = item['snippet']['topLevelComment']['snippet']['textDisplay']
                comments.append(comment)

        return comments

    except HttpError as e:
    except HttpError as e:
            if 'nextPageToken' in response:
                request = youtube.commentThreads().list(
                    part='snippet',
                    videoId=video_id,
                    pageToken=response['nextPageToken'],
                    maxResults=100,
                    textFormat="plainText"
                )
                response = request.execute()
            else:
                break

    except googleapiclient.errors.HttpError as e:
        logging.error(f"An HTTP error occurred: {e.resp.status} - {e.content}")
        return []
    except Exception as e:
        logging.error(f"An error occurred: {e}")
    return comments
        return []
