# Implementation Plan

- [ ] 1. Initialize project structure and dependencies
  - Create backend directory with Express.js setup
  - Create frontend directory with React and Tailwind CSS
  - Install all required dependencies (Express, Mongoose, Twilio, React, Chart.js, Axios)
  - Set up .env.sample files with all required environment variables
  - Configure CORS and middleware
  - _Requirements: 10.1, 10.4_

- [ ] 2. Set up MongoDB schemas and models
  - Create Expense schema with validation (amount > 0, required fields)
  - Create Budget schema with month/year tracking
  - Create Alert schema for SMS log tracking
  - Add Mongoose timestamps and indexes
  - _Requirements: 1.1, 1.3, 1.4, 4.1, 4.2, 6.2_

- [ ]* 2.1 Write property test for expense creation
  - **Property 1: Expense creation returns complete object**
  - **Validates: Requirements 1.1, 1.2**

- [ ]* 2.2 Write property test for invalid expense rejection
  - **Property 2: Invalid expense rejection**
  - **Validates: Requirements 1.3**

- [ ] 3. Implement budget calculation service
  - Create BudgetCalculatorService with calculateRemaining function
  - Implement getCurrentMonthExpenses filtering logic
  - Implement checkThreshold function for 80% budget check
  - _Requirements: 1.5, 3.2, 4.3, 5.3_

- [ ]* 3.1 Write property test for budget calculation
  - **Property 6: Budget calculation correctness**
  - **Validates: Requirements 1.5, 3.2, 4.3, 5.3**

- [ ] 4. Implement Twilio alert service
  - Create AlertService with sendSMS function using Twilio SDK
  - Implement logAlert function to save alerts to database
  - Implement shouldSendAlert logic with threshold tracking
  - Add error handling for missing Twilio credentials
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 4.1 Write property test for alert triggering
  - **Property 9: Threshold alert trigger**
  - **Validates: Requirements 6.1, 6.4**

- [ ]* 4.2 Write property test for alert logging
  - **Property 10: Alert logging**
  - **Validates: Requirements 6.2**

- [ ]* 4.3 Write property test for single alert per threshold
  - **Property 11: Single alert per threshold crossing**
  - **Validates: Requirements 6.5**

- [ ] 5. Create expense API endpoints and controller
  - Implement POST /api/expenses endpoint with validation
  - Implement GET /api/expenses endpoint with date sorting
  - Implement DELETE /api/expenses/:id endpoint
  - Integrate budget recalculation on add/delete
  - Trigger alert check after expense creation
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 6.4_

- [ ]* 5.1 Write property test for expense retrieval ordering
  - **Property 3: Expense retrieval ordering**
  - **Validates: Requirements 2.1**

- [ ]* 5.2 Write property test for expense data completeness
  - **Property 4: Expense data completeness**
  - **Validates: Requirements 2.3**

- [ ]* 5.3 Write property test for expense deletion
  - **Property 5: Expense deletion confirmation**
  - **Validates: Requirements 3.1, 3.4**

- [ ] 6. Create budget API endpoints and controller
  - Implement POST /api/budget endpoint to set/update budget
  - Implement GET /api/budget endpoint with remaining calculation
  - Add validation for positive budget amounts
  - Handle no budget scenario with appropriate response
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4_

- [ ]* 6.1 Write property test for budget persistence
  - **Property 7: Budget update persistence**
  - **Validates: Requirements 4.1, 4.4**

- [ ]* 6.2 Write property test for budget information completeness
  - **Property 8: Budget information completeness**
  - **Validates: Requirements 5.1**

- [ ] 7. Create alerts API endpoints and controller
  - Implement POST /api/alerts/send endpoint for manual SMS trigger
  - Implement GET /api/alerts/logs endpoint with timestamp sorting
  - Return empty array when no alerts exist
  - _Requirements: 6.2, 7.1, 7.2, 7.3_

- [ ]* 7.1 Write property test for alert log ordering
  - **Property 12: Alert log ordering**
  - **Validates: Requirements 7.1**

- [ ]* 7.2 Write property test for alert log completeness
  - **Property 13: Alert log completeness**
  - **Validates: Requirements 7.3**

- [ ] 8. Implement API authentication middleware
  - Create authentication middleware to validate API key
  - Apply middleware to all API routes
  - Return 401 for missing or invalid API keys
  - Load API key from environment variables
  - _Requirements: 10.1, 10.2, 10.3_

- [ ]* 8.1 Write property test for unauthenticated request rejection
  - **Property 15: Unauthenticated request rejection**
  - **Validates: Requirements 10.2**

- [ ] 9. Checkpoint - Ensure all backend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Set up React application structure
  - Initialize React app with React Router
  - Configure Tailwind CSS with glass-morphism utilities
  - Create page components: Dashboard, SetBudget, AddExpense, AlertsLog
  - Create shared components: Navigation, Card
  - Set up Axios instance with API key authentication
  - _Requirements: 9.3, 11.1_

- [ ] 11. Implement navigation component
  - Create responsive navbar with links to all pages
  - Implement active page highlighting based on current route
  - Add mobile hamburger menu for small screens
  - Style with glass-morphism effects
  - _Requirements: 9.1, 9.2, 11.1, 11.2, 11.3_

- [ ]* 11.1 Write property test for SPA navigation
  - **Property 16: SPA navigation without reload**
  - **Validates: Requirements 11.2**

- [ ]* 11.2 Write property test for active navigation highlighting
  - **Property 17: Active navigation highlighting**
  - **Validates: Requirements 11.3**

- [ ] 12. Create Add Expense page
  - Build expense form with amount, category, description, date inputs
  - Implement client-side validation
  - Add category dropdown with predefined options
  - Connect to POST /api/expenses endpoint
  - Display success/error messages
  - Clear form after successful submission
  - _Requirements: 1.1, 1.3, 1.4_

- [ ] 13. Create Set Budget page
  - Build budget form with amount input
  - Display current budget if exists
  - Implement client-side validation for positive amounts
  - Connect to POST /api/budget endpoint
  - Display success/error messages
  - Show updated budget after submission
  - _Requirements: 4.1, 4.2, 4.4_

- [ ] 14. Implement data aggregation utilities
  - Create utility functions to aggregate expenses by month
  - Create utility functions to aggregate expenses by category
  - Ensure aggregation sums match individual expense totals
  - _Requirements: 8.5_

- [ ]* 14.1 Write property test for expense aggregation
  - **Property 14: Expense aggregation by category and month**
  - **Validates: Requirements 8.5**

- [ ] 15. Create Dashboard page with charts
  - Fetch budget and expenses data on page load
  - Display summary cards: total spent, remaining budget, budget status
  - Implement monthly spending trend line chart using Chart.js
  - Implement category-wise pie/doughnut chart
  - Implement budget vs actual bar chart
  - Handle empty data state with placeholder messages
  - Make charts responsive for mobile
  - _Requirements: 5.1, 8.1, 8.2, 8.3, 8.4, 8.5, 9.1, 9.2_

- [ ] 16. Create Alerts Log page
  - Fetch alert logs from GET /api/alerts/logs endpoint
  - Display alerts in table format with timestamp, message, status
  - Sort by timestamp descending (newest first)
  - Handle empty state with appropriate message
  - Make table responsive for mobile
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 17. Add loading states and error handling to frontend
  - Implement loading spinners for all API calls
  - Add error boundaries for React components
  - Display user-friendly error messages for API failures
  - Add retry logic for failed requests
  - _Requirements: 9.4_

- [ ] 18. Style application with glass-morphism and responsive design
  - Apply glass-morphism effects to all card components
  - Ensure all pages are mobile-responsive
  - Test on various screen sizes
  - Add smooth transitions and animations
  - Maintain consistent styling across all pages
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 19. Create comprehensive README documentation
  - Document prerequisites and installation steps
  - Provide environment variable setup instructions
  - Include database setup guide
  - Add instructions for running backend and frontend
  - Document API endpoints with examples
  - Add troubleshooting section
  - _Requirements: 10.4_

- [ ] 20. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
