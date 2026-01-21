# Nginx Configuration and Deployment Guide

## Where to Run Nginx Commands

### On Your Production Server (EC2/Server)

You need to **SSH into your production server** where nginx is running:

```bash
# SSH into your server
ssh user@65.0.107.177
# OR
ssh -i your-key.pem user@65.0.107.177
```

Then run the commands on that server.

---

## Step-by-Step Deployment Process

### Option 1: Docker Deployment (If using Docker)

#### 1. Update nginx.conf Locally

Edit `hrms-frontend-spc/nginx.conf` on your local machine:

```nginx
location /api/ {
    # For Docker: use service name
    proxy_pass http://hrms-backend:5001/api/;
    
    # For standalone: use localhost
    # proxy_pass http://localhost:5001/api/;
    
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 300s;
    proxy_connect_timeout 75s;
}
```

#### 2. Commit and Push Changes

```bash
cd hrms-frontend-spc
git add nginx.conf
git commit -m "Fix nginx API proxy configuration"
git push
```

#### 3. On Production Server - Rebuild Docker Image

```bash
# SSH into server
ssh user@65.0.107.177

# Navigate to project directory
cd /path/to/hrms-frontend-spc

# Pull latest changes
git pull

# Rebuild Docker image
docker build -t hrms-frontend-spc:latest .

# Restart container
docker-compose restart frontend
# OR
docker restart hrms-frontend-container-name
```

---

### Option 2: Standalone Nginx Deployment (No Docker)

#### 1. Update nginx.conf Locally

Edit `hrms-frontend-spc/nginx.conf`:

```nginx
location /api/ {
    # Backend on same server
    proxy_pass http://localhost:5001/api/;
    
    # OR backend on different server/port
    # proxy_pass http://65.0.107.177:5001/api/;
    
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 300s;
    proxy_connect_timeout 75s;
}
```

#### 2. Copy nginx.conf to Production Server

```bash
# From your local machine
scp hrms-frontend-spc/nginx.conf user@65.0.107.177:/etc/nginx/sites-available/hrms-frontend
# OR if nginx.conf is in a custom location
scp hrms-frontend-spc/nginx.conf user@65.0.107.177:/path/to/nginx/conf/
```

#### 3. On Production Server - Test and Reload

```bash
# SSH into server
ssh user@65.0.107.177

# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo nginx -s reload

# OR restart nginx
sudo systemctl restart nginx
```

---

## Finding Nginx Configuration Location

### Check Where Nginx Config Is

```bash
# On production server, run:
sudo nginx -t

# This will show you:
# - Configuration file location
# - Test results
```

### Common Nginx Config Locations

```bash
# Check nginx config file location
sudo nginx -T 2>&1 | grep "configuration file"

# Common locations:
/etc/nginx/nginx.conf
/etc/nginx/sites-available/default
/etc/nginx/sites-available/hrms-frontend
/usr/local/nginx/conf/nginx.conf
```

---

## Complete Deployment Workflow

### For Docker:

```bash
# 1. On local machine - update and commit
cd hrms-frontend-spc
# Edit nginx.conf
git add nginx.conf
git commit -m "Fix API proxy"
git push

# 2. On production server
ssh user@65.0.107.177
cd /path/to/hrms-frontend-spc
git pull
docker-compose build frontend
docker-compose up -d frontend

# 3. Verify
curl http://localhost:8080/api/health
```

### For Standalone Nginx:

```bash
# 1. On local machine - update and commit
cd hrms-frontend-spc
# Edit nginx.conf
git add nginx.conf
git commit -m "Fix API proxy"
git push

# 2. On production server
ssh user@65.0.107.177
cd /path/to/hrms-frontend-spc
git pull

# 3. Copy nginx.conf to nginx directory
sudo cp nginx.conf /etc/nginx/sites-available/hrms-frontend
# OR if using main config
sudo cp nginx.conf /etc/nginx/nginx.conf

# 4. Test and reload
sudo nginx -t
sudo nginx -s reload

# 5. Verify
curl http://localhost:8080/api/health
```

---

## Verification Steps

### 1. Test Nginx Config

```bash
sudo nginx -t
```

**Expected output:**
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### 2. Check Nginx Status

```bash
sudo systemctl status nginx
# OR
sudo service nginx status
```

### 3. Test API Proxy

```bash
# Test health endpoint
curl http://localhost:8080/api/health

# Test with verbose output
curl -v http://localhost:8080/api/health
```

### 4. Check Nginx Logs

```bash
# Error logs
sudo tail -f /var/log/nginx/error.log

# Access logs
sudo tail -f /var/log/nginx/access.log
```

---

## Troubleshooting

### If `nginx -t` fails:

```bash
# Check syntax errors
sudo nginx -t

# Common issues:
# - Missing semicolon
# - Wrong file path
# - Permission issues
```

### If nginx won't reload:

```bash
# Check if nginx is running
sudo systemctl status nginx

# Restart nginx
sudo systemctl restart nginx

# Check logs
sudo journalctl -u nginx -n 50
```

### If API still returns 404:

```bash
# 1. Verify backend is running
curl http://localhost:5001/api/health

# 2. Check nginx is proxying
sudo tail -f /var/log/nginx/access.log
# Then make a request and see if it appears

# 3. Test proxy directly
curl -v http://localhost:8080/api/health
```

---

## Quick Reference

### Commands to Run on Production Server:

```bash
# 1. Test configuration
sudo nginx -t

# 2. Reload nginx (if test passes)
sudo nginx -s reload

# 3. Or restart nginx
sudo systemctl restart nginx

# 4. Check status
sudo systemctl status nginx

# 5. View logs
sudo tail -f /var/log/nginx/error.log
```

### Where to Run:

- ✅ **On production server** (65.0.107.177) - via SSH
- ❌ **NOT on your local machine** (unless nginx runs locally)

---

## Example SSH Session

```bash
# From your local machine
ssh user@65.0.107.177

# Once connected to server:
cd /path/to/hrms-frontend-spc
git pull

# If using Docker:
docker-compose build frontend
docker-compose up -d frontend

# If using standalone nginx:
sudo cp nginx.conf /etc/nginx/sites-available/hrms-frontend
sudo nginx -t
sudo nginx -s reload

# Test
curl http://localhost:8080/api/health
```
