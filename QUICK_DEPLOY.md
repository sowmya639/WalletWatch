# WalletWatch - Quick Deploy Reference

## 🚀 Fastest Way to Deploy (5 Minutes)

### Step 1: Upload to GitHub (2 min)

```cmd
git init
git add .
git commit -m "Initial commit: WalletWatch app"
git remote add origin https://github.com/YOUR_USERNAME/walletwatch.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Frontend to Vercel (1 min)

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Settings:
   - Root Directory: `frontend`
   - Framework: Vite
5. Environment Variables:
   ```
   VITE_API_URL=https://your-backend.railway.app
   VITE_API_KEY=your-api-key
   ```
6. Deploy!

### Step 3: Deploy Backend to Railway (2 min)

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select your repo
4. Settings:
   - Root Directory: `backend`
5. Environment Variables:
   ```
   WALLETWATCH_API_KEY=your-api-key
   MONGO_URI=mongodb-atlas-connection-string
   NODE_ENV=production
   ```
6. Deploy!

### Step 4: Update Frontend URL

1. Copy Railway backend URL
2. Update Vercel environment variable `VITE_API_URL`
3. Redeploy frontend

---

## 🔑 Required Environment Variables

### Backend (Railway)
```
WALLETWATCH_API_KEY=<generate-random-key>
MONGO_URI=<mongodb-atlas-uri>
NODE_ENV=production
```

### Frontend (Vercel)
```
VITE_API_URL=<railway-backend-url>
VITE_API_KEY=<same-as-backend>
```

---

## 🗄️ MongoDB Atlas Setup (Free)

1. https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: 0.0.0.0/0 (allow all)
5. Get connection string
6. Add to Railway as `MONGO_URI`

---

## ✅ Verify Deployment

- Frontend: `https://your-app.vercel.app`
- Backend Health: `https://your-backend.railway.app/health`

---

## 🎉 Done!

Your app is live! Share the Vercel URL with anyone!
