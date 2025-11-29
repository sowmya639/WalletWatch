# WalletWatch API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication

All API endpoints require authentication via API key in the request headers.

**Header:**
```
X-API-Key: your-api-key-here
```

or

```
Authorization: your-api-key-here
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details"
}
```

---

## Expenses API

### Create Expense
Create a new expense entry.

**Endpoint:** `POST /api/expenses`

**Request Body:**
```json
{
  "amount": 50.00,
  "category": "Food & Dining",
  "description": "Lunch at restaurant",
  "date": "2024-01-15"
}
```

**Required Fields:**
- `amount` (number, > 0)
- `category` (string, non-empty)

**Optional Fields:**
- `description` (string)
- `date` (ISO date string, defaults to current date)

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "amount": 50.00,
    "category": "Food & Dining",
    "description": "Lunch at restaurant",
    "date": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-15T12:00:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  },
  "message": "Expense created successfully"
}
```

**Error Responses:**
- `400` - Validation error (missing fields, invalid amount)
- `401` - Unauthorized (invalid API key)
- `500` - Server error

---

### Get All Expenses
Retrieve all expenses sorted by date (newest first).

**Endpoint:** `GET /api/expenses`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "amount": 50.00,
      "category": "Food & Dining",
      "description": "Lunch at restaurant",
      "date": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-15T12:00:00.000Z",
      "updatedAt": "2024-01-15T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Server error

---

### Delete Expense
Delete an expense by ID.

**Endpoint:** `DELETE /api/expenses/:id`

**URL Parameters:**
- `id` - MongoDB ObjectId of the expense

**Success Response (200):**
```json
{
  "success": true,
  "message": "Expense deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "amount": 50.00,
    "category": "Food & Dining",
    ...
  }
}
```

**Error Responses:**
- `400` - Invalid expense ID format
- `404` - Expense not found
- `401` - Unauthorized
- `500` - Server error

---

## Budget API

### Set Budget
Create or update the monthly budget for the current month.

**Endpoint:** `POST /api/budget`

**Request Body:**
```json
{
  "amount": 2000.00
}
```

**Required Fields:**
- `amount` (number, > 0)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "budget": {
      "_id": "507f1f77bcf86cd799439012",
      "amount": 2000.00,
      "month": 1,
      "year": 2024,
      "alertSent": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "budgetAmount": 2000.00,
    "totalSpent": 150.00,
    "remaining": 1850.00,
    "percentageUsed": 7.5
  },
  "message": "Budget created successfully"
}
```

**Error Responses:**
- `400` - Validation error (missing amount, invalid amount)
- `401` - Unauthorized
- `500` - Server error

---

### Get Budget
Retrieve the current month's budget with spending calculations.

**Endpoint:** `GET /api/budget`

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "budget": {
      "_id": "507f1f77bcf86cd799439012",
      "amount": 2000.00,
      "month": 1,
      "year": 2024,
      "alertSent": false
    },
    "budgetAmount": 2000.00,
    "totalSpent": 150.00,
    "remaining": 1850.00,
    "percentageUsed": 7.5,
    "month": 1,
    "year": 2024
  }
}
```

**No Budget Response (200):**
```json
{
  "success": true,
  "data": {
    "budgetAmount": 0,
    "totalSpent": 0,
    "remaining": 0,
    "percentageUsed": 0,
    "message": "No budget set for current month"
  }
}
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Server error

---

## Alerts API

### Send Alert
Manually send an SMS alert.

**Endpoint:** `POST /api/alerts/send`

**Request Body:**
```json
{
  "phoneNumber": "+1234567890",
  "message": "Test alert message",
  "budgetAmount": 2000.00,
  "spentAmount": 1600.00
}
```

**Required Fields:**
- `message` (string)

**Optional Fields:**
- `phoneNumber` (string, defaults to RECIPIENT_PHONE_NUMBER env var)
- `budgetAmount` (number)
- `spentAmount` (number)

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "alert": {
      "_id": "507f1f77bcf86cd799439013",
      "message": "Test alert message",
      "recipient": "+1234567890",
      "status": "sent",
      "timestamp": "2024-01-15T12:00:00.000Z",
      "budgetAmount": 2000.00,
      "spentAmount": 1600.00
    },
    "smsResult": {
      "success": true,
      "status": "sent",
      "sid": "SM1234567890abcdef"
    }
  },
  "message": "Alert sent successfully"
}
```

**Error Responses:**
- `400` - Validation error (missing message or phone number)
- `401` - Unauthorized
- `500` - Server error

---

### Get Alert Logs
Retrieve all alert logs sorted by timestamp (newest first).

**Endpoint:** `GET /api/alerts/logs`

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "message": "🚨 WalletWatch Alert: You've used 80% of your monthly budget...",
      "recipient": "+1234567890",
      "status": "sent",
      "timestamp": "2024-01-15T12:00:00.000Z",
      "budgetAmount": 2000.00,
      "spentAmount": 1600.00,
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

**Error Responses:**
- `401` - Unauthorized
- `500` - Server error

---

## Alert Triggering

Alerts are automatically triggered when:
1. An expense is added
2. Total spending reaches or exceeds 80% of the monthly budget
3. No alert has been sent for the current budget period

The alert message format:
```
🚨 WalletWatch Alert: You've used X% of your monthly budget. Spent: $X.XX, Remaining: $X.XX
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing API key) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently, there are no rate limits implemented. However, it's recommended to:
- Limit SMS alerts to prevent excessive Twilio charges
- Implement reasonable request rates for API endpoints

---

## Examples

### cURL Examples

**Create Expense:**
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "amount": 50.00,
    "category": "Food & Dining",
    "description": "Lunch",
    "date": "2024-01-15"
  }'
```

**Get Budget:**
```bash
curl -X GET http://localhost:5000/api/budget \
  -H "X-API-Key: your-api-key"
```

**Set Budget:**
```bash
curl -X POST http://localhost:5000/api/budget \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "amount": 2000.00
  }'
```

---

## Notes

- All monetary values are in USD
- Dates are in ISO 8601 format
- MongoDB ObjectIds are 24-character hexadecimal strings
- Twilio credentials must be configured for SMS functionality
- If Twilio is not configured, alerts will be logged but not sent
