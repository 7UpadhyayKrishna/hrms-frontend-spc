# Quick Deployment Guide - Where to Run Commands

## ⚠️ IMPORTANT: Where to Run These Commands

You must run `sudo nginx -t` and `sudo nginx -s reload` **ON YOUR PRODUCTION SERVER**, not on your local machine.

---

## 🚀 Quick Steps

### Step 1: SSH into Your Production Server

```bash
# From your local machine, connect to production server
ssh user@65.0.107.177
# OR with key file
ssh -i /path/to/your-key.pem user@65.0.107.177
```

### Step 2: Navigate to Project Directory

```bash
# Once connected to server, go to frontend directory
cd /path/to/hrms-frontend-spc
# Common locations:
# - /home/user/hrms-frontend-spc
# - /var/www/hrms-frontend-spc
# - /opt/hrms-frontend-spc
```

### Step 3: Update nginx.conf (if needed)

If you haven't pushed the updated nginx.conf yet:

```bash
# Pull latest changes
git pull

# OR manually edit nginx.conf
nano nginx.conf
# Make sure line 51 has: proxy_pass http://localhost:5001/api/;
```

### Step 4: Copy nginx.conf to Nginx Directory

**If using Docker:**
```bash
# nginx.conf is already in the Docker image
# Just rebuild:
docker-compose build frontend
docker-compose up -d frontend
```

**If using standalone nginx:**
```bash
# Copy nginx.conf to nginx config directory
sudo cp nginx.conf /etc/nginx/sites-available/hrms-frontend

# OR if using main nginx.conf
sudo cp nginx.conf /etc/nginx/nginx.conf

# OR if nginx.conf is in a custom location, find it first:
sudo nginx -t  # This shows config file location
```

### Step 5: Test and Reload Nginx

```bash
# Test nginx configuration (checks for syntax errors)
sudo nginx -t

# Expected output:
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# If test passes, reload nginx
sudo nginx -s reload

# OR restart nginx
sudo systemctl restart nginx
```

### Step 6: Verify It Works

```bash
# Test the API endpoint
curl http://localhost:8080/api/health

# Should return backend response (not 404)
```

---

## 📍 Finding Your Setup

### Check if Using Docker

```bash
# On production server
docker ps | grep nginx
# OR
docker-compose ps
```

**If Docker containers are running:**
- Use Docker commands (docker-compose build/restart)
- nginx.conf is inside the container

**If no Docker:**
- Use standalone nginx commands (sudo nginx -t, sudo nginx -s reload)
- nginx.conf is in /etc/nginx/ or custom location

### Find Nginx Config Location

```bash
# This will show you where nginx.conf is
sudo nginx -t

# Common locations:
# /etc/nginx/nginx.conf
# /etc/nginx/sites-available/default
# /etc/nginx/sites-available/hrms-frontend
```

---

## 🔧 Complete Example Session

```bash
# 1. Connect to server
ssh user@65.0.107.177

# 2. Go to project
cd /home/user/hrms-frontend-spc

# 3. Pull latest (if using git)
git pull

# 4. If Docker:
docker-compose build frontend
docker-compose up -d frontend

# 4. If Standalone nginx:
sudo cp nginx.conf /etc/nginx/sites-available/hrms-frontend
sudo nginx -t
sudo nginx -s reload

# 5. Test
curl http://localhost:8080/api/health
```

---

## ❌ Common Mistakes

1. **Running commands locally** - Must run on production server
2. **Wrong nginx.conf location** - Use `sudo nginx -t` to find it
3. **Not testing before reload** - Always run `sudo nginx -t` first
4. **Wrong proxy_pass URL** - Make sure backend URL is correct

---

## 🆘 If Commands Don't Work

### "nginx: command not found"
```bash
# Find nginx location
which nginx
# OR
whereis nginx

# Use full path
/usr/sbin/nginx -t
```

### "Permission denied"
```bash
# Make sure you're using sudo
sudo nginx -t
sudo nginx -s reload
```

### "nginx: [error] invalid PID number"
```bash
# Nginx might not be running
sudo systemctl start nginx
# OR
sudo service nginx start
```

---

## ✅ Success Indicators

After running `sudo nginx -s reload`:

1. **No error messages**
2. **Nginx status shows running:**
   ```bash
   sudo systemctl status nginx
   ```
3. **API endpoint works:**
   ```bash
   curl http://localhost:8080/api/health
   # Should return backend response
   ```

---

## 📞 Quick Reference

**Commands to run ON PRODUCTION SERVER (65.0.107.177):**

```bash
sudo nginx -t          # Test config
sudo nginx -s reload   # Reload nginx
sudo systemctl status nginx  # Check status
```

**NOT on your local machine!**
