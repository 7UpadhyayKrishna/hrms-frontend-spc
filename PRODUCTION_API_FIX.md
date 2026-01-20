# Production API 404 Fix

## Problem
Getting 404 errors when calling `/api/candidates/upload-resume` in production.

## Root Cause
The nginx proxy configuration is set for Docker (`http://hrms-backend:5001`), but in standalone deployment, the backend is on a different URL.

## Solutions

### Option 1: Update nginx.conf for Standalone Deployment

If you're running frontend and backend separately (not in Docker):

1. **Edit `nginx.conf`** and change the proxy_pass line:
   ```nginx
   location /api/ {
       # Change this to your actual backend URL
       proxy_pass http://localhost:5001/api/;
       # Or for remote backend:
       # proxy_pass http://65.0.107.177:5001/api/;
       # Or use environment variable:
       # proxy_pass $backend_url/api/;
   }
   ```

2. **Or use the standalone config:**
   ```bash
   cp nginx-standalone.conf nginx.conf
   # Edit nginx.conf and set your backend URL
   ```

3. **Restart nginx:**
   ```bash
   sudo nginx -t  # Test configuration
   sudo nginx -s reload  # Reload nginx
   ```

### Option 2: Use Environment Variable for Backend URL

If backend URL changes, use environment variable:

1. **Set environment variable:**
   ```bash
   export BACKEND_URL=http://65.0.107.177:5001
   ```

2. **Update nginx to use it:**
   ```nginx
   location /api/ {
       proxy_pass $backend_url/api/;
   }
   ```

3. **Start nginx with env:**
   ```bash
   envsubst '${BACKEND_URL}' < nginx.conf.template > nginx.conf
   nginx -g "daemon off;"
   ```

### Option 3: Set VITE_API_URL Environment Variable

If frontend is built separately and backend is on different domain:

1. **Set environment variable before build:**
   ```bash
   export VITE_API_URL=http://65.0.107.177:5001/api
   npm run build
   ```

2. **Or set in deployment platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Docker: `docker run -e VITE_API_URL=http://backend:5001/api ...`

### Option 4: Check Backend is Running

Verify backend is accessible:

```bash
# Test backend directly
curl http://65.0.107.177:5001/api/candidates/upload-resume

# Or check if backend is running
curl http://localhost:5001/health
```

## Quick Fix for Current Issue

Since you're accessing `http://65.0.107.177:8080`, the frontend is on port 8080. Update nginx.conf:

```nginx
location /api/ {
    # Assuming backend is on same server, port 5001
    proxy_pass http://localhost:5001/api/;
    # Or if backend is on different server:
    # proxy_pass http://65.0.107.177:5001/api/;
}
```

Then:
1. Rebuild Docker image (if using Docker)
2. Or restart nginx (if standalone)
3. Test the API endpoint

## Verification

After fixing, test:
```bash
# From browser console or curl
curl -X POST http://65.0.107.177:8080/api/candidates/upload-resume \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "resume=@test.pdf"
```

Should return 200 (or 401 if not authenticated), not 404.
