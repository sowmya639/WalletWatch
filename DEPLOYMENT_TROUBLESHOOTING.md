# 🔧 Deployment Troubleshooting Guide

Can't see your app after deployment? Let's fix it!

---

## 🔍 Common Issues & Solutions

### Issue 1: Blank Page / White Screen

**Symptoms:**
- Page loads but shows nothing
- White/blank screen
- No errors visible

**Causes & Solutions:**

#### A. Wrong Root Directory

**Problem**: Vercel is looking in the wrong folder

**Solution**:
1. Go to Vercel Dashboard
2. Click your project → Settings → General
3. Check "Root Directory"
4. Should be: `frontend` (not empty, not `./frontend`)
5. Save and redeploy

#### B. Build Failed

**Problem**: Frontend didn't build correctly

**Solution**:
1. Go to Vercel Dashboard
2. Click Deployments
3. Click latest deployment
4. Check "Build Logs"
5. Look for errors

**Common build errors:**
```
Error: Cannot find module 'vite'
Solution: Check package.json has vite in dependencies

Error: Build failed
Solution: Check all imports are correct
```

#### C. Environment Variables Missing

**Problem**: VITE_API_URL not set

**Solution**:
1. Vercel → Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   VITE_API_KEY=your-api-key
   ```
3. Redeploy

---

### Issue 2: 404 Not Found

**Symptoms:**
- "404 - Page Not Found"
- "This page could not be found"

**Causes & Solutions:**

#### A. Deployment Not Complete

**Problem**: Still deploying

**Solution**:
- Wait 2-3 minutes
- Refresh the page
- Check deployment status in Vercel

#### B. Wrong Output Directory

**Problem**: Vercel can't find built files

**Solution**:
1. Vercel → Settings → Build & Development
2. Output Directory should be: `dist`
3. Build Command should be: `npm run build`
4. Redeploy

---

### Issue 3: Can't Connect to Backend

**Symptoms:**
- Frontend loads but no data
- "Network Error" in console
- "Failed to fetch" errors

**Causes & Solutions:**

#### A. Backend Not Running

**Problem**: Railway backend crashed or not deployed

**Solution**:
1. Go to Railway Dashboard
2. Check deployment status
3. Click on your service
4. Check "Logs" tab for errors

**Common backend errors:**
```
MongoDB connection error
Solution: Check MONGO_URI is correct

Port already in use
Solution: Railway handles this automatically, redeploy

Missing environment variables
Solution: Add all required env vars
```

#### B. Wrong API URL

**Problem**: Frontend pointing to wrong backend

**Solution**:
1. Get your Railway backend URL:
   - Railway Dashboard → Your Service
   - Copy the URL (e.g., `https://walletwatch-production.up.railway.app`)

2. Update Vercel environment variable:
   - Vercel → Settings → Environment Variables
   - Update `VITE_API_URL` with correct Railway URL
   - **Important**: No trailing slash!
   - ✅ Correct: `https://backend.railway.app`
   - ❌ Wrong: `https://backend.railway.app/`

3. Redeploy frontend

#### C. CORS Error

**Problem**: Backend blocking frontend requests

**Symptoms in browser console:**
```
Access to fetch at 'https://backend...' from origin 'https://frontend...' 
has been blocked by CORS policy
```

**Solution**:

Update `backend/server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-url.vercel.app',
    'https://*.vercel.app'  // Allow all Vercel preview deployments
  ],
  credentials: true
}));
```

Then:
1. Commit and push to GitHub
2. Railway will auto-deploy
3. Test again

---

### Issue 4: Backend Health Check Fails

**Symptoms:**
- Can't access `https://your-backend.railway.app/health`
- 502 Bad Gateway
- Service Unavailable

**Causes & Solutions:**

#### A. MongoDB Connection Failed

**Problem**: Can't connect to MongoDB Atlas

**Solution**:
1. Check MongoDB Atlas:
   - Network Access → IP Whitelist
   - Should have `0.0.0.0/0` (allow all)

2. Check connection string:
   - Railway → Variables → MONGO_URI
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/walletwatch`
   - Replace `<password>` with actual password
   - No spaces or special characters in URL

3. Test connection string:
   - Copy MONGO_URI
   - Use MongoDB Compass or mongosh to test

#### B. Environment Variables Missing

**Problem**: Required env vars not set

**Solution**:

Railway → Variables → Add these:
```env
WALLETWATCH_API_KEY=daa1f85101825fdf56d9a6aa6ac192ac3a655a3bf538967b5325f387aa8e5010
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/walletwatch
NODE_ENV=production
```

#### C. Build Failed

**Problem**: npm install or start failed

**Solution**:
1. Railway → Deployments → Click latest
2. Check "Deploy Logs"
3. Look for errors

**Common errors:**
```
Error: Cannot find module 'express'
Solution: Check package.json has all dependencies

Error: ENOENT: no such file or directory
Solution: Check Root Directory is set to 'backend'
```

---

### Issue 5: Data Not Persisting

**Symptoms:**
- Can add data but disappears on refresh
- Budget/expenses don't save

**Causes & Solutions:**

#### A. API Key Mismatch

**Problem**: Frontend and backend API keys don't match

**Solution**:
1. Check backend API key:
   - Railway → Variables → WALLETWATCH_API_KEY

2. Check frontend API key:
   - Vercel → Settings → Environment Variables → VITE_API_KEY

3. **They must be identical!**

4. If different, update one to match the other and redeploy

#### B. MongoDB Not Connected

**Problem**: Backend running but not saving to database

**Solution**:
1. Check Railway logs:
   ```
   Look for: "✅ MongoDB connected successfully"
   ```

2. If you see connection errors:
   - Verify MONGO_URI is correct
   - Check MongoDB Atlas IP whitelist
   - Verify database user credentials

---

## 🛠️ Step-by-Step Debugging

### Step 1: Check Frontend Deployment

1. **Go to Vercel Dashboard**
2. **Check deployment status**:
   - ✅ Green = Success
   - 🔴 Red = Failed
   - 🟡 Yellow = Building

3. **If failed**:
   - Click deployment
   - Read "Build Logs"
   - Fix errors
   - Redeploy

4. **If successful**:
   - Visit your URL
   - Open browser console (F12)
   - Look for errors

### Step 2: Check Backend Deployment

1. **Go to Railway Dashboard**
2. **Check service status**:
   - Should show "Active"

3. **Test health endpoint**:
   - Visit: `https://your-backend.railway.app/health`
   - Should see: `{"status":"ok","message":"WalletWatch API is running"}`

4. **If not working**:
   - Click service → Logs
   - Look for errors
   - Fix and redeploy

### Step 3: Check Database Connection

1. **Go to MongoDB Atlas**
2. **Check cluster status**:
   - Should show "Active"

3. **Verify network access**:
   - Network Access tab
   - Should have `0.0.0.0/0`

4. **Test connection**:
   - Use connection string in MongoDB Compass
   - Should connect successfully

### Step 4: Check Environment Variables

**Backend (Railway)**:
```env
✅ WALLETWATCH_API_KEY (set and matches frontend)
✅ PORT (5000)
✅ MONGO_URI (correct format with password)
✅ NODE_ENV (production)
```

**Frontend (Vercel)**:
```env
✅ VITE_API_URL (correct Railway URL, no trailing slash)
✅ VITE_API_KEY (matches backend)
```

### Step 5: Check Browser Console

1. **Open your deployed frontend**
2. **Press F12** (open DevTools)
3. **Go to Console tab**
4. **Look for errors**:

**Common errors and fixes:**

```javascript
// Error: Failed to fetch
// Fix: Check VITE_API_URL is correct

// Error: 401 Unauthorized
// Fix: Check API keys match

// Error: CORS policy
// Fix: Update backend CORS settings

// Error: Network request failed
// Fix: Check backend is running
```

---

## 📋 Quick Checklist

Use this to verify everything:

### Frontend (Vercel)
- [ ] Deployment status is "Ready"
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] VITE_API_URL is set correctly
- [ ] VITE_API_KEY is set correctly
- [ ] Can visit the URL
- [ ] No errors in browser console

### Backend (Railway)
- [ ] Service status is "Active"
- [ ] Root Directory: `backend`
- [ ] WALLETWATCH_API_KEY is set
- [ ] MONGO_URI is set correctly
- [ ] PORT is set to 5000
- [ ] Health check works (/health)
- [ ] No errors in logs

### Database (MongoDB Atlas)
- [ ] Cluster is active
- [ ] Database user exists
- [ ] IP whitelist includes 0.0.0.0/0
- [ ] Connection string is correct
- [ ] Can connect from Railway

---

## 🔍 How to Get Detailed Error Info

### From Vercel:
1. Dashboard → Your Project
2. Deployments → Click latest
3. Three tabs to check:
   - **Build Logs**: Build errors
   - **Functions**: Runtime errors
   - **Runtime Logs**: Application errors

### From Railway:
1. Dashboard → Your Service
2. Click "Logs" tab
3. Look for:
   - Connection errors
   - Missing modules
   - MongoDB errors
   - Port errors

### From Browser:
1. Open deployed site
2. Press F12
3. Check tabs:
   - **Console**: JavaScript errors
   - **Network**: API call failures
   - **Application**: Storage issues

---

## 💡 Most Common Fix

**90% of deployment issues are:**

1. **Wrong environment variables**
   - Solution: Double-check all env vars

2. **Wrong root directory**
   - Frontend: `frontend`
   - Backend: `backend`

3. **API URL mismatch**
   - Frontend VITE_API_URL must match Railway URL exactly

4. **MongoDB connection**
   - Check IP whitelist (0.0.0.0/0)
   - Verify connection string format

---

## 🆘 Still Not Working?

### Share These Details:

1. **Frontend URL**: (your Vercel URL)
2. **Backend URL**: (your Railway URL)
3. **Error message**: (from browser console)
4. **Deployment logs**: (from Vercel/Railway)

### Quick Tests:

```bash
# Test backend health
curl https://your-backend.railway.app/health

# Test backend API (replace with your URL and API key)
curl -H "X-API-Key: your-api-key" https://your-backend.railway.app/api/budget
```

---

## ✅ Success Indicators

Your deployment is working when:

1. ✅ Frontend URL loads the app
2. ✅ Backend /health returns OK
3. ✅ No errors in browser console
4. ✅ Can set a budget
5. ✅ Can add expenses
6. ✅ Data persists after refresh
7. ✅ Dashboard shows charts

---

**Need more help? Share your error messages and I'll help you fix them!** 🚀
