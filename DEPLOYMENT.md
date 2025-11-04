# Warm & White - Docker Deployment Guide

## 🐳 Building and Running with Docker

### Local Development

1. **Build the Docker image:**
```bash
docker build -t warm-and-white .
```

2. **Run the container:**
```bash
docker run -d -p 80:80 --name warm-and-white-app warm-and-white
```

3. **Access the website:**
```
http://localhost
```

### Using Docker Compose (Recommended)

1. **Start the application:**
```bash
docker-compose up -d
```

2. **View logs:**
```bash
docker-compose logs -f
```

3. **Stop the application:**
```bash
docker-compose down
```

## ☁️ AWS EC2 Deployment

### Prerequisites

1. **Launch EC2 Instance:**
   - AMI: Amazon Linux 2
   - Instance Type: t2.micro (free tier) or larger
   - Security Group: Allow HTTP (port 80) and SSH (port 22)
   - Key Pair: Create or use existing for SSH access

2. **Connect to EC2:**
```bash
ssh -i your-key.pem ec2-user@your-ec2-public-ip
```

### Deployment Methods

#### Method 1: Automated Script Deployment

1. **Upload files to EC2:**
```bash
# From your local machine
scp -i your-key.pem -r * ec2-user@your-ec2-ip:/tmp/warm-and-white/
```

2. **SSH into EC2 and run:**
```bash
sudo mkdir -p /opt/warm-and-white
sudo mv /tmp/warm-and-white/* /opt/warm-and-white/
cd /opt/warm-and-white
chmod +x deploy-ec2.sh
./deploy-ec2.sh
```

#### Method 2: Manual Step-by-Step

1. **Install Docker:**
```bash
sudo yum update -y
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user
```

2. **Install Docker Compose:**
```bash
# Method A: Latest Docker Compose V2 (Recommended)
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Method B: If Method A fails, install via pip
sudo yum install -y python3-pip
sudo pip3 install docker-compose

# Method C: Install missing library for older versions
sudo yum install -y libxcrypt-compat
```

3. **Upload and deploy:**
```bash
# Upload your files to /opt/warm-and-white
cd /opt/warm-and-white
docker-compose up -d
```

4. **Access your application:**
```bash
# Get your EC2 public IP
curl http://checkip.amazonaws.com

# Test locally on EC2 first
curl -I http://localhost

# Then access from browser using:
# http://YOUR-EC2-PUBLIC-IP
```

**Browser Access:**
- Open your browser and go to: `http://YOUR-EC2-PUBLIC-IP`
- Replace `YOUR-EC2-PUBLIC-IP` with the actual public IP of your EC2 instance
- Example: `http://54.123.45.67`

#### Method 3: Git Repository Deployment

1. **Setup Git deployment:**
```bash
sudo yum install -y git
cd /opt
sudo git clone https://github.com/yourusername/warm-and-white.git
sudo chown -R ec2-user:ec2-user warm-and-white
cd warm-and-white
docker-compose up -d
```

**🌐 Accessing Your Application:**

1. **Get your EC2 Public IP:**
```bash
# Method 1: From inside EC2
curl http://checkip.amazonaws.com

# Method 2: From AWS Console
# Go to EC2 Dashboard → Instances → Select your instance → Copy "Public IPv4 address"
```

2. **Test the application:**
```bash
# Test locally on EC2 first
curl -I http://localhost

# Should return: HTTP/1.1 200 OK
```

3. **Access from browser:**
   - Open your web browser
   - Navigate to: `http://YOUR-EC2-PUBLIC-IP`
   - Example: `http://54.123.45.67`

**⚠️ Troubleshooting Access Issues:**

If you can't access the site, check:

1. **Security Group:** Ensure HTTP (port 80) is open
2. **Container Status:** Run `docker-compose ps` to verify containers are running
3. **Logs:** Check `docker-compose logs -f` for any errors
4. **Local Test:** Verify `curl http://localhost` works on EC2

### Security Group Configuration

**Inbound Rules:**
- HTTP: Port 80, Source: 0.0.0.0/0
- SSH: Port 22, Source: Your IP
- HTTPS: Port 443, Source: 0.0.0.0/0 (if using SSL)

### Domain Setup (Optional)

1. **Point your domain to EC2:**
   - Create A record: `yourdomain.com` → `EC2-Public-IP`
   - Create CNAME: `www.yourdomain.com` → `yourdomain.com`

2. **Add SSL with Let's Encrypt:**
```bash
# Install certbot
sudo yum install -y certbot

# Stop nginx temporarily
docker-compose down

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Update nginx.conf for SSL and restart
docker-compose up -d
```

## 🔧 Useful Commands

### Docker Commands
```bash
# View running containers
docker ps

# View logs
docker logs warm-and-white-app

# Restart container
docker restart warm-and-white-app

# Enter container shell
docker exec -it warm-and-white-app sh

# Remove container
docker rm -f warm-and-white-app

# Remove image
docker rmi warm-and-white
```

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# View service status
docker-compose ps

# View logs
docker-compose logs -f

# Scale services (if needed)
docker-compose up -d --scale warm-and-white=2
```

### Monitoring Commands
```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check container resource usage
docker stats

# Check nginx access logs
docker-compose logs nginx | tail -100

# Check if website is responding
curl -I http://localhost
```

## 🚀 Production Optimizations

1. **Enable HTTPS:**
   - Use Let's Encrypt for free SSL certificates
   - Configure nginx for HTTPS redirect

2. **Use Application Load Balancer:**
   - For high availability
   - Auto-scaling with multiple EC2 instances

3. **Use CloudFront CDN:**
   - Faster global content delivery
   - Reduced server load

4. **Set up monitoring:**
   - CloudWatch for EC2 metrics
   - Application health checks

5. **Backup strategy:**
   - Regular EC2 snapshots
   - Code backup in Git repository

## 💰 Cost Optimization

- **t2.micro:** Free tier eligible (750 hours/month)
- **Auto-shutdown:** Use Lambda to stop instances during off-hours
- **Reserved Instances:** For long-term deployments
- **Spot Instances:** For development environments

## 🔒 Security Best Practices

1. **Keep system updated:**
```bash
sudo yum update -y
```

2. **Configure firewall:**
```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

3. **Regular security updates:**
   - Update Docker images regularly
   - Monitor security advisories

4. **Use IAM roles:**
   - Avoid hardcoding AWS credentials
   - Use EC2 instance profiles

---

Your Warm & White chocolate website will be live and accessible worldwide! 🍫🌍