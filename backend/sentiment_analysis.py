# backend/sentiment_analysis.py
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(comments):
    """
    Analyzes sentiment of a list of comments using vaderSentiment.

    Args:
        comments (list): List of comment texts.

    Returns:
        dict: Sentiment analysis results, including counts for positive, negative, and neutral comments.
    """
    positive_count = 0
    negative_count = 0
    neutral_count = 0

    for comment in comments:
        vs = analyzer.polarity_scores(comment)
        if vs['compound'] >= 0.05:
            positive_count += 1
        elif vs['compound'] <= -0.05:
            negative_count += 1
        else:
            neutral_count += 1

    return {
        'positive': positive_count,
        'negative': negative_count,
        'neutral': neutral_count
    }

if __name__ == '__main__':
    # Example usage
    comments = [
        "This video is awesome!",
        "I absolutely hated it.",
        "It was okay, I guess.",
        "The best video ever!",
        "Terrible and boring."
    ]
    sentiment_results = analyze_sentiment(comments)
    print("Sentiment Analysis Results:")
    print(sentiment_results)
