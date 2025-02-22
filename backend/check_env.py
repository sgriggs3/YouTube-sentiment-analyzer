import os
from pathlib import Path
from dotenv import load_dotenv

def check_environment():
    env_path = Path('.env')
    
    # Load existing environment variables
    load_dotenv()
    
    # Check for YouTube API key
    if not os.getenv('YOUTUBE_API_KEY'):
        print("YouTube API key not found in environment variables.")
        api_key = input("Please enter your YouTube API key: ")
        
        # Write to .env file
        with open(env_path, 'a') as f:
            f.write(f'\nYOUTUBE_API_KEY={api_key}')
        
        print("API key has been saved to .env file")
    
    # Check for other required environment variables
    required_vars = [
        'FLASK_SECRET_KEY',
        'POSTGRES_URL',
        'REDIS_URL'
    ]
    
    for var in required_vars:
        if not os.getenv(var):
            value = input(f"Please enter {var}: ")
            with open(env_path, 'a') as f:
                f.write(f'\n{var}={value}')

if __name__ == '__main__':
    check_environment()
