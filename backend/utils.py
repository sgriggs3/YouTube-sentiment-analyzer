import re
import logging
import os
from logging.handlers import RotatingFileHandler

def extract_video_id(url_or_id):
    """Extract YouTube video ID from URL or return the ID if already in correct format."""
    if not url_or_id:
        raise ValueError("No URL or video ID provided")
        
    # Common YouTube URL patterns
    patterns = [
        r'(?:youtu\.be/|youtube\.com/(?:embed/|v/|watch\?v=|watch\?.+&v=))([^?&/]+)',
        r'^[a-zA-Z0-9_-]{11}$'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url_or_id)
        if match:
            return match.group(1)
            
    raise ValueError("Invalid YouTube URL or video ID")

def setup_logging():
    """Configure application logging."""
    log_dir = 'logs'
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
        
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # File handler with rotation
    file_handler = RotatingFileHandler(
        os.path.join(log_dir, 'app.log'),
        maxBytes=1024 * 1024,  # 1MB
        backupCount=5
    )
    file_handler.setFormatter(formatter)
    
    # Console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    
    # Root logger configuration
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    root_logger.addHandler(file_handler)
    root_logger.addHandler(console_handler)

def clean_temporary_files(directory, pattern):
    """Clean up temporary visualization files."""
    for filename in os.listdir(directory):
        if re.match(pattern, filename):
            try:
                os.remove(os.path.join(directory, filename))
            except OSError as e:
                logging.error(f"Error deleting {filename}: {e}")

def sanitize_filename(filename):
    """Sanitize a filename to prevent directory traversal."""
    return os.path.basename(filename)