# Docker Deployment Guide for Ruixen UI

## Prerequisites
- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)
- EC2 instance with Ubuntu/Amazon Linux
- Domain name (optional but recommended)

## Local Testing

### 1. Development Environment
```bash
# Build and run development container
docker-compose --profile dev up --build

# Or run directly with Docker
docker build -f dev.Dockerfile -t ruixen-dev .
docker run -p 3000:3000 -v $(pwd):/app ruixen-dev
```

### 2. Production Environment (Local Testing)
```bash
# Build and run production container
docker-compose --profile prod up --build

# Or run directly with Docker
docker build -t ruixen-prod .
docker run -p 3000:3000 ruixen-prod
```

### 3. Test the Application
- Development: http://localhost:3000
- Production: http://localhost:3000

## EC2 Deployment

### 1. Prepare EC2 Instance
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx
sudo apt install nginx -y

# Install Git (if not already installed)
sudo apt install git -y
```

### 2. Clone and Deploy Application
```bash
# Clone your repository
git clone <your-repo-url>
cd ruixen-ui

# Build and run production container
docker-compose --profile prod up -d --build
```

### 3. Configure Nginx

#### Copy nginx configuration:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/ruixen
sudo ln -s /etc/nginx/sites-available/ruixen /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

#### Edit the configuration:
```bash
sudo nano /etc/nginx/sites-available/ruixen
```

**Update these values in nginx.conf:**
- Replace `your-domain.com` with your actual domain
- Update SSL certificate paths (if using HTTPS)
- For testing without SSL, uncomment the basic HTTP configuration at the bottom

#### Test and restart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 4. SSL Setup (Optional but Recommended)

#### Using Let's Encrypt (Certbot):
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

#### Manual SSL certificate:
- Place your SSL certificate at `/etc/ssl/certs/your-cert.pem`
- Place your private key at `/etc/ssl/private/your-key.pem`

### 5. Configure Firewall
```bash
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## Docker Commands Reference

### Build Commands
```bash
# Build development image
docker build -f dev.Dockerfile -t ruixen-dev .

# Build production image
docker build -t ruixen-prod .

# Build with Docker Compose
docker-compose --profile prod build
```

### Run Commands
```bash
# Run development container
docker run -p 3000:3000 -v $(pwd):/app ruixen-dev

# Run production container
docker run -p 3000:3000 ruixen-prod

# Run with Docker Compose (detached)
docker-compose --profile prod up -d
```

### Management Commands
```bash
# View running containers
docker ps

# View logs
docker logs <container-id>
docker-compose logs

# Stop containers
docker stop <container-id>
docker-compose down

# Remove containers and images
docker system prune -a
```

## Troubleshooting

### Common Issues

1. **Port 3000 already in use:**
   ```bash
   sudo lsof -i :3000
   sudo kill -9 <PID>
   ```

2. **Docker permission denied:**
   ```bash
   sudo usermod -aG docker $USER
   # Logout and login again
   ```

3. **Nginx configuration test fails:**
   ```bash
   sudo nginx -t
   # Check the error and fix configuration
   ```

4. **Container fails to start:**
   ```bash
   docker logs <container-name>
   # Check the logs for specific errors
   ```

### Health Checks
```bash
# Check if application is running
curl http://localhost:3000

# Check Nginx status
sudo systemctl status nginx

# Check Docker container status
docker ps
docker stats
```

## Environment Variables

Create a `.env.local` file for production environment variables:
```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
# Add other environment variables as needed
```

## Monitoring and Logs

### Docker Logs
```bash
# Follow logs in real-time
docker-compose logs -f

# View specific service logs
docker-compose logs ruixen-prod
```

### Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

## Backup and Updates

### Update Application
```bash
git pull origin main
docker-compose --profile prod down
docker-compose --profile prod up -d --build
```

### Backup
```bash
# Backup your application data
tar -czf ruixen-backup-$(date +%Y%m%d).tar.gz /path/to/ruixen-ui
```

## Security Considerations

1. **Keep Docker and system updated**
2. **Use SSL certificates**
3. **Configure proper firewall rules**
4. **Regular security updates**
5. **Monitor logs for suspicious activity**
6. **Use environment variables for sensitive data**

## Performance Optimization

1. **Enable Nginx caching**
2. **Use CDN for static assets**
3. **Monitor resource usage**
4. **Set up log rotation**
5. **Configure proper Docker resource limits**
