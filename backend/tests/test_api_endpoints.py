import unittest
import json
from app import app
from backend.database import get_db, Video, Comment

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

    def test_real_time_analyze(self):
        response = self.app.get('/api/realtime_analyze/test_video_id')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn('sentiment', data)
        self.assertIn('comment_count', data)

    def test_postgresql_data_persistence(self):
        with get_db() as db:
            video = Video(id='test_video_id', title='Test Video', published_at='2021-01-01T00:00:00Z', description='Test Description')
            comment = Comment(id='test_comment_id', video_id='test_video_id', text='Test Comment', sentiment_score=0.5)
            db.add(video)
            db.add(comment)
            db.commit()

            fetched_video = db.query(Video).filter(Video.id == 'test_video_id').first()
            fetched_comment = db.query(Comment).filter(Comment.id == 'test_comment_id').first()

            self.assertIsNotNone(fetched_video)
            self.assertIsNotNone(fetched_comment)
            self.assertEqual(fetched_video.title, 'Test Video')
            self.assertEqual(fetched_comment.text, 'Test Comment')

if __name__ == '__main__':
    unittest.main()
