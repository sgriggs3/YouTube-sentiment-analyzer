import unittest
import pytest
from backend.sentiment_analysis import (
    analyze_sentiment,
    perform_sentiment_analysis,
    generate_sentiment_trends
)
import time

class TestSentimentAnalysis(unittest.TestCase):
    def setUp(self):
        self.test_comments = [
            "I absolutely love this video! Amazing content!",
            "This is the worst video I've ever seen.",
            "The video was okay, nothing special.",
            "Great insights and very well explained.",
        ]
        self.timestamps = [
            time.time(),
            time.time() + 60,
            time.time() + 120,
            time.time() + 180
        ]
def test_analyze_sentiment():
    comments = ["I love this video!", "This is the worst video ever."]
    sentiment_data = analyze_sentiment(comments)
    assert len(sentiment_data) == 2
    assert sentiment_data[0]['sentiment'] == 'positive'
    assert sentiment_data[1]['sentiment'] == 'negative'

    def test_analyze_sentiment_positive(self):
def test_analyze_sentiment_positive():
        result = analyze_sentiment("This is absolutely amazing!")
        self.assertGreater(result["combined_score"], 0)
        self.assertGreater(result["combined_score"], 0)
        self.assertGreater(result["vader"]["compound"], 0)
    assert result["combined_score"] > 0
    assert result["vader"]["compound"] > 0
    assert result["vader"]["compound"] > 0
    def test_analyze_sentiment_negative(self):
def test_analyze_sentiment_negative():
    def test_analyze_sentiment_negative(self):
        self.assertLess(result["combined_score"], 0)
        self.assertLess(result["vader"]["compound"], 0)
    assert result["combined_score"] < 0
    assert result["vader"]["compound"] < 0
        self.assertLess(result["combined_score"], 0)
    def test_analyze_sentiment_neutral(self):
def test_analyze_sentiment_neutral():
    assert result["combined_score"] < 0
        self.assertTrue(-0.1 <= result["combined_score"] <= 0.1)
    assert -0.1 <= result["combined_score"] <= 0.1

    def test_analyze_sentiment_empty_input(self):
def test_analyze_sentiment_empty_input():
def test_analyze_sentiment_neutral():
        self.assertEqual(result["combined_score"], 0)
        self.assertEqual(result["vader"]["compound"], 0)
    assert result["combined_score"] == 0
    assert result["vader"]["compound"] == 0
    assert -0.1 <= result["combined_score"] <= 0.1
    def test_analyze_sentiment_invalid_input(self):
def test_analyze_sentiment_invalid_input():
    def test_analyze_sentiment_empty_input(self):
        self.assertEqual(result["combined_score"], 0)
        self.assertEqual(result["vader"]["compound"], 0)
    assert result["combined_score"] == 0
    assert result["vader"]["compound"] == 0
        self.assertEqual(result["combined_score"], 0)
        self.assertEqual(result["vader"]["compound"], 0)
    assert result["combined_score"] == 0
    assert result["vader"]["compound"] == 0

    def test_analyze_sentiment_invalid_input(self):
def test_analyze_sentiment_invalid_input():
        result = analyze_sentiment(None)
        self.assertEqual(result["combined_score"], 0)
        self.assertEqual(result["vader"]["compound"], 0)
    assert result["combined_score"] == 0
    assert result["vader"]["compound"] == 0

    def test_perform_sentiment_analysis_batch(self):
        results = perform_sentiment_analysis(self.test_comments)
def test_perform_sentiment_analysis_batch():
    test_comments = [
        "I absolutely love this video! Amazing content!",
        "This is the worst video I've ever seen.",
        "The video was okay, nothing special.",
        "Great insights and very well explained.",
    ]
    results = perform_sentiment_analysis(test_comments)

        self.assertIn("individual_results", results)
        self.assertIn("overall_stats", results)
    assert "individual_results" in results
    assert "overall_stats" in results

        stats = results["overall_stats"]
        self.assertEqual(stats["total_comments"], len(self.test_comments))
        self.assertIn("sentiment_distribution", stats)
        self.assertIn("average_sentiment", stats)
        self.assertIn("sentiment_variance", stats)
    assert stats["total_comments"] == len(test_comments)
    assert "sentiment_distribution" in stats
    assert "average_sentiment" in stats
    assert "sentiment_variance" in stats

    def test_perform_sentiment_analysis_empty_input(self):
def test_perform_sentiment_analysis_empty_input():
        results = perform_sentiment_analysis([])
        self.assertEqual(results["overall_stats"].get("total_comments", 0), 0)
    assert results["overall_stats"].get("total_comments", 0) == 0

    def test_generate_sentiment_trends(self):
        trends = generate_sentiment_trends(self.test_comments, self.timestamps)
def test_generate_sentiment_trends():
    test_comments = [
        "I absolutely love this video! Amazing content!",
        "This is the worst video I've ever seen.",
        "The video was okay, nothing special.",
        "Great insights and very well explained.",
    ]
    timestamps = [
        time.time(),
        time.time() + 60,
        time.time() + 120,
        time.time() + 180
    ]
    trends = generate_sentiment_trends(test_comments, timestamps)

        self.assertIsInstance(trends, list)
        self.assertGreater(len(trends), 0)
    assert isinstance(trends, list)
    assert len(trends) > 0

        for trend in trends:
            self.assertIn("timestamp", trend)
            self.assertIn("average_sentiment", trend)
            self.assertIn("num_comments", trend)
        assert "timestamp" in trend
        assert "average_sentiment" in trend
        assert "num_comments" in trend

    def test_generate_sentiment_trends_empty_input(self):
def test_generate_sentiment_trends_empty_input():
        trends = generate_sentiment_trends([], [])
        self.assertEqual(trends, [])

    assert trends == []
if __name__ == '__main__':
    unittest.main()
    pytest.main()