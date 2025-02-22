class ConfigError(Exception):
    """Custom exception for configuration related errors."""
    pass

class YouTubeAPIError(Exception):
    def __init__(self, message, status_code=500):
        super().__init__(message)
        self.status_code = status_code

class VideoNotFoundError(YouTubeAPIError):
    def __init__(self, message="Video not found"):
        super().__init__(message, status_code=404)

class QuotaExceededError(YouTubeAPIError):
    def __init__(self, message="API quota exceeded"):
        super().__init__(message, status_code=429)


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