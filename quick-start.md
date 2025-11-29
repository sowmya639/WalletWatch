# WalletWatch - Quick Start (5 Minutes)

Get WalletWatch running in 5 minutes! ⚡

---

## Step 1: Install Dependencies (2 min)

Open two terminals:

**Terminal 1 - Backend:**
```cmd
cd backend
npm install
```

**Terminal 2 - Frontend:**
```cmd
cd frontend
npm install
```

---

## Step 2: Setup Environment (1 min)

**Backend:**
```cmd
cd backend
copy .env.sample .env
```

Edit `backend/.env` and set:
```env
WALLETWATCH_API_KEY=mySecretKey123
MONGO_URI=mongodb://localhost:27017/walletwatch
```

**Frontend:**
```cmd
cd frontend
copy .env.sample .env
```

Edit `frontend/.env` and set:
```env
VITE_API_URL=http://localhost:5000
VITE_API_KEY=mySecretKey123
```

⚠️ **Important**: Use the SAME API key in both files!

---

## Step 3: Start MongoDB (30 sec)

**Terminal 3:**
```cmd
mongod
```

Keep this running.

---

## Step 4: Start Servers (1 min)

**Terminal 1 - Backend:**
```cmd
cd backend
npm run dev
```

Wait for: `✅ MongoDB connected successfully`

**Terminal 2 - Frontend:**
```cmd
cd frontend
npm run dev
```

Wait for: `Local: http://localhost:3000/`

---

## Step 5: Open Browser (30 sec)

Go to: **http://localhost:3000**

You should see WalletWatch! 🎉

---

## First Steps in the App

1. Click **"Set Budget"** → Enter 2000 → Click "Set Budget"
2. Click **"Add Expense"** → Enter 50, select "Food & Dining" → Click "Add Expense"
3. Click **"Dashboard"** → See your budget and charts!

---

## Troubleshooting

### MongoDB not starting?
- Make sure MongoDB is installed
- Or use MongoDB Atlas (cloud) - update MONGO_URI

### Port 5000 already in use?
- Change PORT in backend/.env to 5001
- Update VITE_API_URL in frontend/.env to http://localhost:5001

### API key error?
- Make sure both .env files have the SAME API key
- Restart both servers after changing .env

---

## Need More Help?

See **SETUP_GUIDE.md** for detailed instructions!

---

## Optional: SMS Alerts

To enable SMS alerts:
1. Sign up at https://www.twilio.com
2. Get your Account SID, Auth Token, and Phone Number
3. Add to backend/.env:
```env
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890
RECIPIENT_PHONE_NUMBER=+1234567890
```
4. Restart backend server

---

**That's it! You're ready to track your budget! 💰**
