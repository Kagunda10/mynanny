# MyNanny VPS Deployment Guide

Deploy the MyNanny website on an Ubuntu VPS with PostgreSQL, PM2, Nginx, and SSL.

## Prerequisites

- Ubuntu 22.04+ VPS (minimum 2GB RAM, 2 vCPU)
- Domain name pointed to server IP (A record)
- SSH access with sudo privileges

---

## 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install -y curl git build-essential ufw
```

## 2. Firewall (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## 3. Install Node.js 20 LTS

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
nvm alias default 20
node -v  # Should show v20.x
```

## 4. Install PostgreSQL 16

```bash
# Add PostgreSQL repository
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update
sudo apt install -y postgresql-16

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql <<EOF
CREATE USER mynanny WITH PASSWORD 'your_secure_password_here';
CREATE DATABASE mynanny OWNER mynanny;
GRANT ALL PRIVILEGES ON DATABASE mynanny TO mynanny;
EOF
```

## 5. Clone and Build

```bash
# Create app directory
sudo mkdir -p /var/www/mynanny
sudo chown $USER:$USER /var/www/mynanny

# Clone repository
cd /var/www/mynanny
git clone https://github.com/your-org/mn-site.git .
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` with production values:

```env
DATABASE_URI=postgresql://mynanny:your_secure_password_here@localhost:5432/mynanny
PAYLOAD_SECRET=generate-a-64-char-random-string-here
NEXT_PUBLIC_SERVER_URL=https://yourdomain.co.ke
```

Generate a secure secret:
```bash
openssl rand -base64 48
```

Build the application:
```bash
npm run build
```

## 6. Run Database Migrations & Seed

```bash
# Payload auto-runs migrations on first start
# Seed the database with initial content
npm run seed
```

## 7. PM2 Process Management

```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem config
cat > ecosystem.config.cjs << 'EOF'
module.exports = {
  apps: [{
    name: 'mynanny',
    script: 'node_modules/.bin/next',
    args: 'start',
    cwd: '/var/www/mynanny',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    max_memory_restart: '500M',
    error_file: '/var/log/mynanny/error.log',
    out_file: '/var/log/mynanny/out.log',
    time: true,
  }]
}
EOF

# Create log directory
sudo mkdir -p /var/log/mynanny
sudo chown $USER:$USER /var/log/mynanny

# Start application
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # Follow the printed command to enable on boot
```

## 8. Nginx Reverse Proxy

```bash
sudo apt install -y nginx

# Create site configuration
sudo tee /etc/nginx/sites-available/mynanny << 'EOF'
server {
    listen 80;
    server_name yourdomain.co.ke www.yourdomain.co.ke;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    # Cache static assets
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /public/ {
        proxy_pass http://127.0.0.1:3000;
        expires 30d;
        add_header Cache-Control "public";
    }

    client_max_body_size 50M;
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/mynanny /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 9. SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.co.ke -d www.yourdomain.co.ke

# Auto-renewal is configured automatically
# Test renewal:
sudo certbot renew --dry-run
```

## 10. Automatic Updates & Monitoring

### Log rotation
```bash
sudo tee /etc/logrotate.d/mynanny << 'EOF'
/var/log/mynanny/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 $USER $USER
    sharedscripts
    postrotate
        pm2 reloadLogs
    endscript
}
EOF
```

### PM2 monitoring
```bash
pm2 monit          # Real-time monitoring
pm2 status         # Quick status check
pm2 logs mynanny   # View logs
```

### Deployment script (for updates)
```bash
cat > /var/www/mynanny/deploy.sh << 'EOF'
#!/bin/bash
set -e

cd /var/www/mynanny
git pull origin main
npm install
npm run build
pm2 reload mynanny
echo "✅ Deployment complete!"
EOF

chmod +x /var/www/mynanny/deploy.sh
```

---

## Quick Reference

| Service | Command |
|---------|---------|
| Start app | `pm2 start mynanny` |
| Stop app | `pm2 stop mynanny` |
| Restart app | `pm2 reload mynanny` |
| View logs | `pm2 logs mynanny` |
| DB shell | `sudo -u postgres psql mynanny` |
| Nginx reload | `sudo systemctl reload nginx` |
| SSL renew | `sudo certbot renew` |
| Deploy update | `./deploy.sh` |

## Troubleshooting

- **502 Bad Gateway**: Check if PM2 is running (`pm2 status`), check logs (`pm2 logs`)
- **Database connection error**: Verify PostgreSQL is running (`sudo systemctl status postgresql`) and credentials in `.env`
- **SSL issues**: Run `sudo certbot renew --force-renewal`
- **Out of memory**: Increase swap or reduce PM2 instances in `ecosystem.config.cjs`
