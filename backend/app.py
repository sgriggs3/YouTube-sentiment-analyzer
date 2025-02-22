from flask import Flask, request, jsonify
from backend.youtube_api import fetch_comments
from backend.sentiment_analysis import analyze_sentiment
import os

app = Flask(__name__)

# YouTube API key
API_KEY = os.environ.get("YOUTUBE_API_KEY") 

if not API_KEY:
    raise ValueError("No YouTube API key found in environment variables. Please set YOUTUBE_API_KEY.")


@app.route('/comments')
def get_comments():
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({"error": "Missing video URL"}), 400

    video_id = extract_video_id(video_url) # Need to implement extract_video_id function
    if not video_id:
        return jsonify({"error": "Invalid YouTube URL"}), 400

    comments = fetch_comments(video_id, API_KEY)
    if comments is None:
        return jsonify({"error": "Failed to fetch comments from YouTube API"}), 500

    sentiment_results = analyze_sentiment(comments)
    return jsonify({
        "sentiment": sentiment_results,
        "comment_count": len(comments) # Added comment count here
    })

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
        pass # Handle any parsing errors, return None if extraction fails
    return video_id



if __name__ == '__main__':
    app.run(debug=True, port=5000)