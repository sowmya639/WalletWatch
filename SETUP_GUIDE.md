# WalletWatch - Complete Setup Guide

Follow these steps to get WalletWatch up and running on your Windows machine.

---

## Prerequisites

Before starting, ensure you have:
- Node.js (v16 or higher) - [Download here](https://nodejs.org/)
- MongoDB - [Download here](https://www.mongodb.com/try/download/community)
- Twilio Account (optional, for SMS alerts) - [Sign up here](https://www.twilio.com/try-twilio)

---

## Step 1: Install Backend Dependencies

Open Command Prompt or PowerShell and navigate to the backend directory:

```cmd
cd backend
npm install
```

This will install:
- express
- mongoose
- dotenv
- cors
- twilio
- nodemon (dev dependency)
- jest (dev dependency)
- fast-check (dev dependency)

---

## Step 2: Install Frontend Dependencies

Open a new terminal and navigate to the frontend directory:

```cmd
cd frontend
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- axios
- chart.js
- react-chartjs-2
- vite
- tailwindcss

---

## Step 3: Configure Backend Environment Variables

1. Navigate to the backend directory:
```cmd
cd backend
```

2. Copy the sample environment file:
```cmd
copy .env.sample .env
```

3. Open `.env` file in a text editor and update the values:

```env
# Generate a secure random API key (use any random string generator)
WALLETWATCH_API_KEY=your-secure-random-key-here-abc123xyz789

PORT=5000

# MongoDB connection (use local or MongoDB Atlas)
MONGO_URI=mongodb://localhost:27017/walletwatch

# Twilio Configuration (get these from your Twilio dashboard)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
RECIPIENT_PHONE_NUMBER=+1234567890

NODE_ENV=development
```

**To generate a secure API key:**
```cmd
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 4: Configure Frontend Environment Variables

1. Navigate to the frontend directory:
```cmd
cd frontend
```

2. Copy the sample environment file:
```cmd
copy .env.sample .env
```

3. Open `.env` file and update:

```env
VITE_API_URL=http://localhost:5000
# Use the SAME API key as backend
VITE_API_KEY=your-secure-random-key-here-abc123xyz789
```

**Important:** The `VITE_API_KEY` must match the `WALLETWATCH_API_KEY` from backend!

---

## Step 5: Start MongoDB

### Option A: Local MongoDB

Open a new terminal and start MongoDB:

```cmd
mongod
```

Keep this terminal running.

### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGO_URI` in backend `.env` file:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/walletwatch?retryWrites=true&w=majority
```

---

## Step 6: Start Backend Server

Open a terminal in the backend directory:

```cmd
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 WalletWatch API server running on port 5000
```

Keep this terminal running.

---

## Step 7: Start Frontend Development Server

Open a new terminal in the frontend directory:

```cmd
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Keep this terminal running.

---

## Step 8: Access the Application

Open your web browser and go to:
```
http://localhost:3000
```

You should see the WalletWatch application! 🎉

---

## Quick Start Usage

### 1. Set Your Monthly Budget
- Click "Set Budget" in the navigation
- Enter your monthly budget amount (e.g., 2000)
- Click "Set Budget"

### 2. Add Your First Expense
- Click "Add Expense" in the navigation
- Fill in:
  - Amount: 50
  - Category: Food & Dining
  - Description: Lunch
  - Date: (today's date)
- Click "Add Expense"

### 3. View Dashboard
- Click "Dashboard" to see:
  - Budget summary cards
  - Monthly spending trend chart
  - Category breakdown pie chart
  - Budget vs actual bar chart

### 4. Check Alerts
- Click "Alerts Log" to view SMS alert history
- Alerts are automatically sent when you reach 80% of your budget

---

## Testing the Application

### Test Backend API

Test the health endpoint:
```cmd
curl http://localhost:5000/health
```

Test with API key:
```cmd
curl -X GET http://localhost:5000/api/budget -H "X-API-Key: your-api-key-here"
```

### Run Backend Tests

```cmd
cd backend
npm test
```

### Run Frontend Tests

```cmd
cd frontend
npm test
```

---

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoDB connection error`

**Solution:**
1. Make sure MongoDB is running: `mongod`
2. Check if port 27017 is available
3. Verify `MONGO_URI` in `.env` file

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
1. Change port in backend `.env`:
```env
PORT=5001
```
2. Update frontend `.env`:
```env
VITE_API_URL=http://localhost:5001
```

### API Authentication Error

**Error:** `401 Unauthorized`

**Solution:**
1. Verify API keys match in both `.env` files
2. Make sure `.env` files are in the correct directories
3. Restart both servers after changing `.env` files

### Twilio SMS Not Working

**Error:** SMS alerts not being sent

**Solution:**
1. Verify Twilio credentials in backend `.env`
2. Check Twilio account balance
3. Ensure phone numbers are in E.164 format: `+1234567890`
4. Check Twilio console for error logs
5. Note: App will work without Twilio, alerts will just be logged

### Frontend Not Loading

**Error:** Blank page or errors in browser console

**Solution:**
1. Check browser console for errors (F12)
2. Verify backend is running on port 5000
3. Check API key is set in frontend `.env`
4. Clear browser cache and reload

---

## Stopping the Application

To stop the servers:

1. In each terminal window, press: `Ctrl + C`
2. To stop MongoDB: `Ctrl + C` in the MongoDB terminal

---

## Production Deployment

### Build Frontend for Production

```cmd
cd frontend
npm run build
```

The production build will be in `frontend/dist/`

### Run Backend in Production

```cmd
cd backend
npm start
```

---

## Useful Commands

### Backend Commands
```cmd
npm start          # Start server (production)
npm run dev        # Start server with nodemon (development)
npm test           # Run tests
```

### Frontend Commands
```cmd
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm test           # Run tests
```

---

## Environment Variables Reference

### Backend (.env)
| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| WALLETWATCH_API_KEY | API authentication key | Yes | abc123xyz789 |
| PORT | Server port | No | 5000 |
| MONGO_URI | MongoDB connection string | Yes | mongodb://localhost:27017/walletwatch |
| TWILIO_ACCOUNT_SID | Twilio account SID | For SMS | ACxxxxx |
| TWILIO_AUTH_TOKEN | Twilio auth token | For SMS | xxxxx |
| TWILIO_PHONE_NUMBER | Twilio phone number | For SMS | +1234567890 |
| RECIPIENT_PHONE_NUMBER | Your phone number | For SMS | +1234567890 |
| NODE_ENV | Environment | No | development |

### Frontend (.env)
| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| VITE_API_URL | Backend API URL | Yes | http://localhost:5000 |
| VITE_API_KEY | API key (must match backend) | Yes | abc123xyz789 |

---

## Next Steps

1. ✅ Set up your monthly budget
2. ✅ Add some expenses
3. ✅ View your spending analytics on the dashboard
4. ✅ Monitor alerts when you reach 80% of budget
5. ✅ Customize categories for your needs
6. ✅ Track your financial goals!

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API_DOCUMENTATION.md for API details
3. Check browser console for frontend errors
4. Check terminal output for backend errors

---

## Features Overview

✅ **Expense Tracking** - Add, view, and delete expenses with categories
✅ **Budget Management** - Set monthly budgets and track spending
✅ **SMS Alerts** - Get notified at 80% budget threshold via Twilio
✅ **Visual Analytics** - Charts showing spending trends and breakdowns
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Real-time Updates** - Instant budget calculations
✅ **Secure API** - API key authentication for all endpoints

Enjoy using WalletWatch! 💰📊
