from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from transformers import pipeline
import logging

logging.basicConfig(level=logging.INFO)

analyzer = SentimentIntensityAnalyzer()
nlp = pipeline('sentiment-analysis')
def analyze_sentiment(comments):
    sentiment_data = []
    for comment in comments:
        try:
            vader_result = analyzer.polarity_scores(comment)
            if vader_result['compound'] == 0:
                bert_result = nlp(comment)[0]
                sentiment = bert_result['label']
            else:
                sentiment = 'positive' if vader_result['compound'] > 0 else 'negative'
    except Exception as e:
        logging.error(f"An error occurred during sentiment analysis: {e}")
            sentiment = 'neutral'

        sentiment_data.append({
            'comment': comment,
            'sentiment': sentiment
        })

    return sentiment_data
