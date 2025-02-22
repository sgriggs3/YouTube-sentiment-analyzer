import unittest
import json
from app import app

class ApiEndpointsTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_get_video_metadata(self):
        response = self.app.get('/api/video-metadata/test_video_id')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('items', data)

    def test_get_comments(self):
        response = self.app.get('/api/comments?urlOrVideoId=test_video_id')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)

    def test_analyze_sentiment(self):
        response = self.app.get('/api/sentiment-analysis?urlOrVideoId=test_video_id')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)

    def test_sentiment_trends(self):
        response = self.app.post('/api/sentiment/trends', json={'comments': ['test comment']})
        self.assertEqual(response.status_code, 200)

    def test_wordcloud(self):
        response = self.app.post('/api/wordcloud', json={'comments': ['test comment']})
        self.assertEqual(response.status_code, 200)

    def test_sentiment_distribution(self):
        response = self.app.post('/api/sentiment/distribution', json={'comments': ['test comment']})
        self.assertEqual(response.status_code, 200)

    def test_engagement(self):
        response = self.app.post('/api/engagement', json={'comments': ['test comment']})
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main()
