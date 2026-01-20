# Production Deployment 404 Fix

## Issue
Getting 404 error when calling `/api/candidates/upload-resume` in production at `http://65.0.107.177:8080`.

## Root Cause
The nginx proxy is configured to forward requests to `http://hrms-backend:5001`, which only works if:
1. Backend is running in a Docker container named `hrms-backend`
2. Frontend and backend are in the same Docker network

If you're deploying standalone (not Docker), the proxy can't resolve `hrms-backend` hostname.

## Solutions

### Option 1: Set Backend URL Environment Variable (Recommended)

If using Docker, set the backend URL:

```bash
# In docker-compose.yml or Docker run command
environment:
  - BACKEND_URL=http://your-backend-ip:5001
  # Or if backend is on same server:
  - BACKEND_URL=http://localhost:5001
```

### Option 2: Update nginx.conf Directly

Edit `nginx.conf` and change the proxy_pass line:

```nginx
location /api/ {
    # Replace with your actual backend URL
    proxy_pass http://YOUR_BACKEND_IP:5001/api/;
    # ... rest of config
}
```

For example, if backend is on the same server:
```nginx
proxy_pass http://localhost:5001/api/;
```

Or if backend is on a different server:
```nginx
proxy_pass http://65.0.107.177:5001/api/;
```

### Option 3: Use Direct API URL (No Proxy)

If you don't want to use nginx proxy, set `VITE_API_URL` environment variable:

1. **Build with environment variable:**
   ```bash
   VITE_API_URL=http://your-backend-url:5001/api npm run build
   ```

2. **Or set in deployment platform:**
   - Vercel/Netlify: Add `VITE_API_URL` in environment variables
   - Docker: Pass as build arg:
     ```dockerfile
     ARG VITE_API_URL
     ENV VITE_API_URL=$VITE_API_URL
     ```

3. **Rebuild frontend:**
   ```bash
   npm run build
   ```

## Quick Fix for Current Deployment

1. **Find your backend URL:**
   - Is backend on same server? → Use `http://localhost:5001`
   - Is backend on different server? → Use `http://BACKEND_IP:5001`
   - Is backend on Render/other service? → Use full URL like `https://hrms-backend-xbz8.onrender.com`

2. **Update nginx.conf:**
   ```nginx
   location /api/ {
       proxy_pass http://YOUR_BACKEND_URL/api/;
       # ... rest stays same
   }
   ```

3. **Rebuild and redeploy:**
   ```bash
   cd hrms-frontend-spc
   npm run build
   # Then redeploy
   ```

## Verify Backend is Running

Test if backend is accessible:

```bash
# If backend is on same server
curl http://localhost:5001/health

# If backend is on different server
curl http://YOUR_BACKEND_IP:5001/health

# Should return: {"success":true,"message":"HRMS API is running",...}
```

## Check nginx Logs

If still having issues, check nginx error logs:

```bash
# Docker
docker logs <frontend-container-name>

# Standalone
tail -f /var/log/nginx/error.log
```

Look for errors like:
- `upstream timed out` → Backend not reachable
- `connection refused` → Backend not running
- `name resolution failed` → Can't resolve hostname

## Recommended Setup

For production, use environment variables:

1. **Create `.env.production`:**
   ```
   VITE_API_URL=http://your-backend-url:5001/api
   ```

2. **Or set in deployment:**
   - Docker: `-e VITE_API_URL=http://backend:5001/api`
   - Vercel/Netlify: Add in dashboard

3. **Rebuild:**
   ```bash
   npm run build
   ```

This way, frontend makes direct API calls without needing nginx proxy.
