from flask import Flask, request, jsonify
from youtube_api import get_video_comments
from sentiment_analysis import analyze_sentiment

app = Flask(__name__)

# Replace with your actual API key
API_KEY = "YOUR_API_KEY"

@app.route('/analyze', methods=['POST'])
def analyze_comments():
    try:
        video_id = request.json['video_id']
        if not video_id:
            return jsonify({'error': 'Video ID is required'}), 400

        comments = get_video_comments(video_id, API_KEY)
        if not comments:
            return jsonify({'message': 'No comments found for this video'}), 200 # Return 200 even if no comments

        sentiments = [analyze_sentiment(comment) for comment in comments]

        # Count the occurrences of each sentiment
        sentiment_counts = {}
        for sentiment in sentiments:
            sentiment_counts[sentiment] = sentiment_counts.get(sentiment, 0) + 1

        return jsonify({'sentiment_counts': sentiment_counts}), 200

    except KeyError:
        return jsonify({'error': 'Invalid request format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
