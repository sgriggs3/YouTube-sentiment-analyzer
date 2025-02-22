import unittest
import os
import json
from datetime import datetime
from backend.data_visualization import (
    create_wordcloud,
    create_sentiment_distribution,
    create_engagement_visualization,
    create_sentiment_trends_visualization
)

class TestDataVisualization(unittest.TestCase):
    def setUp(self):
        self.test_dir = 'test_output'
        if not os.path.exists(self.test_dir):
            os.makedirs(self.test_dir)

        # Sample test data
        self.comments = [
            {'text': 'Great video', 'timestamp': '2024-02-17T10:00:00Z'},
            {'text': 'This was awful', 'timestamp': '2024-02-17T10:01:00Z'},
            {'text': 'Interesting content', 'timestamp': '2024-02-17T10:02:00Z'}
        ]

        self.sentiment_results = {
            'overall_stats': {
                'total_comments': 3,
                'sentiment_distribution': {
                    'positive': 40.0,
                    'negative': 30.0,
                    'neutral': 30.0
                },
                'average_sentiment': 0.15,
                'sentiment_variance': 0.25
            }
        }

        self.metadata = {
            'statistics': {
                'viewCount': '1000',
                'likeCount': '100',
                'commentCount': '50'
            }
        }

        self.trends = [
            {
                'timestamp': datetime(2024, 2, 17, 10, 0).timestamp(),
                'average_sentiment': 0.5,
                'num_comments': 10
            },
            {
                'timestamp': datetime(2024, 2, 17, 10, 1).timestamp(),
                'average_sentiment': -0.2,
                'num_comments': 15
            }
        ]

    def tearDown(self):
        # Clean up test files
        for file in os.listdir(self.test_dir):
            os.remove(os.path.join(self.test_dir, file))
        os.rmdir(self.test_dir)

    def test_create_wordcloud(self):
        output_file = os.path.join(self.test_dir, 'wordcloud.html')
        create_wordcloud(self.comments, output_file)
        self.assertTrue(os.path.exists(output_file))
        self.assertGreater(os.path.getsize(output_file), 0)

    def test_create_sentiment_distribution(self):
        output_file = os.path.join(self.test_dir, 'sentiment_dist.html')
        create_sentiment_distribution(self.sentiment_results, output_file)
        self.assertTrue(os.path.exists(output_file))
        self.assertGreater(os.path.getsize(output_file), 0)

    def test_create_engagement_visualization(self):
        output_file = os.path.join(self.test_dir, 'engagement.html')
        create_engagement_visualization(self.metadata, output_file)
        self.assertTrue(os.path.exists(output_file))
        self.assertGreater(os.path.getsize(output_file), 0)

    def test_create_sentiment_trends_visualization(self):
        output_file = os.path.join(self.test_dir, 'trends.html')
        create_sentiment_trends_visualization(self.trends, output_file)
        self.assertTrue(os.path.exists(output_file))
        self.assertGreater(os.path.getsize(output_file), 0)

    def test_handle_empty_data(self):
        """Test visualization functions with empty data."""
        empty_file = os.path.join(self.test_dir, 'empty.html')
        
        with self.assertRaises(Exception):
            create_wordcloud([], empty_file)
        
        with self.assertRaises(Exception):
            create_sentiment_distribution({'overall_stats': {'sentiment_distribution': {}}}, empty_file)
        
        with self.assertRaises(Exception):
            create_engagement_visualization({'statistics': {}}, empty_file)
        
        with self.assertRaises(Exception):
            create_sentiment_trends_visualization([], empty_file)

if __name__ == '__main__':
    unittest.main()