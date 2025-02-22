import pytest
from app import app
from unittest.mock import patch
from backend.database import get_db, Video, Comment

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_fetch_comments_missing_url(client):
    response = client.get('/api/comments')
    assert response.status_code == 400
    assert b"Missing video URL" in response.data

@patch('app.get_video_comments')
def test_fetch_comments_success(mock_get_comments, client):
    mock_get_comments.return_value = ["Comment 1", "Comment 2"]
    response = client.get('/api/comments?url=https://youtube.com/watch?v=123')
    assert response.status_code == 200
    assert len(response.json) == 2

def test_postgresql_data_persistence(client):
    with get_db() as db:
        video = Video(id='test_video_id', title='Test Video', published_at='2021-01-01T00:00:00Z', description='Test Description')
        comment = Comment(id='test_comment_id', video_id='test_video_id', text='Test Comment', sentiment_score=0.5)
        db.add(video)
        db.add(comment)
        db.commit()

        fetched_video = db.query(Video).filter(Video.id == 'test_video_id').first()
        fetched_comment = db.query(Comment).filter(Comment.id == 'test_comment_id').first()

        assert fetched_video is not None
        assert fetched_comment is not None
        assert fetched_video.title == 'Test Video'
        assert fetched_comment.text == 'Test Comment'
