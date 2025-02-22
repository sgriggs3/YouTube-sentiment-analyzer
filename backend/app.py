from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_socketio import SocketIO
from .youtube_api import YouTubeAPI
from .sentiment_analysis import SentimentAnalyzer
from .exceptions import YouTubeAPIError, VideoNotFoundError, QuotaExceededError
import os
from dotenv import load_dotenv
# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY')
socketio = SocketIO(app)
limiter = Limiter(app, key_func=get_remote_address)

@app.route('/comments', methods=['GET'])
youtube_api = YouTubeAPI()
sentiment_analyzer = SentimentAnalyzer()

@app.errorhandler(YouTubeAPIError)
def handle_youtube_api_error(error):
    return jsonify({"error": str(error)}), error.status_code
@app.route('/api/analyze', methods=['POST'])
@limiter.limit("10/minute")
def get_comments():
    video_url = request.args.get('url')
def analyze_video():
    try:
        video_url = request.json.get('videoUrl')
    if not video_url:
        return jsonify({"error": "Missing video URL"}), 400
            return jsonify({"error": "Video URL is required"}), 400

    # Implement fetch_comments function
    comments = fetch_comments(video_url)
    return jsonify(comments)
    # Implement fetch_comments function
    comments = fetch_comments(video_url)
    return jsonify(comments)
        comments = youtube_api.get_video_comments(video_url)
        sentiment_results = sentiment_analyzer.analyze_comments(comments)
        return jsonify({
            "videoData": video_data,
            "sentimentResults": sentiment_results
        })
        return jsonify({
    except VideoNotFoundError:
        return jsonify({"error": "Video not found"}), 404
    except QuotaExceededError:
        return jsonify({"error": "YouTube API quota exceeded"}), 429
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    comments = data.get('comments')
    if not comments:
        return jsonify({"error": "Missing comments"}), 400

    # Implement analyze_sentiment function
    sentiment_data = analyze_sentiment(comments)
    return jsonify(sentiment_data)

@app.route('/results', methods=['GET'])
@limiter.limit("10/minute")
def get_results():
    video_id = request.args.get('video_id')
    if not video_id:
        return jsonify({"error": "Missing video ID"}), 400
    # Implement retrieve_results function
    # Implement analyze_sentiment function
    sentiment_data = analyze_sentiment(comments)
    return jsonify(sentiment_data)
    try:
        # Check cache first
        cached_results = get_cached_results(f"analysis:{video_id}")
        if cached_results:
            return jsonify(cached_results)
    except VideoNotFoundError:
@app.route('/results', methods=['GET'])
@limiter.limit("10/minute")
        # Perform sentiment analysis
        sentiment_data = analyze_sentiment(comments)
        
        # Store results in database
        db = next(get_db())
        analysis = Analysis(
            video_id=video_id,
            comments=comments,
            results=sentiment_data
        )
        db.add(analysis)
        db.commit()
        
        # Cache the results
        cache_results(f"analysis:{video_id}", sentiment_data)
        
        return jsonify(sentiment_data)
    except Exception as e:
        logging.error(f"Error analyzing comments: {e}")
        return jsonify({"error": "Failed to analyze comments"}), 500

@app.route('/api/results', methods=['GET'])
        return jsonify({"error": "YouTube API quota exceeded"}), 429
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@socketio.on('connect')
    # Implement retrieve_results function
    results = retrieve_results(video_id)
    return jsonify(results)
@socketio.on('connect')
def handle_connect():
    print('Client connected')
@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

    try:
        # Check cache first
        cached_results = get_cached_results(f"analysis:{video_id}")
        if cached_results:
            return jsonify(cached_results)

        # Retrieve from database
        db = next(get_db())
        analysis = db.query(Analysis).filter_by(video_id=video_id).first()
        
        if not analysis:
            return jsonify({"error": "Analysis not found"}), 404
            
        return jsonify(analysis.results)
    except Exception as e:
        logging.error(f"Error retrieving results: {e}")
        return jsonify({"error": "Failed to retrieve results"}), 500

    app.run(host='0.0.0.0', port=5000, debug=True)


# ... existing code...