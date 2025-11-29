# Design Document

## Overview

WalletWatch is a full-stack personal budget and expense tracking application built with a modern MERN stack architecture. The system consists of a React frontend with Tailwind CSS for styling, an Express.js backend API, and MongoDB for data persistence. The application integrates with Twilio for SMS notifications and provides real-time budget tracking with visual analytics.

The architecture follows a clean separation of concerns with RESTful API design, component-based UI, and schema-driven data modeling. The system is designed to be mobile-responsive and provides immediate feedback on budget status through automated alerts.

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  React Application (Tailwind CSS)                     │  │
│  │  - Dashboard Page (Charts & Summary)                  │  │
│  │  - Set Budget Page                                    │  │
│  │  - Add Expense Page                                   │  │
│  │  - Alerts Log Page                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend (Express.js)                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Routes                                           │  │
│  │  - /api/expenses                                      │  │
│  │  - /api/budget                                        │  │
│  │  - /api/alerts                                        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers                                          │  │
│  │  - Expense Controller                                 │  │
│  │  - Budget Controller                                  │  │
│  │  - Alert Controller                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Services                                             │  │
│  │  - Budget Calculator Service                          │  │
│  │  - Alert Service (Twilio Integration)                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB Database                        │
│  - expenses collection                                       │
│  - budgets collection                                        │
│  - alerts collection                                         │
└─────────────────────────────────────────────────────────────┘
                            
                            │
                            │ External API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Twilio SMS Service                      │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- React 18+ for UI components
- React Router for navigation
- Tailwind CSS for styling with glass-morphism effects
- Chart.js or Recharts for data visualization
- Axios for API communication

**Backend:**
- Node.js runtime
- Express.js web framework
- Mongoose ODM for MongoDB
- Twilio SDK for SMS functionality
- dotenv for environment configuration
- cors for cross-origin requests

**Database:**
- MongoDB for document storage

**External Services:**
- Twilio for SMS alerts

## Components and Interfaces

### Backend Components

#### API Routes

**Expenses Routes (`/api/expenses`)**
- `POST /api/expenses` - Create new expense
- `GET /api/expenses` - Retrieve all expenses
- `DELETE /api/expenses/:id` - Delete expense by ID

**Budget Routes (`/api/budget`)**
- `POST /api/budget` - Set or update monthly budget
- `GET /api/budget` - Get current budget with remaining amount

**Alerts Routes (`/api/alerts`)**
- `POST /api/alerts/send` - Manually trigger SMS alert
- `GET /api/alerts/logs` - Retrieve alert history

#### Controllers

**ExpenseController**
```javascript
{
  createExpense(req, res)    // Validates and creates expense, triggers budget check
  getAllExpenses(req, res)   // Retrieves all expenses sorted by date
  deleteExpense(req, res)    // Deletes expense and recalculates budget
}
```

**BudgetController**
```javascript
{
  setBudget(req, res)        // Sets or updates monthly budget
  getBudget(req, res)        // Returns budget with calculated remaining amount
}
```

**AlertController**
```javascript
{
  sendAlert(req, res)        // Sends SMS via Twilio
  getAlertLogs(req, res)     // Retrieves alert history
}
```

#### Services

**BudgetCalculatorService**
```javascript
{
  calculateRemaining(budget, expenses)  // Calculates remaining budget
  checkThreshold(budget, totalSpent)    // Checks if 80% threshold crossed
  getCurrentMonthExpenses(expenses)     // Filters expenses for current month
}
```

**AlertService**
```javascript
{
  sendSMS(phoneNumber, message)         // Sends SMS via Twilio
  logAlert(message, status, recipient)  // Logs alert to database
  shouldSendAlert(budget, expenses)     // Determines if alert needed
}
```

### Frontend Components

#### Pages

**Dashboard Page**
- Monthly spending trend chart
- Category-wise expense breakdown chart
- Budget vs actual comparison chart
- Summary cards (total spent, remaining budget, budget status)

**Set Budget Page**
- Budget input form
- Current budget display
- Budget update confirmation

**Add Expense Page**
- Expense form (amount, category, description, date)
- Category selector
- Form validation
- Success/error feedback

**Alerts Log Page**
- Alert history table
- Alert details (timestamp, message, status)
- Pagination or infinite scroll

#### Shared Components

**Navigation**
- Responsive navbar with links to all pages
- Active page highlighting
- Mobile hamburger menu

**Card Component**
- Glass-morphism styled container
- Reusable for all content sections

**Chart Components**
- Line chart for spending trends
- Pie/Doughnut chart for category breakdown
- Bar chart for budget comparison

## Data Models

### Expense Schema

```javascript
{
  _id: ObjectId,              // Auto-generated MongoDB ID
  amount: Number,             // Required, positive number
  category: String,           // Required (e.g., "Food", "Transport", "Entertainment")
  description: String,        // Optional text description
  date: Date,                 // Required, defaults to current date
  createdAt: Date,           // Auto-generated timestamp
  updatedAt: Date            // Auto-generated timestamp
}
```

**Validation Rules:**
- amount: Required, must be positive (> 0)
- category: Required, non-empty string
- date: Required, valid date object

### Budget Schema

```javascript
{
  _id: ObjectId,              // Auto-generated MongoDB ID
  amount: Number,             // Required, positive number
  month: Number,              // Month (1-12)
  year: Number,               // Year (e.g., 2025)
  createdAt: Date,           // Auto-generated timestamp
  updatedAt: Date            // Auto-generated timestamp
}
```

**Validation Rules:**
- amount: Required, must be positive (> 0)
- month: Required, integer between 1-12
- year: Required, valid year

**Note:** For simplicity, we'll maintain one active budget per month. When setting a budget, we'll update or create for the current month/year.

### Alert Schema

```javascript
{
  _id: ObjectId,              // Auto-generated MongoDB ID
  message: String,            // Alert message content
  recipient: String,          // Phone number (optional, from env)
  status: String,             // "sent", "failed", "pending"
  timestamp: Date,            // When alert was triggered
  budgetAmount: Number,       // Budget at time of alert
  spentAmount: Number,        // Amount spent at time of alert
  createdAt: Date            // Auto-generated timestamp
}
```

### API Response Formats

**Success Response:**
```javascript
{
  success: true,
  data: { /* response data */ },
  message: "Operation successful"
}
```

**Error Response:**
```javascript
{
  success: false,
  error: "Error message",
  details: { /* optional error details */ }
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Expense Management Properties

**Property 1: Expense creation returns complete object**
*For any* valid expense with amount, category, description, and date, creating the expense should return an object containing all input fields plus a unique identifier.
**Validates: Requirements 1.1, 1.2**

**Property 2: Invalid expense rejection**
*For any* expense submission with missing required fields (amount, category, or date), the system should reject the request and return a validation error.
**Validates: Requirements 1.3**

**Property 3: Expense retrieval ordering**
*For any* set of expenses in the database, retrieving all expenses should return them sorted by date in descending order (newest first).
**Validates: Requirements 2.1**

**Property 4: Expense data completeness**
*For any* expense retrieved from the database, the returned object should include all fields: id, amount, category, description, and date.
**Validates: Requirements 2.3**

**Property 5: Expense deletion confirmation**
*For any* existing expense, deleting it by ID should remove it from the database and return a confirmation message.
**Validates: Requirements 3.1, 3.4**

### Budget Management Properties

**Property 6: Budget calculation correctness**
*For any* monthly budget and set of expenses, the remaining budget should always equal the budget amount minus the sum of current month expenses.
**Validates: Requirements 1.5, 3.2, 4.3, 5.3**

**Property 7: Budget update persistence**
*For any* valid budget amount, setting a budget should store or update the value in the database, and retrieving the budget should return the most recently set value.
**Validates: Requirements 4.1, 4.4**

**Property 8: Budget information completeness**
*For any* budget retrieval request, the response should include monthly budget amount, total current month expenses, and calculated remaining budget.
**Validates: Requirements 5.1**

### Alert System Properties

**Property 9: Threshold alert trigger**
*For any* budget and expense combination where total spending reaches or exceeds 80% of the budget, the system should trigger an SMS alert.
**Validates: Requirements 6.1, 6.4**

**Property 10: Alert logging**
*For any* SMS alert sent, the system should create a log entry containing timestamp, message content, delivery status, budget amount, and spent amount.
**Validates: Requirements 6.2**

**Property 11: Single alert per threshold crossing**
*For any* budget period, once the 80% threshold is crossed and an alert is sent, subsequent expenses should not trigger additional alerts until the budget is reset.
**Validates: Requirements 6.5**

**Property 12: Alert log ordering**
*For any* set of alert logs in the database, retrieving all logs should return them sorted by timestamp in descending order (newest first).
**Validates: Requirements 7.1**

**Property 13: Alert log completeness**
*For any* alert log retrieved from the database, the returned object should include timestamp, message content, delivery status, and recipient information.
**Validates: Requirements 7.3**

### Data Aggregation Properties

**Property 14: Expense aggregation by category and month**
*For any* set of expenses, aggregating by month and category should produce grouped data where the sum of amounts in each group equals the sum of individual expense amounts in that group.
**Validates: Requirements 8.5**

### Authentication Properties

**Property 15: Unauthenticated request rejection**
*For any* API endpoint, requests without valid authentication credentials should be rejected with an unauthorized error response.
**Validates: Requirements 10.2**

### Navigation Properties

**Property 16: SPA navigation without reload**
*For any* navigation link click, the system should load the corresponding page content without triggering a full browser page reload.
**Validates: Requirements 11.2**

**Property 17: Active navigation highlighting**
*For any* page in the application, the navigation menu should highlight the corresponding navigation item as active.
**Validates: Requirements 11.3**

## Error Handling

### Validation Errors

**Input Validation:**
- All API endpoints must validate input data before processing
- Validation errors should return HTTP 400 with descriptive error messages
- Error responses should specify which fields failed validation

**Common Validation Rules:**
- Amounts must be positive numbers (> 0)
- Required fields must be present and non-empty
- Dates must be valid date objects
- Categories must be non-empty strings

### Database Errors

**Connection Errors:**
- MongoDB connection failures should be caught and logged
- API should return HTTP 503 (Service Unavailable) for database connection issues
- Implement connection retry logic with exponential backoff

**Query Errors:**
- Invalid ObjectId formats should return HTTP 400
- Document not found errors should return HTTP 404
- Duplicate key errors should return HTTP 409 (Conflict)

### External Service Errors

**Twilio Integration:**
- SMS sending failures should be logged but not block expense operations
- Alert logs should record "failed" status when SMS cannot be sent
- Missing Twilio credentials should log warnings but allow app to function
- Implement timeout handling for Twilio API calls (5 second timeout)

### Error Response Format

All error responses should follow this structure:
```javascript
{
  success: false,
  error: "Human-readable error message",
  code: "ERROR_CODE",
  details: {
    field: "fieldName",  // For validation errors
    reason: "Specific reason"
  }
}
```

### Error Logging

- All errors should be logged with timestamp, error type, and stack trace
- Use different log levels: ERROR for failures, WARN for recoverable issues
- Log sensitive data (API keys, phone numbers) should be redacted

## Testing Strategy

### Unit Testing

WalletWatch will use **Jest** as the testing framework for both backend and frontend unit tests.

**Backend Unit Tests:**
- Controller functions: Test request/response handling and error cases
- Service functions: Test business logic in isolation
- Model validation: Test Mongoose schema validation rules
- Utility functions: Test calculation and formatting functions

**Frontend Unit Tests:**
- Component rendering: Test that components render with correct props
- Form validation: Test client-side validation logic
- API integration: Test API calls with mocked responses (using axios-mock-adapter)
- Utility functions: Test data formatting and calculation helpers

**Key Unit Test Examples:**
- Test that expense creation with valid data returns success
- Test that budget calculation handles zero expenses correctly
- Test that alert service handles missing Twilio credentials gracefully
- Test that chart data aggregation handles empty expense arrays
- Test that form components display validation errors correctly

### Property-Based Testing

WalletWatch will use **fast-check** for property-based testing in JavaScript/TypeScript.

**Configuration:**
- Each property-based test must run a minimum of 100 iterations
- Tests should use appropriate generators for domain-specific data types
- Each test must be tagged with a comment referencing the design document property

**Tag Format:**
```javascript
// Feature: wallet-watch, Property 1: Expense creation returns complete object
```

**Property Test Implementation Requirements:**
- Each correctness property listed in this document must be implemented as a single property-based test
- Tests should generate random valid inputs within the domain constraints
- Tests should verify the property holds across all generated inputs
- Failed tests should shrink to minimal failing examples

**Key Property Tests:**
- Property 1: Generate random valid expenses, verify complete object returned
- Property 6: Generate random budgets and expense sets, verify calculation correctness
- Property 9: Generate random expense sequences, verify alert triggers at 80% threshold
- Property 11: Generate multiple expenses after threshold, verify single alert
- Property 14: Generate random expense sets, verify aggregation sums match totals

**Generators Needed:**
- Expense generator: Random amounts (1-10000), categories, descriptions, dates
- Budget generator: Random amounts (100-100000)
- Date generator: Random dates within current month and past months
- Category generator: Random selection from predefined categories

### Integration Testing

**API Integration Tests:**
- Test complete request/response cycles for all endpoints
- Test database operations with test database instance
- Test error handling across the full stack
- Use supertest for HTTP request testing

**End-to-End Testing:**
- Test complete user workflows (add expense → check budget → receive alert)
- Test navigation between pages
- Test chart rendering with real data
- Consider using Playwright or Cypress for E2E tests (optional)

### Test Organization

```
backend/
  __tests__/
    unit/
      controllers/
      services/
      models/
    property/
      expense.property.test.js
      budget.property.test.js
      alert.property.test.js
    integration/
      api.integration.test.js

frontend/
  src/
    __tests__/
      unit/
        components/
        utils/
      property/
        calculations.property.test.js
```

### Testing Best Practices

- Write tests alongside implementation (test-driven development encouraged)
- Mock external dependencies (Twilio, MongoDB) in unit tests
- Use test database for integration tests
- Clean up test data after each test run
- Aim for high code coverage (>80%) but focus on critical paths
- Property tests should complement, not replace, unit tests
- Both unit and property tests are essential for comprehensive coverage

## Security Considerations

### API Security

**Authentication:**
- Implement API key authentication for all endpoints
- Store API keys in environment variables, never in code
- Validate API key on every request using middleware
- Use HTTPS in production to encrypt API key transmission

**Input Sanitization:**
- Sanitize all user inputs to prevent injection attacks
- Use Mongoose schema validation as first line of defense
- Implement additional validation in controllers
- Escape special characters in descriptions and text fields

**Rate Limiting:**
- Implement rate limiting to prevent abuse
- Limit SMS alerts to prevent excessive Twilio charges
- Consider per-user rate limits for API endpoints

### Data Security

**Environment Variables:**
- Never commit .env files to version control
- Provide .env.sample with placeholder values
- Document all required environment variables
- Use strong, randomly generated API keys

**Database Security:**
- Use MongoDB connection string with authentication
- Implement least-privilege access for database user
- Enable MongoDB encryption at rest in production
- Regular database backups

### Twilio Security

**Credential Management:**
- Store Twilio credentials in environment variables
- Rotate credentials periodically
- Monitor Twilio usage for anomalies
- Implement spending limits in Twilio dashboard

## Performance Considerations

### Database Optimization

**Indexing:**
- Create index on expense date field for faster sorting
- Create compound index on (month, year) for budget queries
- Create index on alert timestamp for log retrieval

**Query Optimization:**
- Use projection to limit returned fields when not all data needed
- Implement pagination for large expense lists
- Cache budget calculations for current month

### Frontend Optimization

**Code Splitting:**
- Use React lazy loading for route-based code splitting
- Load chart libraries only on dashboard page

**Data Fetching:**
- Implement loading states for all API calls
- Cache API responses where appropriate
- Use optimistic updates for better UX

**Chart Performance:**
- Limit chart data points for large datasets
- Use chart library's built-in optimization features
- Consider data aggregation for historical data

## Deployment Considerations

### Environment Setup

**Required Environment Variables:**
```
# API Configuration
WALLETWATCH_API_KEY=<secure-random-key>
PORT=5000

# Database
MONGO_URI=mongodb://localhost:27017/walletwatch

# Twilio Configuration
TWILIO_ACCOUNT_SID=<twilio-sid>
TWILIO_AUTH_TOKEN=<twilio-token>
TWILIO_PHONE_NUMBER=<twilio-phone>
RECIPIENT_PHONE_NUMBER=<user-phone>

# Frontend
REACT_APP_API_URL=http://localhost:5000
REACT_APP_API_KEY=<same-as-backend-key>
```

### Build Process

**Backend:**
- No build step required for Node.js
- Ensure all dependencies in package.json
- Use npm start or node server.js

**Frontend:**
- Run `npm run build` to create production build
- Serve build folder with static file server or integrate with backend
- Configure proxy for API calls in development

### Deployment Options

**Development:**
- Run backend and frontend separately
- Use nodemon for backend hot reload
- Use React development server for frontend

**Production:**
- Deploy backend to Node.js hosting (Heroku, Railway, DigitalOcean)
- Deploy frontend to static hosting (Vercel, Netlify) or serve from backend
- Use MongoDB Atlas for managed database
- Configure CORS for cross-origin requests if frontend/backend on different domains

## Documentation Requirements

### API Documentation

Create API documentation including:
- Endpoint descriptions
- Request/response formats
- Authentication requirements
- Error codes and messages
- Example requests and responses

### Setup Instructions

README.md should include:
- Prerequisites (Node.js version, MongoDB)
- Installation steps
- Environment variable configuration
- Database setup
- Running the application
- Running tests
- Troubleshooting common issues

### Code Documentation

- JSDoc comments for all functions
- Inline comments for complex logic
- Component prop documentation
- Schema field descriptions
