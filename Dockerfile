# Use Python 3.9 slim image as base
FROM python:3.9-slim

# Avoid warnings by switching to noninteractive
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 16
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

# Create a non-root user
RUN useradd -ms /bin/bash vscode

# Set up work directory and permissions
WORKDIR /workspace
RUN chown vscode:vscode /workspace

# Switch to non-root user
USER vscode

# Set environment variables
ENV PATH="/home/vscode/.local/bin:${PATH}"
ENV PYTHONUNBUFFERED=1
ENV NODE_ENV=development

# The command that starts the app will be in docker-compose.yml
CMD ["bash"]
