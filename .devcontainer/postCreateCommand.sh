#!/bin/bash

# Install backend dependencies
pip install --no-cache-dir -r backend/requirements.txt

# Install frontend dependencies
cd frontend && npm install && cd ..

# Check for required environment variables
required_vars=(
    "YOUTUBE_API_KEY"
    "FLASK_SECRET_KEY"
    "POSTGRES_URL"
    "REDIS_URL"
)

for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "Environment variable $var is not set. Please set it before proceeding."
        exit 1
    fi
done

echo "Environment setup complete!"
