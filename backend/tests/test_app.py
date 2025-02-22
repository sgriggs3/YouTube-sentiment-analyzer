import pytest
from app import app
from unittest.mock import patch

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