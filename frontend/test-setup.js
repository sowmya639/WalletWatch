/**
 * Basic Setup Validation Script
 * Run this to verify your WalletWatch frontend is configured correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🔍 WalletWatch Frontend Setup Validation\n');
console.log('=' .repeat(50));

let hasErrors = false;

// Check Node.js version
const nodeVersion = process.version;
console.log(`\n✓ Node.js Version: ${nodeVersion}`);
if (parseInt(nodeVersion.slice(1)) < 16) {
  console.log('  ⚠️  Warning: Node.js 16+ recommended');
  hasErrors = true;
}

// Check .env file
console.log('\n📋 Environment Configuration:');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('  ✓ .env file exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('VITE_API_URL')) {
    console.log('  ✓ VITE_API_URL is set');
  } else {
    console.log('  ✗ VITE_API_URL is missing');
    hasErrors = true;
  }
  
  if (envContent.includes('VITE_API_KEY')) {
    console.log('  ✓ VITE_API_KEY is set');
  } else {
    console.log('  ✗ VITE_API_KEY is missing');
    hasErrors = true;
  }
} else {
  console.log('  ✗ .env file not found - Copy from .env.sample');
  hasErrors = true;
}

// Check if required files exist
console.log('\n📁 Required Files:');
const requiredFiles = [
  'src/App.jsx',
  'src/main.jsx',
  'src/index.css',
  'src/pages/Dashboard.jsx',
  'src/pages/SetBudget.jsx',
  'src/pages/AddExpense.jsx',
  'src/pages/AlertsLog.jsx',
  'src/components/Navigation.jsx',
  'src/components/Card.jsx',
  'src/components/ErrorBoundary.jsx',
  'src/config/api.js',
  'src/utils/dataAggregation.js',
  'index.html',
  'package.json',
  'vite.config.js',
  'tailwind.config.js'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file}: Missing`);
    hasErrors = true;
  }
});

// Check if node_modules exists
console.log('\n📦 Dependencies:');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('  ✓ node_modules directory exists');
  
  // Check key dependencies
  const keyDeps = ['react', 'react-dom', 'react-router-dom', 'axios', 'chart.js', 'vite'];
  keyDeps.forEach(dep => {
    const depPath = path.join(nodeModulesPath, dep);
    if (fs.existsSync(depPath)) {
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
  console.log('\n✅ Frontend setup looks good! You can start the dev server with: npm run dev\n');
  process.exit(0);
}
