# 🚀 WalletWatch Deployment Guide

Complete guide to deploy WalletWatch online so anyone can access it!

---

## 🎯 Deployment Options

### Best Free Options:
1. **Frontend**: Vercel or Netlify (Free)
2. **Backend**: Railway or Render (Free tier)
3. **Database**: MongoDB Atlas (Free tier)

---

## 📋 Prerequisites

Before deploying:
- ✅ Code uploaded to GitHub
- ✅ MongoDB Atlas account (cloud database)
- ✅ Vercel/Railway account

---

## 🗄️ Step 1: Deploy Database (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create a **FREE M0 cluster**
4. Choose AWS, region closest to you
5. Click "Create Deployment"

### 1.2 Create Database User

1. Security → Database Access
2. Click "Add New Database User"
3. Username: `walletwatch`
4. Password: Generate secure password (save it!)
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

### 1.3 Allow Network Access

1. Security → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.4 Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string:
   ```
   mongodb+srv://walletwatch:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name: `walletwatch`
   ```
   mongodb+srv://walletwatch:yourpassword@cluster0.xxxxx.mongodb.net/walletwatch?retryWrites=true&w=majority
   ```

**Save this connection string!** You'll need it for backend deployment.

---

## 🖥️ Step 2: Deploy Backend (Railway)

### 2.1 Sign Up for Railway

1. Go to: https://railway.app
2. Sign up with GitHub
3. Authorize Railway to access your repositories

### 2.2 Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your **WalletWatch** repository
4. Railway will detect it's a Node.js app

### 2.3 Configure Backend

1. Click on your deployment
2. Go to "Settings"
3. **Root Directory**: Set to `backend`
4. **Start Command**: `npm start`

### 2.4 Add Environment Variables

1. Go to "Variables" tab
2. Click "Add Variable" for each:

```env
WALLETWATCH_API_KEY=daa1f85101825fdf56d9a6aa6ac192ac3a655a3bf538967b5325f387aa8e5010
PORT=5000
MONGO_URI=mongodb+srv://walletwatch:yourpassword@cluster0.xxxxx.mongodb.net/walletwatch?retryWrites=true&w=majority
NODE_ENV=production

# Optional - Twilio (for SMS)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890
RECIPIENT_PHONE_NUMBER=+1234567890
```

**Important**: Use your actual MongoDB connection string!

### 2.5 Deploy

1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Once deployed, you'll get a URL like:
   ```
   https://walletwatch-backend-production.up.railway.app
   ```
4. **Save this URL!** You'll need it for frontend.

### 2.6 Test Backend

Visit: `https://your-backend-url.railway.app/health`

You should see:
```json
{"status":"ok","message":"WalletWatch API is running"}
```

---

## 🌐 Step 3: Deploy Frontend (Vercel)

### 3.1 Sign Up for Vercel

1. Go to: https://vercel.com/signup
2. Sign up with GitHub
3. Authorize Vercel

### 3.2 Import Project

1. Click "Add New" → "Project"
2. Import your **WalletWatch** repository
3. Vercel will detect it's a Vite app

### 3.3 Configure Frontend

1. **Framework Preset**: Vite
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### 3.4 Add Environment Variables

Click "Environment Variables" and add:

```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_API_KEY=daa1f85101825fdf56d9a6aa6ac192ac3a655a3bf538967b5325f387aa8e5010
```

**Important**: Use your actual Railway backend URL!

### 3.5 Deploy

1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. You'll get a URL like:
   ```
   https://wallet-watch.vercel.app
   ```

### 3.6 Test Frontend

1. Visit your Vercel URL
2. You should see WalletWatch!
3. Try adding a budget and expense
4. Check if data persists

---

## 🔧 Step 4: Configure CORS (Backend)

If you get CORS errors, update backend CORS settings:

### Option 1: Update in Railway

Add environment variable:
```env
FRONTEND_URL=https://your-vercel-url.vercel.app
```

### Option 2: Update Code

In `backend/server.js`, update CORS:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

Commit and push to GitHub. Railway will auto-deploy.

---

## ✅ Step 5: Verify Deployment

### Test Checklist:

- [ ] Frontend loads at Vercel URL
- [ ] Can set a budget
- [ ] Can add expenses
- [ ] Dashboard shows charts
- [ ] Data persists after refresh
- [ ] Alerts log works
- [ ] No console errors

---

## 🎨 Step 6: Custom Domain (Optional)

### For Vercel (Frontend):

1. Go to Project Settings → Domains
2. Add your domain (e.g., walletwatch.com)
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 24 hours)

### For Railway (Backend):

1. Go to Settings → Domains
2. Add custom domain
3. Configure DNS records
4. Update frontend VITE_API_URL

---

## 🔄 Alternative Deployment Options

### Option 2: Render (Backend Alternative)

**Pros**: Free tier, easy setup
**Cons**: Slower cold starts

1. Go to: https://render.com
2. New → Web Service
3. Connect GitHub repository
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables
8. Deploy

### Option 3: Netlify (Frontend Alternative)

**Pros**: Great for static sites
**Cons**: Similar to Vercel

1. Go to: https://netlify.com
2. Import from GitHub
3. Base directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Add environment variables
7. Deploy

---

## 📊 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│  Users Access                                    │
│  https://wallet-watch.vercel.app                │
└─────────────────┬───────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────┐
│  Frontend (Vercel)                              │
│  - React Application                            │
│  - Static Files                                 │
│  - Environment: VITE_API_URL                    │
└─────────────────┬───────────────────────────────┘
                  │
                  │ API Calls
                  ▼
┌─────────────────────────────────────────────────┐
│  Backend (Railway)                              │
│  - Express.js API                               │
│  - https://walletwatch-backend.railway.app      │
│  - Environment: MONGO_URI, API_KEY              │
└─────────────────┬───────────────────────────────┘
                  │
                  │ Database Queries
                  ▼
┌─────────────────────────────────────────────────┐
│  Database (MongoDB Atlas)                       │
│  - Cloud MongoDB                                │
│  - Free M0 Cluster                              │
│  - Automatic Backups                            │
└─────────────────────────────────────────────────┘
```

---

## 💰 Cost Breakdown

### Free Tier Limits:

**MongoDB Atlas (Free)**:
- 512 MB storage
- Shared RAM
- Perfect for personal use

**Railway (Free)**:
- $5 credit/month
- ~500 hours runtime
- Enough for personal projects

**Vercel (Free)**:
- Unlimited deployments
- 100 GB bandwidth/month
- Perfect for frontend

**Total Cost**: $0/month for personal use! 🎉

---

## 🔐 Security Checklist

Before going live:

- [ ] API key is strong and unique
- [ ] MongoDB has authentication enabled
- [ ] Environment variables are set correctly
- [ ] .env files are NOT in GitHub
- [ ] CORS is configured properly
- [ ] HTTPS is enabled (automatic on Vercel/Railway)
- [ ] Rate limiting considered (optional)

---

## 🐛 Troubleshooting

### Frontend can't connect to backend

**Problem**: CORS error or network error

**Solution**:
1. Check VITE_API_URL is correct
2. Verify backend is running (visit /health endpoint)
3. Check CORS configuration
4. Ensure API key matches

### Backend won't start

**Problem**: Deployment fails

**Solution**:
1. Check build logs in Railway
2. Verify MONGO_URI is correct
3. Check all environment variables are set
4. Ensure `npm start` works locally

### Database connection fails

**Problem**: MongoDB connection error

**Solution**:
1. Check MongoDB Atlas IP whitelist (0.0.0.0/0)
2. Verify connection string format
3. Check username/password are correct
4. Ensure database user has permissions

### Charts not showing

**Problem**: Data not loading

**Solution**:
1. Check browser console for errors
2. Verify API calls are successful
3. Check backend logs
4. Test API endpoints directly

---

## 📈 Monitoring

### Check Application Health:

**Backend Health**:
```
https://your-backend-url.railway.app/health
```

**Railway Logs**:
- Go to Railway dashboard
- Click on your project
- View "Logs" tab

**Vercel Logs**:
- Go to Vercel dashboard
- Click on your project
- View "Deployments" → Click deployment → "Logs"

---

## 🔄 Continuous Deployment

Once set up, deployments are automatic:

1. **Make changes** to your code locally
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```
3. **Automatic deployment**:
   - Railway auto-deploys backend
   - Vercel auto-deploys frontend
4. **Live in 2-3 minutes**!

---

## 🎯 Post-Deployment

### Share Your App:

1. **Add to Portfolio**:
   - Live URL: https://wallet-watch.vercel.app
   - GitHub: https://github.com/YOUR-USERNAME/WalletWatch

2. **Update README**:
   Add live demo link at the top:
   ```markdown
   ## 🌐 Live Demo
   [View Live Application](https://wallet-watch.vercel.app)
   ```

3. **Social Media**:
   Share on LinkedIn, Twitter, etc.

---

## 📝 Quick Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Connection string obtained
- [ ] Backend deployed to Railway
- [ ] Backend environment variables set
- [ ] Backend health check passes
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variables set
- [ ] Frontend connects to backend
- [ ] Test all features work
- [ ] Share your live app!

---

## 🆘 Need Help?

**Railway Support**: https://railway.app/help
**Vercel Support**: https://vercel.com/support
**MongoDB Support**: https://www.mongodb.com/docs/atlas/

---

## 🎉 Congratulations!

Your WalletWatch app is now live and accessible to anyone on the internet!

**Next Steps**:
1. Test thoroughly
2. Share with friends
3. Add to your portfolio
4. Consider custom domain
5. Monitor usage and performance

---

**Your app is deployed! 🚀**
