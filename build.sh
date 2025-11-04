#!/bin/bash

echo "🍫 Building Warm and White Docker Image..."

# Build the Docker image
docker build -t warm-and-white .

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "To run the container:"
    echo "docker run -d -p 80:80 --name warm-and-white-app warm-and-white"
    echo ""
    echo "Or use Docker Compose:"
    echo "docker-compose up -d"
    echo ""
    echo "Then visit: http://localhost"
else
    echo "❌ Build failed!"
fi