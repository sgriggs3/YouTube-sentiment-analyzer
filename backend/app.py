from flask import Flask, request, jsonify
from backend.youtube_api import fetch_comments
from backend.sentiment_analysis import analyze_sentiment
import os
import logging
from backend.exceptions import YouTubeAPIError, VideoNotFoundError, QuotaExceededError, InternalServerError, ServiceUnavailableError, BadRequestError
import aiohttp
import asyncio

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# YouTube API key
API_KEY = os.environ.get("YOUTUBE_API_KEY") 

if not API_KEY:
    raise ValueError("No YouTube API key found in environment variables. Please set YOUTUBE_API_KEY.")


@app.route('/comments')
async def get_comments():
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({"error": "Missing video URL"}), 400

    video_id = extract_video_id(video_url)
    if not video_id:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    try:
        comments = await fetch_comments(video_id, API_KEY)
        if comments is None:
            return jsonify({"error": "Failed to fetch comments from YouTube API"}), 500

        sentiment_results = analyze_sentiment(comments)
        return jsonify({
            "sentiment": sentiment_results,
            "comment_count": len(comments)
        })
    except VideoNotFoundError as e:
        logging.error(f"Video not found for video_id {video_id}: {str(e)}")
        return jsonify({"error": "Video not found"}), e.status_code
    except QuotaExceededError as e:
        logging.error(f"Quota exceeded for video_id {video_id}: {str(e)}")
        return jsonify({"error": "Quota exceeded"}), e.status_code
    except InternalServerError as e:
        logging.error(f"Internal server error for video_id {video_id}: {str(e)}")
        return jsonify({"error": "Internal server error"}), e.status_code
    except ServiceUnavailableError as e:
        logging.error(f"Service unavailable for video_id {video_id}: {str(e)}")
        return jsonify({"error": "Service unavailable"}), e.status_code
    except BadRequestError as e:
        logging.error(f"Bad request for video_id {video_id}: {str(e)}")
        return jsonify({"error": "Bad request"}), e.status_code
    except YouTubeAPIError as e:
        logging.error(f"YouTube API error for video_id {video_id}: {str(e)}")
        return jsonify({"error": "YouTube API error"}), e.status_code
    except Exception as e:
        logging.error(f"Error during real-time analysis for video_id {video_id}: {str(e)}")
        return jsonify({"error": "An error occurred"}), 500

def extract_video_id(url):
    """
    Extracts video ID from a YouTube URL.
    """
    video_id = None
    try:
        from urllib.parse import urlparse, parse_qs
        parsed_url = urlparse(url)
        if parsed_url.hostname in ['www.youtube.com', 'youtube.com', 'm.youtube.com', 'youtu.be']:
            if parsed_url.hostname in ['www.youtube.com', 'youtube.com', 'm.youtube.com']:
                query_params = parse_qs(parsed_url.query)
                video_id = query_params.get('v', [None])[0]
            elif parsed_url.hostname == 'youtu.be':
                video_id = parsed_url.path[1:]
    except:
        pass
    return video_id

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() in ['true', '1', 't']
    app.run(debug=debug_mode, port=5000)
