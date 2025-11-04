#!/bin/bash

# EC2 Deployment Script for Warm & White Chocolate Website
# Run this script on your EC2 instance

echo "🍫 Deploying Warm & White Chocolate Website..."

# Update system packages
sudo yum update -y

# Install Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# Install Git (if not already installed)
sudo yum install -y git

# Create application directory
sudo mkdir -p /opt/warm-and-white
sudo chown ec2-user:ec2-user /opt/warm-and-white
cd /opt/warm-and-white

# Clone or copy your application files here
# Option 1: If using Git repository
# git clone https://github.com/yourusername/warm-and-white.git .

# Option 2: If uploading files manually, they should be in this directory

# Build and run with Docker Compose
docker-compose down --remove-orphans
docker-compose build
docker-compose up -d

# Configure firewall (if using firewalld)
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --reload

# Check container status
docker-compose ps

echo "✅ Deployment completed!"
echo "🌐 Your website should be accessible at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
echo "📊 Check container logs: docker-compose logs -f"
echo "🔄 To restart: docker-compose restart"
echo "🛑 To stop: docker-compose down"