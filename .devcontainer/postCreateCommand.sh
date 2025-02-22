#!/bin/bash
set -e

echo "Installing backend dependencies..."
cd /workspaces/YouTube-sentiment-analyzer/backend
pip install --no-cache-dir -r requirements.txt

echo "Installing frontend dependencies..."
cd /workspaces/YouTube-sentiment-analyzer/frontend
npm install

echo "Setting up environment variables..."
cd /workspaces/YouTube-sentiment-analyzer

# Create default environment variables if not exists
if [ ! -f .env ]; then
    cat > .env << EOL
FLASK_ENV=development
FLASK_SECRET_KEY=dev-secret-key
POSTGRES_URL=postgresql://user:password@db:5432/sentiment
REDIS_URL=redis://redis:6379
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

echo "Setup complete!"
