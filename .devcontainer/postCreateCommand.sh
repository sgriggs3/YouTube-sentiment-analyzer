#!/bin/bash

# Install backend dependencies
pip install --no-cache-dir -r backend/requirements.txt

# Install frontend dependencies
cd frontend &amp;&amp; npm install &amp;&amp; cd ..

echo "Environment setup complete!"