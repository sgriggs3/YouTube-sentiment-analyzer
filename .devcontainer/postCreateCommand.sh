#!/bin/bash
set -e

echo "Creating workspace directory structure..."
mkdir -p /workspace/backend
mkdir -p /workspace/frontend

echo "Installing backend dependencies..."
cd /workspace/backend
if [ -f "requirements.txt" ]; then
    pip install --no-cache-dir -r requirements.txt
else
    # Basic requirements if file doesn't exist
    pip install flask requests pytest python-dotenv
fi

echo "Installing frontend dependencies..."
cd /workspace/frontend
if [ -f "package.json" ]; then
    npm install
else
    # Initialize basic package.json if it doesn't exist
    npm init -y
    npm install react react-dom @testing-library/react
fi

echo "Setting up environment variables..."
cd /workspace

# Create default environment variables if not exists
if [ ! -f .env ]; then
    cat > .env << EOL
FLASK_ENV=development
FLASK_APP=backend/app.py
FLASK_DEBUG=1
FLASK_SECRET_KEY=dev-secret-key
YOUTUBE_API_KEY=your-youtube-api-key
EOL
fi

# Create default config.json if not exists
if [ ! -f config.json ]; then
    cat > config.json << EOL
{
    "youtube_api_key": "YOUR_API_KEY_HERE"
}
EOL
    echo "Please update config.json with your YouTube API key"
fi

# Create a basic .gitignore
if [ ! -f .gitignore ]; then
    cat > .gitignore << EOL
.env
config.json
__pycache__/
*.pyc
node_modules/
.pytest_cache/
.coverage
EOL
fi

echo "Setup complete!"
