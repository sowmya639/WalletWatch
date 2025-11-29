@echo off
echo ========================================
echo Starting MongoDB for WalletWatch
echo ========================================
echo.

REM Check if MongoDB service exists
sc query MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo MongoDB service found!
    echo Starting MongoDB service...
    net start MongoDB
    if %errorlevel% equ 0 (
        echo.
        echo ✅ MongoDB is running!
        echo.
        echo You can now use WalletWatch at:
        echo http://localhost:3000
        echo.
    ) else (
        echo.
        echo ⚠️  MongoDB service exists but couldn't start.
        echo Try running this script as Administrator.
        echo.
    )
) else (
    echo.
    echo ❌ MongoDB service not found.
    echo.
    echo Please install MongoDB first:
    echo 1. Download from: https://www.mongodb.com/try/download/community
    echo 2. Run the installer
    echo 3. Choose "Complete" installation
    echo 4. Install as a Windows Service
    echo 5. Run this script again
    echo.
)

pause
