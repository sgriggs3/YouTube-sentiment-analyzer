import unittest
from unittest.mock import Mock, patch
from youtube_api import YouTubeAPI, create_youtube_client
from googleapiclient.errors import HttpError
import datetime

class TestYouTubeAPI(unittest.TestCase):
    def setUp(self):
        self.api_keys = ['test_key_1', 'test_key_2']
        self.api = YouTubeAPI(self.api_keys)

    @patch('youtube_api.build')
    def test_initialize_client(self, mock_build):
        mock_youtube = Mock()
        mock_build.return_value = mock_youtube
        
        api = YouTubeAPI(['test_key'])
        self.assertIsNotNone(api.youtube)
        mock_build.assert_called_once_with('youtube', 'v3', developerKey='test_key')

    def test_rotate_api_key(self):
        initial_key_index = self.api.current_key_index
        self.api.rotate_api_key()
        self.assertEqual(self.api.current_key_index, (initial_key_index + 1) % len(self.api_keys))

    def test_handle_quota_exceeded_with_multiple_keys(self):
        api = YouTubeAPI(['key1', 'key2'])
        initial_key_index = api.current_key_index
        result = api.handle_quota_exceeded()
        
        self.assertTrue(result)
        self.assertEqual(api.current_key_index, (initial_key_index + 1) % 2)

    def test_handle_quota_exceeded_with_single_key(self):
        api = YouTubeAPI(['single_key'])
        result = api.handle_quota_exceeded()
        self.assertFalse(result)

    @patch('youtube_api.time.sleep')
    def test_apply_rate_limiting(self, mock_sleep):
        self.api.last_request_time = datetime.datetime.now() - datetime.timedelta(seconds=0.05)
        self.api.apply_rate_limiting()
        mock_sleep.assert_called()

    @patch('youtube_api.build')
    def test_get_video_metadata_success(self, mock_build):
        mock_youtube = Mock()
        mock_videos = Mock()
        mock_list = Mock()
        mock_execute = Mock()
        
        mock_build.return_value = mock_youtube
        mock_youtube.videos.return_value = mock_videos
        mock_videos.list.return_value = mock_list
        mock_list.execute.return_value = {
            'items': [{'id': 'test_id', 'snippet': {'title': 'Test Video'}}]
        }
        
        api = YouTubeAPI(['test_key'])
        result = api.get_video_metadata('test_id')
        
        self.assertIsNotNone(result)
        self.assertEqual(result['id'], 'test_id')

    @patch('youtube_api.build')
    def test_get_video_metadata_quota_exceeded(self, mock_build):
        mock_youtube = Mock()
        mock_videos = Mock()
        mock_list = Mock()
        
        mock_build.return_value = mock_youtube
        mock_youtube.videos.return_value = mock_videos
        mock_videos.list.return_value = mock_list
        
        mock_resp = Mock()
        mock_resp.status = 403
        mock_list.execute.side_effect = HttpError(mock_resp, b'Quota exceeded')
        
        api = YouTubeAPI(['key1', 'key2'])
        result = api.get_video_metadata('test_id')
        
        self.assertIsNone(result)
        self.assertEqual(api.current_key_index, 1)  # Should have rotated to second key

    def test_create_youtube_client_with_env_var(self):
        with patch.dict('os.environ', {'YOUTUBE_API_KEY': 'test_key'}):
            client = create_youtube_client()
            self.assertIsNotNone(client)
            self.assertEqual(client.api_keys, ['test_key'])

    def test_create_youtube_client_with_provided_keys(self):
        client = create_youtube_client(['key1', 'key2'])
        self.assertIsNotNone(client)
        self.assertEqual(client.api_keys, ['key1', 'key2'])

if __name__ == '__main__':
    unittest.main()