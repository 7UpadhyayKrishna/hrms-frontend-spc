# Production 404 Fix for Assets

## Problem
Getting 404 errors for JavaScript assets (e.g., `index-DS7FH22w.js`) in production while working perfectly locally.

## Root Cause
The deployment platform isn't properly serving the assets from the `/assets/` directory, or the build wasn't properly deployed.

## Solutions Applied

### 1. Updated nginx.conf
Added explicit `/assets/` location block to ensure assets are served correctly:
```nginx
location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
}
```

### 2. Created vercel.json
For Vercel deployments, ensures proper routing and asset caching:
- Rewrites all routes to `index.html` for SPA
- Sets proper cache headers for assets

### 3. Created netlify.toml
For Netlify deployments:
- Sets build command and publish directory
- Configures redirects for SPA routing
- Sets cache headers for assets

### 4. Updated _redirects
Added explicit asset routing:
```
/assets/*  /assets/:splat  200
```

## Deployment Steps

### For Vercel:
1. The `vercel.json` is now configured
2. Ensure build command: `npm run build`
3. Ensure output directory: `dist`
4. Clear build cache and redeploy

### For Netlify:
1. The `netlify.toml` is now configured
2. Ensure build command: `npm run build`
3. Ensure publish directory: `dist`
4. Clear cache and redeploy

### For Docker/Nginx:
1. Rebuild the Docker image:
   ```bash
   docker build -t hrms-frontend-spc:latest .
   ```
2. The updated `nginx.conf` will be included
3. Restart the container

## Verification

After deployment, check:
1. Browser console - no 404 errors
2. Network tab - assets load with 200 status
3. Assets URL should be: `https://your-domain.com/assets/index-DS7FH22w.js`

## If Issue Persists

1. **Rebuild locally:**
   ```bash
   cd hrms-frontend-spc
   rm -rf dist
   npm run build
   ```

2. **Verify dist folder:**
   ```bash
   ls -la dist/assets/
   ```
   Should show: `index-DS7FH22w.js` and other assets

3. **Check deployment logs:**
   - Verify build completed successfully
   - Check if `dist/` folder was uploaded
   - Verify assets are in the deployment

4. **Clear all caches:**
   - Deployment platform cache
   - Browser cache (hard refresh: Ctrl+Shift+R / Cmd+Shift+R)
   - CDN cache (if using)

5. **Check file permissions:**
   - Ensure assets are readable
   - Check server logs for permission errors
