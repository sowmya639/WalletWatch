# Upload WalletWatch to GitHub - Step by Step

## 📋 Prerequisites

- GitHub account (create at https://github.com/signup if needed)
- Git installed on your computer

---

## 🚀 Step-by-Step Instructions

### Step 1: Create GitHub Repository

1. Open your browser and go to: **https://github.com/new**

2. Fill in the details:
   - **Repository name**: `walletwatch`
   - **Description**: `Personal Budget & Expense Tracking Application - MERN Stack`
   - **Visibility**: Choose Public or Private
   - **DO NOT check**: "Add a README file" (we already have one)
   - **DO NOT check**: "Add .gitignore" (we already have one)
   - **DO NOT check**: "Choose a license"

3. Click **"Create repository"**

4. **Keep this page open** - you'll need the commands shown

---

### Step 2: Open Terminal in WalletWatch Folder

1. Open Command Prompt or PowerShell
2. Navigate to your WalletWatch folder:
   ```cmd
   cd C:\Users\uppal\Downloads\WalletWatch
   ```

---

### Step 3: Initialize Git and Upload

Copy and paste these commands one by one:

```cmd
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: WalletWatch - Budget tracking application"

# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/walletwatch.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Important**: Replace `YOUR_USERNAME` with your actual GitHub username!

Example:
```cmd
git remote add origin https://github.com/johnsmith/walletwatch.git
```

---

### Step 4: Verify Upload

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/walletwatch`
2. You should see all your files uploaded!
3. Check that `.env` files are NOT uploaded (they're in .gitignore)

---

## ✅ What Gets Uploaded

✅ All source code files
✅ README.md and documentation
✅ package.json files
✅ .gitignore file
✅ Configuration files

❌ node_modules/ (too large, not needed)
❌ .env files (contain secrets)
❌ dist/ and build/ folders

---

## 🔐 Security Check

Before uploading, verify these files are in `.gitignore`:

- ✅ `.env`
- ✅ `node_modules/`
- ✅ `dist/`
- ✅ `*.log`

These files contain secrets or are too large for GitHub.

---

## 🎯 Next Steps After Upload

Once uploaded to GitHub, you can:

1. **Deploy to Vercel** (Frontend)
   - Go to https://vercel.com
   - Import your GitHub repository
   - Deploy in 1 click!

2. **Deploy to Railway** (Backend)
   - Go to https://railway.app
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Share Your Code**
   - Share the GitHub URL with others
   - Add screenshots to README
   - Add live demo link

---

## 🆘 Troubleshooting

### Error: "git: command not found"

**Solution**: Install Git
- Download from: https://git-scm.com/download/win
- Install with default settings
- Restart terminal

### Error: "Permission denied"

**Solution**: Set up GitHub authentication
```cmd
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Error: "remote origin already exists"

**Solution**: Remove and re-add
```cmd
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/walletwatch.git
```

### Error: "failed to push"

**Solution**: Pull first, then push
```cmd
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 📝 Git Commands Reference

```cmd
git status              # Check what files changed
git add .               # Add all files
git commit -m "message" # Save changes with message
git push                # Upload to GitHub
git pull                # Download from GitHub
git log                 # See commit history
```

---

## 🎉 Success!

Once uploaded, your repository will be at:
```
https://github.com/YOUR_USERNAME/walletwatch
```

You can now:
- ✅ Share your code
- ✅ Deploy to hosting platforms
- ✅ Collaborate with others
- ✅ Track changes over time

---

**Need help? Check DEPLOYMENT_GUIDE.md for deployment instructions!**
