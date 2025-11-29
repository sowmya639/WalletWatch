# WalletWatch - Deployment Guide

Complete guide to upload to GitHub and deploy your application.

---

## 📦 Part 1: Upload to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `walletwatch`
3. Description: "Personal Budget & Expense Tracking Application"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Initialize Git (if not already done)

Open terminal in your WalletWatch folder:

```cmd
git init
git add .
git commit -m "Initial commit: WalletWatch - Budget tracking app"
```

### Step 3: Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```cmd
git remote add origin https://github.com/YOUR_USERNAME/walletwatch.git
git branch -M main
git push -u origin main
```

### Step 4: Verify Upload

Go to your GitHub repository URL and verify all files are uploaded.

---

## 🌐 Part 2: Deploy the Application

You have several deployment options:

---

## Option 1: Deploy to Vercel + Railway (Recommended)

### Frontend on Vercel (Free)

**Step 1: Deploy Frontend**

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your `walletwatch` repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   VITE_API_KEY=your-api-key-here
   ```
7. Click "Deploy"

**Step 2: Deploy Backend on Railway**

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `walletwatch` repository
5. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   ```
   WALLETWATCH_API_KEY=your-api-key-here
   PORT=5000
   MONGO_URI=your-mongodb-atlas-connection-string
   TWILIO_ACCOUNT_SID=your-twilio-sid (optional)
   TWILIO_AUTH_TOKEN=your-twilio-token (optional)
   TWILIO_PHONE_NUMBER=+1234567890 (optional)
   RECIPIENT_PHONE_NUMBER=+1234567890 (optional)
   NODE_ENV=production
   ```
7. Railway will provide a URL like: `https://walletwatch-backend.railway.app`
8. Copy this URL and update Vercel's `VITE_API_URL`

**Step 3: Set up MongoDB Atlas**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster (if not already done)
3. Get connection string
4. Add to Railway environment variables as `MONGO_URI`

---

## Option 2: Deploy to Render (Free)

### Backend on Render

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: walletwatch-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Add Environment Variables (same as Railway above)
7. Click "Create Web Service"

### Frontend on Render

1. Click "New" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: walletwatch-frontend
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variables:
   ```
   VITE_API_URL=https://walletwatch-backend.onrender.com
   VITE_API_KEY=your-api-key-here
   ```
5. Click "Create Static Site"

---

## Option 3: Deploy to Heroku

### Backend on Heroku

1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login:
   ```cmd
   heroku login
   ```
3. Create app:
   ```cmd
   cd backend
   heroku create walletwatch-backend
   ```
4. Set environment variables:
   ```cmd
   heroku config:set WALLETWATCH_API_KEY=your-key
   heroku config:set MONGO_URI=your-mongodb-uri
   heroku config:set NODE_ENV=production
   ```
5. Deploy:
   ```cmd
   git subtree push --prefix backend heroku main
   ```

### Frontend on Netlify

1. Go to https://netlify.com
2. Drag and drop your `frontend/dist` folder
3. Or connect GitHub repository
4. Configure build:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Add environment variables in Netlify dashboard

---

## 🔧 Pre-Deployment Checklist

### 1. Update CORS Settings

Edit `backend/server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.vercel.app'
  ],
  credentials: true
}));
```

### 2. Update API URL

Make sure frontend `.env` has the correct backend URL:

```env
VITE_API_URL=https://your-backend-url.railway.app
```

### 3. Set up MongoDB Atlas

- Use MongoDB Atlas (cloud) instead of local MongoDB
- Get connection string
- Add to backend environment variables

### 4. Generate Secure API Key

```cmd
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use this key in both frontend and backend environment variables.

### 5. Optional: Configure Twilio

If you want SMS alerts in production:
- Add Twilio credentials to backend environment variables
- Verify phone numbers in Twilio dashboard

---

## 📝 Environment Variables Summary

### Backend Environment Variables

```env
WALLETWATCH_API_KEY=<secure-random-key>
PORT=5000
MONGO_URI=<mongodb-atlas-connection-string>
TWILIO_ACCOUNT_SID=<optional>
TWILIO_AUTH_TOKEN=<optional>
TWILIO_PHONE_NUMBER=<optional>
RECIPIENT_PHONE_NUMBER=<optional>
NODE_ENV=production
```

### Frontend Environment Variables

```env
VITE_API_URL=<backend-url>
VITE_API_KEY=<same-as-backend-key>
```

---

## 🧪 Testing Deployment

After deployment:

1. **Test Frontend**:
   - Visit your frontend URL
   - Check if UI loads correctly
   - Open browser console for errors

2. **Test Backend**:
   - Visit `https://your-backend-url/health`
   - Should return: `{"status":"ok","message":"WalletWatch API is running"}`

3. **Test Full Flow**:
   - Set a budget
   - Add an expense
   - Check dashboard
   - Verify data persists

---

## 🔒 Security Best Practices

1. **Never commit .env files** (already in .gitignore)
2. **Use strong API keys** (32+ character random strings)
3. **Enable HTTPS** (automatic on Vercel/Railway/Render)
4. **Restrict CORS** to your frontend domain only
5. **Use MongoDB Atlas** with authentication
6. **Rotate API keys** periodically

---

## 📊 Monitoring

### Check Logs

**Vercel**: Dashboard → Your Project → Logs
**Railway**: Dashboard → Your Service → Logs
**Render**: Dashboard → Your Service → Logs

### Common Issues

1. **CORS Error**: Update backend CORS settings
2. **API Key Error**: Ensure keys match in frontend/backend
3. **MongoDB Connection**: Check connection string and IP whitelist
4. **Build Fails**: Check build logs for missing dependencies

---

## 🚀 Quick Deploy Commands

### For Vercel (Frontend)

```cmd
cd frontend
npm install -g vercel
vercel
```

### For Railway (Backend)

```cmd
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## 📱 Custom Domain (Optional)

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Railway

1. Go to Service Settings → Networking
2. Add custom domain
3. Update DNS records

---

## 🎉 Post-Deployment

After successful deployment:

1. ✅ Share your live URL!
2. ✅ Update README with live demo link
3. ✅ Add screenshots to GitHub
4. ✅ Test on mobile devices
5. ✅ Monitor usage and logs

---

## 📞 Support

If you encounter issues:

1. Check deployment platform logs
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors
5. Review CORS settings

---

## 🎯 Recommended Setup

**Best Free Combination:**
- **Frontend**: Vercel (Fast, easy, free SSL)
- **Backend**: Railway (Easy Node.js deployment)
- **Database**: MongoDB Atlas (Free 512MB)

**Total Cost**: $0 (Free tier)

---

## 📝 Example Deployment URLs

After deployment, your URLs will look like:

- **Frontend**: `https://walletwatch.vercel.app`
- **Backend**: `https://walletwatch-backend.railway.app`
- **API Health**: `https://walletwatch-backend.railway.app/health`

---

**Good luck with your deployment! 🚀**

For questions or issues, refer to:
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
