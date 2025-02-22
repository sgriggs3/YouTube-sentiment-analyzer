class ConfigError(Exception):
    """Custom exception for configuration related errors."""
    pass

class YouTubeAPIError(Exception):
    """Custom exception for YouTube API related errors."""
    def __init__(self, message, status_code=None):
        super().__init__(message)
        self.status_code = status_code

class VideoNotFoundError(YouTubeAPIError):
    """Exception for when a video is not found."""
    def __init__(self, video_id):
        super().__init__(f"Video not found: {video_id}", status_code=404)

class QuotaExceededError(YouTubeAPIError):
    """Exception for YouTube API quota exceeded."""
    def __init__(self):
        super().__init__("YouTube API quota exceeded", status_code=403)

class InternalServerError(YouTubeAPIError):
    """Exception for YouTube API internal server errors."""
    def __init__(self, message="YouTube API internal server error"):
        super().__init__(message, status_code=500)

class ServiceUnavailableError(YouTubeAPIError):
    """Exception for YouTube API service unavailable errors."""
    def __init__(self, message="YouTube API service unavailable"):
        super().__init__(message, status_code=503)

class BadRequestError(YouTubeAPIError):
    """Exception for YouTube API bad request errors."""
    def __init__(self, message="YouTube API bad request"):
        super().__init__(message, status_code=400)