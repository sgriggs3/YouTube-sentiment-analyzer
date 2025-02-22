from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import logging

logging.basicConfig(level=logging.ERROR)

def get_video_comments(video_id, api_key):
    try:
        youtube = build('youtube', 'v3', developerKey=api_key)
        comments = []
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
            for item in response['items']:
                comments.append(item['snippet']['topLevelComment']['snippet']['textDisplay'])

        return comments

    except HttpError as e:
        logging.error(f"An HTTP error occurred: {e.resp.status} - {e.content}")
        return []
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return []