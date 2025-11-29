# WalletWatch - Personal Budget & Expense Tracking Application

A full-stack application for tracking expenses, managing budgets, and receiving SMS alerts when approaching spending limits.

## Features

- 📊 Track expenses with categories and descriptions
- 💰 Set monthly budgets and monitor spending
- 📱 SMS alerts via Twilio when reaching 80% of budget
- 📈 Visual analytics with charts (spending trends, category breakdown, budget comparison)
- 🎨 Modern glass-morphism UI design
- 📱 Fully responsive for mobile and desktop

## Tech Stack

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose
- Twilio for SMS notifications

**Frontend:**
- React 18
- Tailwind CSS
- Chart.js for data visualization
- Vite for build tooling

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Twilio account (for SMS alerts)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd walletwatch
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (copy from `.env.sample`):

```env
WALLETWATCH_API_KEY=your-secure-random-api-key
PORT=5000
MONGO_URI=mongodb://localhost:27017/walletwatch
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890
RECIPIENT_PHONE_NUMBER=+1234567890
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory (copy from `.env.sample`):

```env
VITE_API_URL=http://localhost:5000
VITE_API_KEY=your-secure-random-api-key
```

**Note:** The `VITE_API_KEY` must match the `WALLETWATCH_API_KEY` in the backend.

## Running the Application

### Start MongoDB

Make sure MongoDB is running locally:

```bash
mongod
```

Or use MongoDB Atlas connection string in your `.env` file.

### Start Backend Server

```bash
cd backend
npm run dev
```

The API will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Expenses
- `POST /api/expenses` - Add new expense
- `GET /api/expenses` - Get all expenses
- `DELETE /api/expenses/:id` - Delete expense

### Budget
- `POST /api/budget` - Set monthly budget
- `GET /api/budget` - Get current budget with remaining amount

### Alerts
- `POST /api/alerts/send` - Send SMS alert
- `GET /api/alerts/logs` - Get alert history

## Environment Variables

### Backend Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `WALLETWATCH_API_KEY` | Secure API key for authentication | Yes |
| `PORT` | Server port (default: 5000) | No |
| `MONGO_URI` | MongoDB connection string | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Yes (for SMS) |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Yes (for SMS) |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | Yes (for SMS) |
| `RECIPIENT_PHONE_NUMBER` | User's phone for alerts | Yes (for SMS) |

### Frontend Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_API_KEY` | API key (must match backend) | Yes |

## Testing

### Run Backend Tests

```bash
cd backend
npm test
```

### Run Frontend Tests

```bash
cd frontend
npm test
```

## Building for Production

### Build Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist` directory.

## Project Structure

```
walletwatch/
├── backend/
│   ├── config/          # Configuration files
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Route controllers
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   ├── __tests__/       # Test files
│   ├── server.js        # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── config/      # Configuration
│   │   ├── utils/       # Utility functions
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   ├── index.html
│   └── package.json
└── README.md
```

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network access if using MongoDB Atlas

### Twilio SMS Not Working

- Verify Twilio credentials in `.env`
- Check Twilio account balance
- Ensure phone numbers are in E.164 format (+1234567890)
- Check Twilio console for error logs

### API Authentication Errors

- Ensure `VITE_API_KEY` matches `WALLETWATCH_API_KEY`
- Check that API key is being sent in request headers
- Verify environment variables are loaded correctly

### Port Already in Use

If port 5000 or 3000 is already in use:

```bash
# Change PORT in backend/.env
PORT=5001

# Or kill the process using the port
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

## License

ISC

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
