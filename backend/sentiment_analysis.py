from transformers import pipeline
import numpy as np
from collections import defaultdict
import logging
import threading
from concurrent.futures import ThreadPoolExecutor
import torch

logger = logging.getLogger(__name__)

# Thread-local storage for sentiment analyzers
thread_local = threading.local()

def get_analyzers():
    """Get or initialize thread-local sentiment analyzers."""
    if not hasattr(thread_local, "analyzers"):
        try:
            device = 0 if torch.cuda.is_available() else -1
            thread_local.analyzers = {
                "transformer": pipeline("sentiment-analysis", model="bert-base-uncased", device=device),
                "aspect": pipeline("zero-shot-classification", model="roberta-base", device=device),
                "emotion": pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion", device=device)
            }
        except Exception as e:
            logger.error(f"Failed to initialize analyzers: {e}")
            raise
    return thread_local.analyzers

def analyze_sentiment(text):
    """
    Analyzes the sentiment, aspects, and emotions of a given text using multiple models.
    Returns combined analysis results.
    """
    if not text or not isinstance(text, str):
        return {
            "transformer": {"label": "NEUTRAL", "score": 0.5},
            "aspect": {"labels": [], "scores": []},
            "emotion": {"label": "neutral", "score": 0.5},
            "combined_score": 0
        }

    analyzers = get_analyzers()
    
    # Transformer sentiment analysis
    try:
        transformer_result = analyzers["transformer"](text)[0]
    except Exception as e:
        logger.error(f"Transformer sentiment analysis failed: {e}")
        transformer_result = {"label": "NEUTRAL", "score": 0.5}
    
    # Aspect-based sentiment analysis
    try:
        aspect_result = analyzers["aspect"](text, candidate_labels=["service", "price", "quality", "location"])
    except Exception as e:
        logger.error(f"Aspect-based analysis failed: {e}")
        aspect_result = {"labels": [], "scores": []}
    
    # Emotion detection
    try:
        emotion_result = analyzers["emotion"](text)[0]
    except Exception as e:
        logger.error(f"Emotion detection failed: {e}")
        emotion_result = {"label": "neutral", "score": 0.5}
    
    # Combine scores
    combined_score = (transformer_result["score"] + emotion_result["score"]) / 2

    return {
        "transformer": transformer_result,
        "aspect": aspect_result,
        "emotion": emotion_result,
        "combined_score": combined_score
    }

def analyze_comments_batch(comments, batch_size=32):
    """Analyze a batch of comments in parallel."""
    with ThreadPoolExecutor(max_workers=min(len(comments), 4)) as executor:
        results = list(executor.map(
            lambda comment: (comment, analyze_sentiment(comment)),
            comments
        ))
    return results

def perform_sentiment_analysis(comments):
    """
    Performs comprehensive sentiment analysis on a list of comments.
    Includes overall statistics and temporal analysis.
    """
    if not comments:
        return {
            "individual_results": [],
            "overall_stats": {},
            "temporal_analysis": {}
        }

    # Analyze comments in batches
    analyzed_comments = analyze_comments_batch(comments)
    
    # Calculate overall statistics
    sentiment_stats = defaultdict(int)
    scores = []
    
    for comment, analysis in analyzed_comments:
        combined_score = analysis["combined_score"]
        scores.append(combined_score)
        
        if combined_score >= 0.05:
            sentiment_stats["positive"] += 1
        elif combined_score <= -0.05:
            sentiment_stats["negative"] += 1
        else:
            sentiment_stats["neutral"] += 1
    
    total_comments = len(comments)
    overall_stats = {
        "total_comments": total_comments,
        "sentiment_distribution": {
            k: (v / total_comments) * 100 for k, v in sentiment_stats.items()
        },
        "average_sentiment": np.mean(scores) if scores else 0,
        "sentiment_variance": np.var(scores) if scores else 0
    }

    # Structure the results
    results = {
        "individual_results": [
            {
                "comment": comment,
                "analysis": analysis,
            } for comment, analysis in analyzed_comments
        ],
        "overall_stats": overall_stats,
    }

    return results

def generate_sentiment_trends(comments, timestamps):
    """
    Generate sentiment trends over time.
    Expects comments and their corresponding timestamps.
    """
    if not comments or not timestamps:
        return []
        
    # Sort comments by timestamp
    comment_times = sorted(zip(comments, timestamps))
    
    # Analyze sentiments with timestamps
    trends = []
    window_size = max(1, len(comments) // 10)  # Dynamic window size
    
    for i in range(0, len(comment_times), window_size):
        window = comment_times[i:i+window_size]
        window_comments = [w[0] for w in window]
        avg_timestamp = sum(w[1] for w in window) / len(window)
        
        # Analyze sentiment for the window
        sentiment_results = perform_sentiment_analysis(window_comments)
        
        trends.append({
            "timestamp": avg_timestamp,
            "average_sentiment": sentiment_results["overall_stats"]["average_sentiment"],
            "num_comments": len(window_comments)
        })
    
    return trends