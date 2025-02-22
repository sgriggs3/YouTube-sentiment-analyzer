import unittest
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

    def test_analyze_sentiment_positive(self):
        result = analyze_sentiment("This is absolutely amazing!")
        self.assertGreater(result["combined_score"], 0)
        self.assertGreater(result["vader"]["compound"], 0)

    def test_analyze_sentiment_negative(self):
        result = analyze_sentiment("This is terrible and awful!")
        self.assertLess(result["combined_score"], 0)
        self.assertLess(result["vader"]["compound"], 0)

    def test_analyze_sentiment_neutral(self):
        result = analyze_sentiment("This is a video.")
        self.assertTrue(-0.1 <= result["combined_score"] <= 0.1)
        
    def test_analyze_sentiment_empty_input(self):
        result = analyze_sentiment("")
        self.assertEqual(result["combined_score"], 0)
        self.assertEqual(result["vader"]["compound"], 0)

    def test_analyze_sentiment_invalid_input(self):
        result = analyze_sentiment(None)
        self.assertEqual(result["combined_score"], 0)
        self.assertEqual(result["vader"]["compound"], 0)

    def test_perform_sentiment_analysis_batch(self):
        results = perform_sentiment_analysis(self.test_comments)
        
        self.assertIn("individual_results", results)
        self.assertIn("overall_stats", results)
        
        stats = results["overall_stats"]
        self.assertEqual(stats["total_comments"], len(self.test_comments))
        self.assertIn("sentiment_distribution", stats)
        self.assertIn("average_sentiment", stats)
        self.assertIn("sentiment_variance", stats)

    def test_perform_sentiment_analysis_empty_input(self):
        results = perform_sentiment_analysis([])
        self.assertEqual(results["overall_stats"].get("total_comments", 0), 0)

    def test_generate_sentiment_trends(self):
        trends = generate_sentiment_trends(self.test_comments, self.timestamps)
        
        self.assertIsInstance(trends, list)
        self.assertGreater(len(trends), 0)
        
        for trend in trends:
            self.assertIn("timestamp", trend)
            self.assertIn("average_sentiment", trend)
            self.assertIn("num_comments", trend)

    def test_generate_sentiment_trends_empty_input(self):
        trends = generate_sentiment_trends([], [])
        self.assertEqual(trends, [])

if __name__ == '__main__':
    unittest.main()
