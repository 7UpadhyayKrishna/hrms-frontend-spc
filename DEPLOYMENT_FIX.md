# Deployment 404 Fix Guide

## Issue
Getting 404 errors for JavaScript assets (e.g., `index-DS7FH22w.js`) on deployment.

## Solutions

### 1. Rebuild the Frontend
The build might be stale. Rebuild before deploying:

```bash
cd hrms-frontend-spc
npm run build
```

### 2. Clear Deployment Cache
If using Vercel/Netlify:
- **Vercel**: Go to Project Settings → Clear Build Cache → Redeploy
- **Netlify**: Go to Site Settings → Build & Deploy → Clear cache and deploy site

### 3. Verify Build Output
After building, check that `dist/` folder contains:
- `index.html`
- `assets/` folder with JS/CSS files
- `_redirects` file
- `_headers` file (if using Netlify)

### 4. Check Base Path
The `vite.config.js` now has `base: '/'` configured. If deploying to a subdirectory, update it:
```javascript
base: '/your-subdirectory/' // Only if deploying to subdirectory
```

### 5. Verify _redirects File
Ensure `public/_redirects` contains:
```
/* /index.html 200
```

This ensures all routes serve `index.html` for SPA routing.

### 6. Deployment Platform Specific

#### Vercel
- No additional config needed
- `_redirects` file is automatically used
- Ensure build command: `npm run build`
- Ensure output directory: `dist`

#### Netlify
- Ensure `_redirects` is in `public/` folder (it will be copied to `dist/`)
- Ensure build command: `npm run build`
- Ensure publish directory: `dist`

#### Docker/Nginx
- The `nginx.conf` is already configured correctly
- Ensure assets are served from `/assets/` path
- Ensure SPA routing works with `try_files $uri $uri/ /index.html;`

### 7. Check Browser Console
After deployment, check browser console for:
- Exact file name that's 404ing
- Compare with files in `dist/assets/` folder
- If names don't match, rebuild is needed

### 8. Force Cache Clear
If files exist but browser is caching:
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear browser cache

## Quick Fix Steps

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

3. **Commit and push:**
   ```bash
   git add dist/
   git commit -m "Rebuild frontend assets"
   git push
   ```

4. **Redeploy on your platform**

5. **Clear browser cache and test**

## If Issue Persists

Check the actual error in browser console:
- What exact file is 404ing?
- What's the full URL?
- Compare with files in `dist/assets/`

The file names are hashed, so they change with each build. If the HTML references a different hash than what exists, you need to rebuild.
