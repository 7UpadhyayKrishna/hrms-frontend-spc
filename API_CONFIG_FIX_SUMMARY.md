# Frontend API Configuration Audit & Fix Summary

## ✅ **Status: All Hardcoded URLs Removed**

All frontend code now properly uses the centralized `config.apiBaseUrl` from `src/config/api.config.js` instead of hardcoded URLs.

---

## 🔧 **Configuration System**

### **Central Configuration File**
- **File**: `src/config/api.config.js`
- **Export**: `config.apiBaseUrl`

### **Environment Detection**
```javascript
// Development (npm run dev)
apiBaseUrl: '/api'  // Proxied to localhost:5001 via Vite

// Production (npm run build)
apiBaseUrl: import.meta.env.VITE_API_URL || '/api'
```

### **How It Works**

#### **Development Mode:**
- Uses `/api` path
- Vite proxy forwards to `http://localhost:5001`
- Configured in `vite.config.js`

#### **Production Mode:**
- Reads `VITE_API_URL` from environment variables
- Falls back to `/api` (for nginx proxy setup)
- No hardcoded localhost URLs

---

## 🛠️ **Files Fixed**

### **1. CandidateDocuments.jsx**
**Before:**
```javascript
`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/...`
```

**After:**
```javascript
import { config } from '../config/api.config';
`${config.apiBaseUrl}/...`
```

### **2. CompanyLogin.jsx**
**Before:**
```javascript
axios.get(`${import.meta.env.VITE_API_URL}/api/auth/companies`)
```

**After:**
```javascript
import { config } from '../config/api.config';
axios.get(`${config.apiBaseUrl}/auth/companies`)
```

### **3. Employee/Onboarding.jsx**
**Before:**
```javascript
const backendBaseUrl = import.meta.env.VITE_API_URL || '';
```

**After:**
```javascript
import { config } from '../../config/api.config';
const backendBaseUrl = config.apiBaseUrl.replace('/api', '');
```

---

## ✅ **Files Already Using Config Correctly**

These files were already properly configured:

1. ✅ `src/api/axios.js` - Uses `config.apiBaseUrl`
2. ✅ `src/api/documentUpload.js` - Uses `config.apiBaseUrl`
3. ✅ `src/pages/SPCManagementLogin.jsx` - Uses `config.apiBaseUrl`
4. ✅ `src/pages/CompanySelect.jsx` - Uses `config.apiBaseUrl`
5. ✅ `src/pages/Public/CareersPage.jsx` - Uses `config.apiBaseUrl`
6. ✅ `src/components/ResumeSubmissionModal.jsx` - Uses `config.apiBaseUrl`
7. ✅ All Manager Dashboard pages - Use `config.apiBaseUrl`

---

## 🐳 **Docker Environment Setup**

### **Create `.env.production` File**
```bash
# Production API URL (set this to your backend URL)
VITE_API_URL=https://your-backend-domain.com/api

# Or for Docker deployment with nginx proxy
VITE_API_URL=/api

# Frontend URL
VITE_FRONTEND_URL=https://your-frontend-domain.com
```

### **Docker Build Command**
```bash
# Build with production environment
docker build \
  --build-arg VITE_API_URL=https://api.yourdomain.com/api \
  -t hrms-frontend-spc:latest .
```

---

## 📝 **Verification Checklist**

- ✅ **No hardcoded `localhost:5001`** in source code (only in comments)
- ✅ **No hardcoded `localhost:5000`** in source code
- ✅ **All API calls** use `config.apiBaseUrl`
- ✅ **All axios instances** use `config.apiBaseUrl`
- ✅ **All fetch calls** use `config.apiBaseUrl`
- ✅ **Configuration** reads from `import.meta.env.VITE_API_URL`
- ✅ **Fallback** to relative `/api` path for nginx proxy

---

## 🚀 **Deployment Options**

### **Option 1: Docker with Nginx Proxy (Recommended)**
```yaml
# docker-compose.yml
services:
  backend:
    image: hrms-backend
    ports:
      - "5001:5001"
  
  frontend:
    image: hrms-frontend-spc
    ports:
      - "80:80"
    # Nginx will proxy /api to backend
```

Frontend uses: `/api` → Nginx proxies to backend

### **Option 2: Separate Deployments**
```bash
# Set environment variable
VITE_API_URL=https://backend.yourdomain.com/api

# Build
npm run build
```

Frontend uses: `https://backend.yourdomain.com/api`

---

## 🔍 **Testing**

### **Check Configuration at Runtime**
Open browser console and run:
```javascript
// In development
// Should log: { apiBaseUrl: '/api', environment: 'development', ... }

// In production
// Should log: { apiBaseUrl: 'https://...', environment: 'production', ... }
```

### **Verify API Calls**
1. Open DevTools → Network tab
2. Filter by "api"
3. Check request URLs:
   - ✅ Development: `http://localhost:5173/api/...` (proxied)
   - ✅ Production: `https://your-domain.com/api/...`

---

## 📊 **Summary**

### **Before Fix:**
- ❌ 3 files with hardcoded URLs
- ❌ Direct `import.meta.env` usage
- ❌ Inconsistent API base URLs

### **After Fix:**
- ✅ All files use centralized config
- ✅ Single source of truth (`api.config.js`)
- ✅ Environment-aware configuration
- ✅ Production-ready setup

---

## 🎯 **Result**

**Frontend now properly uses environment variables!**

- `VITE_API_URL` in `.env.production` → Used in production build
- `/api` proxy in development → Seamless local dev
- Centralized configuration → Easy to maintain

**Ready for Docker deployment! 🐳**
