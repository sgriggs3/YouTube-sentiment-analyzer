from textblob import TextBlob
import logging

logging.basicConfig(level=logging.INFO)

def analyze_sentiment(comment):
    try:
        analysis = TextBlob(comment)
        if analysis.sentiment.polarity > 0:
            return 'positive'
        elif analysis.sentiment.polarity < 0:
            return 'negative'
        else:
            return 'neutral'
    except Exception as e:
        logging.error(f"An error occurred during sentiment analysis: {e}")
        return 'neutral'  # Return neutral on error