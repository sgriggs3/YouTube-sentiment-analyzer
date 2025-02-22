from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import logging
import os
import json
from datetime import datetime
from uuid import uuid4
from .youtube_api import create_youtube_client
from .sentiment_analysis import perform_sentiment_analysis, generate_sentiment_trends
from .data_visualization import (
    create_wordcloud,
    create_sentiment_distribution,
    create_engagement_visualization,
)
from .exceptions import (
    ConfigError,
    YouTubeAPIError,
    VideoNotFoundError,
    QuotaExceededError,
    InternalServerError,
    ServiceUnavailableError,
    BadRequestError
)

app = Flask(__name__)
CORS(app)

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s %(levelname)s: %(message)s',
        handlers=[
            logging.FileHandler('youtube_analyzer.log'),
            logging.StreamHandler()
        ]
    )
    return logging.getLogger(__name__)

logger = setup_logging()

# Load configuration and initialize APIs
config_path = os.path.join(os.path.dirname(__file__), '../config.json')
if not os.path.exists(config_path):
    logger.error(f"Config file not found at: {config_path}")
    raise ConfigError(f"Config file not found at: {config_path}")

try:
    with open(config_path, 'r') as f:
        config = json.load(f)
        api_keys = config.get('youtube_api_keys', [])
        if isinstance(config.get('youtube_api_key'), str):
            api_keys.append(config['youtube_api_key'])
except json.JSONDecodeError as e:
    logger.error(f"Failed to parse config file: {e}")
    raise ConfigError(f"Failed to parse config file: {e}")
except Exception as e:
    logger.error(f"Failed to load config: {e}")
    raise ConfigError(f"Failed to load config: {e}")

# Initialize YouTube API client
youtube_client = create_youtube_client(api_keys)
if not youtube_client:
    logger.error("Failed to initialize YouTube API client. Please check your API keys.")

def get_video_data(video_id):
    """Get all video data including metadata, comments, and analysis."""
    if not youtube_client:
        raise RuntimeError("YouTube API client not initialized")

    metadata = youtube_client.get_video_metadata(video_id)
    if not metadata:
        raise VideoNotFoundError(video_id)

    comments = youtube_client.get_video_comments(video_id)
    if not comments:
        logger.warning(f"No comments found for video ID: {video_id}")
        comments = []

    comment_texts = [comment['text'] for comment in comments]
    sentiment_results = perform_sentiment_analysis(comment_texts)

    timestamps = [datetime.fromisoformat(comment['timestamp'].replace('Z', '+00:00'))
                 for comment in comments]
    
    trends = generate_sentiment_trends(comment_texts, timestamps) if comments else []

    return {
        'metadata': metadata,
        'comments': comments,
        'sentiment_analysis': sentiment_results,
        'sentiment_trends': trends
    }

# Error handlers
@app.errorhandler(404)
def not_found(error):
    logger.warning(f"Route not found: {request.url}")
    return jsonify({'error': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({'error': 'Internal server error'}), 500

@app.errorhandler(400)
def bad_request(error):
    logger.warning(f"Bad request: {error}")
    return jsonify({'error': str(error)}), 400

@app.errorhandler(ConfigError)
def handle_config_error(error):
    logger.error(f"Configuration error: {error}")
    return jsonify({'error': str(error)}), 500

@app.errorhandler(YouTubeAPIError)
def handle_youtube_api_error(error):
    logger.error(f"YouTube API error: {error}")
    if error.status_code:
        return jsonify({'error': error.args[0]}), error.status_code
    return jsonify({'error': 'YouTube API error occurred'}), 500

@app.route('/api/analyze/<video_id>')
def analyze_video(video_id):
    """Main endpoint to analyze a video completely."""
    try:
        result = get_video_data(video_id)
        return jsonify(result)
    except VideoNotFoundError as e:
        return handle_youtube_api_error(e)
    except RuntimeError as e:
        return jsonify({'error': str(e)}), 503
    except Exception as e:
        logger.error(f"Error analyzing video: {e}")
        return jsonify({'error': 'Failed to analyze video'}), 500

@app.route('/api/visualizations/<video_id>')
def get_visualizations(video_id):
    """Generate and return visualization data."""
    try:
        result = get_video_data(video_id)
        
        # Generate visualization files
        viz_id = str(uuid4())
        wordcloud_path = f'temp/wordcloud_{viz_id}.html'
        sentiment_dist_path = f'temp/sentiment_dist_{viz_id}.html'
        engagement_path = f'temp/engagement_{viz_id}.html'

        create_wordcloud(result['comments'], wordcloud_path)
        create_sentiment_distribution(result['sentiment_analysis'], sentiment_dist_path)
        create_engagement_visualization(result['metadata'], engagement_path)

        return jsonify({
            'wordcloud_url': f'/static/{wordcloud_path}',
            'sentiment_distribution_url': f'/static/{sentiment_dist_path}',
            'engagement_url': f'/static/{engagement_path}'
        })
    except VideoNotFoundError as e:
        return handle_youtube_api_error(e)
    except Exception as e:
        logger.error(f"Error generating visualizations: {e}")
        return jsonify({'error': 'Failed to generate visualizations'}), 500

@app.route('/api/providers', methods=['GET'])
def get_providers():
    """Endpoint to fetch available API providers and models."""
    try:
        providers = {
            "OpenRouter": ["Model1", "Model2"],
            "Anthropic": ["ModelA", "ModelB"],
            "Google Gemini": ["ModelX", "ModelY"]
        }
        return jsonify(providers)
    except Exception as e:
        logger.error(f"Error fetching providers: {e}")
        return jsonify({'error': 'Failed to fetch providers'}), 500

@app.route('/api/settings', methods=['POST'])
def save_settings():
    """Endpoint to save user settings."""
    try:
        settings = request.json
        with open('user_settings.json', 'w') as f:
            json.dump(settings, f, indent=4)
        return jsonify({'message': 'Settings saved successfully'})
    except Exception as e:
        return jsonify({'error': 'Failed to save settings'}), 500

@app.route('/api/search', methods=['GET'])
def search_videos():
    """Endpoint to search videos based on a query."""
    query = request.args.get('q')
    if not query:
        return jsonify({'error': 'Search query is required'}), 400

    try:
        if not youtube_client:
            raise RuntimeError("YouTube API client not initialized")
        
        search_results = youtube_client.search_videos(query, max_results=10) # Call search_videos method in youtube_api.py
        return jsonify({'results': search_results})
    except RuntimeError as e:
        return jsonify({'error': str(e)}), 503
    except Exception as e:
        logger.error(f"Error during video search: {e}")
        return jsonify({'error': 'Failed to perform video search'}), 500

if __name__ == '__main__':
    is_production = os.environ.get('FLASK_ENV') == 'production'
    port = int(os.environ.get('PORT', 5000))
    
    if not os.path.exists('temp'):
        os.makedirs('temp')
        
    app.run(
        host='0.0.0.0',
        port=port,
        debug=not is_production
    )
