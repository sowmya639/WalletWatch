/**
 * Basic Setup Validation Script
 * Run this to verify your WalletWatch backend is configured correctly
 */

require('dotenv').config();

console.log('\n🔍 WalletWatch Backend Setup Validation\n');
console.log('=' .repeat(50));

let hasErrors = false;

// Check Node.js version
const nodeVersion = process.version;
console.log(`\n✓ Node.js Version: ${nodeVersion}`);
if (parseInt(nodeVersion.slice(1)) < 16) {
  console.log('  ⚠️  Warning: Node.js 16+ recommended');
  hasErrors = true;
}

// Check required environment variables
console.log('\n📋 Environment Variables:');

const requiredVars = [
  'WALLETWATCH_API_KEY',
  'MONGO_URI'
];

const optionalVars = [
  'PORT',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER',
  'RECIPIENT_PHONE_NUMBER'
];

requiredVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`  ✓ ${varName}: Set`);
  } else {
    console.log(`  ✗ ${varName}: Missing (REQUIRED)`);
    hasErrors = true;
  }
});

console.log('\n📋 Optional Variables (for SMS):');
optionalVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`  ✓ ${varName}: Set`);
  } else {
    console.log(`  ⚠️  ${varName}: Not set (SMS alerts will not work)`);
  }
});

// Check if required files exist
console.log('\n📁 Required Files:');
const fs = require('fs');
const requiredFiles = [
  'server.js',
  'package.json',
  'models/Expense.js',
  'models/Budget.js',
  'models/Alert.js',
  'controllers/expenseController.js',
  'controllers/budgetController.js',
  'controllers/alertController.js',
  'services/budgetCalculator.js',
  'services/alertService.js',
  'middleware/auth.js',
  'routes/expenses.js',
  'routes/budget.js',
  'routes/alerts.js'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file}: Missing`);
    hasErrors = true;
  }
});

// Check if node_modules exists
console.log('\n📦 Dependencies:');
if (fs.existsSync('node_modules')) {
  console.log('  ✓ node_modules directory exists');
  
  // Check key dependencies
  const keyDeps = ['express', 'mongoose', 'dotenv', 'cors', 'twilio'];
  keyDeps.forEach(dep => {
    if (fs.existsSync(`node_modules/${dep}`)) {
      console.log(`  ✓ ${dep} installed`);
    } else {
      console.log(`  ✗ ${dep} not installed`);
      hasErrors = true;
    }
  });
} else {
  console.log('  ✗ node_modules not found - Run: npm install');
  hasErrors = true;
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('\n❌ Setup has issues. Please fix the errors above.\n');
  process.exit(1);
} else {
  console.log('\n✅ Backend setup looks good! You can start the server with: npm run dev\n');
  process.exit(0);
}
