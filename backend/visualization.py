import plotly.express as px

def visualize_sentiment(sentiment_data):
    labels = [item['sentiment'] for item in sentiment_data]
    fig = px.pie(values=labels, names=['positive', 'negative', 'neutral'])
    fig.update_layout(title='Sentiment Analysis')
    return fig.to_html()
