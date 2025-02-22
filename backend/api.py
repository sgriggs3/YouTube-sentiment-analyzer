from flask import Flask, jsonify, request
from flask_restful import Api, Resource
import logging
from backend.exceptions import YouTubeAPIError, VideoNotFoundError, QuotaExceededError, InternalServerError, ServiceUnavailableError, BadRequestError
from backend.youtube_api import fetch_comments, fetch_video_metadata
from backend.sentiment_analysis import analyze_sentiment
from backend.database import get_db, Video, Comment
import asyncio

app = Flask(__name__)
api = Api(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

class RealTimeAnalyze(Resource):
    async def get(self, video_id):
        try:
            async with get_db() as db:
                video = db.query(Video).filter(Video.id == video_id).first()
                if not video:
                    raise VideoNotFoundError()

                comments = [comment.text for comment in video.comments]
                sentiment_results = analyze_sentiment(comments)
                analysis_result = {
                    "video_id": video_id,
                    "sentiment": sentiment_results,
                    "comment_count": len(comments)
                }
                return jsonify(analysis_result)
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
            return jsonify({"error": "An error occurred during real-time analysis"}), 500

# Add the new endpoint for real-time comment analysis
api.add_resource(RealTimeAnalyze, '/api/realtime_analyze/<string:video_id>')

# Example of another endpoint with robust error handling
class ExampleEndpoint(Resource):
    def get(self):
        try:
            # Placeholder for some logic
            data = {"message": "This is an example endpoint"}
            return jsonify(data)
        except Exception as e:
            logging.error(f"Error in ExampleEndpoint: {str(e)}")
            return jsonify({"error": "An error occurred in the example endpoint"}), 500

api.add_resource(ExampleEndpoint, '/api/example')

if __name__ == '__main__':
    import os
    debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() in ['true', '1', 't']
    app.run(debug=debug_mode)
