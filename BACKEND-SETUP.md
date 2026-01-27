# Backend Setup & Deployment Guide

Complete guide to set up and deploy the backend for your portfolio website.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Local Development Setup](#local-development-setup)
3. [Gmail Configuration](#gmail-configuration)
4. [Testing Locally](#testing-locally)
5. [Deployment Options](#deployment-options)
6. [Frontend Integration](#frontend-integration)
7. [Troubleshooting](#troubleshooting)

---

## Overview

Your portfolio now has a full-stack backend that provides:

✅ **Contact Form API** - Professional email handling  
✅ **Hire Request API** - Project submissions with file attachments  
✅ **Projects API** - Dynamic project data  
✅ **Security** - Rate limiting, input validation, CORS  
✅ **Email Notifications** - Beautiful HTML emails

**Tech Stack:**
- Node.js + Express
- Nodemailer (Email)
- Multer (File uploads)
- express-validator (Validation)

---

## Local Development Setup

### Step 1: Install Node.js

Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Install Dependencies

```bash
cd backend
npm install
```

This installs:
- express
- nodemailer
- multer
- cors
- helmet
- express-validator
- express-rate-limit
- dotenv

### Step 3: Configure Environment Variables

Create `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Server
PORT=3000
NODE_ENV=development

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=aryandutta49142@gmail.com

# CORS (add your frontend URLs)
ALLOWED_ORIGINS=http://localhost:5500,http://127.0.0.1:5500

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

---

## Gmail Configuration

### Why Gmail App Password?

Gmail requires an **App Password** for third-party applications. Your regular password won't work.

### Step-by-Step Setup:

1. **Enable 2-Step Verification**
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Portfolio Backend"
   - Click "Generate"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

3. **Add to .env**
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=abcdefghijklmnop  # No spaces!
   ```

### Alternative Email Providers:

**SendGrid (Recommended for production):**
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

**Outlook/Hotmail:**
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

---

## Testing Locally

### Start the Server

Development mode (auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

You should see:
```
🚀 Server running on port 3000
📧 Email configured: your-email@gmail.com
🌍 Environment: development
🔒 CORS enabled for: http://localhost:5500
```

### Test Endpoints

**1. Health Check:**
```bash
curl http://localhost:3000/api/health
```

**2. Contact Form:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message from the contact form."
  }'
```

**3. Projects API:**
```bash
curl http://localhost:3000/api/projects
```

**4. Hire Form (with file):**

Use Postman or create an HTML form to test file uploads.

---

## Deployment Options

### Option 1: Render.com (Recommended - Free)

**Pros:** Free tier, easy setup, auto-deploy from GitHub  
**Cons:** Spins down after inactivity (cold starts)

**Steps:**

1. **Create Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: portfolio-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   - Click "Environment" tab
   - Add all variables from your `.env` file:
     - `EMAIL_HOST`
     - `EMAIL_PORT`
     - `EMAIL_USER`
     - `EMAIL_PASS`
     - `EMAIL_FROM`
     - `EMAIL_TO`
     - `ALLOWED_ORIGINS` (add your GitHub Pages URL)
     - `NODE_ENV=production`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Your API URL: `https://your-service.onrender.com`

6. **Update Frontend**
   - Edit `hire-me.js`
   - Change `API_URL` to your Render URL:
     ```javascript
     const API_URL = 'https://your-service.onrender.com';
     ```

---

### Option 2: Railway.app

**Pros:** Fast, generous free tier, great DX  
**Cons:** Requires credit card for free tier

**Steps:**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Node.js
6. Add environment variables
7. Deploy

Your API: `https://your-project.up.railway.app`

---

### Option 3: Vercel (Serverless)

**Pros:** Excellent for Next.js, free tier  
**Cons:** Requires code changes for serverless

**Steps:**

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Create `vercel.json` in backend folder:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

3. Deploy:
   ```bash
   cd backend
   vercel
   ```

4. Add environment variables in Vercel dashboard

---

### Option 4: Heroku

**Pros:** Mature platform, lots of add-ons  
**Cons:** No free tier anymore ($5/month minimum)

**Steps:**

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create portfolio-backend`
4. Set env vars:
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   # ... set all other vars
   ```
5. Deploy: `git push heroku main`

---

## Frontend Integration

### Update hire-me.js

Replace the `API_URL` with your deployed backend URL:

```javascript
// BEFORE (local development)
const API_URL = 'http://localhost:3000';

// AFTER (production)
const API_URL = 'https://your-backend.onrender.com';
```

### Update CORS in Backend

Add your GitHub Pages URL to `.env`:

```env
ALLOWED_ORIGINS=https://yourusername.github.io,http://localhost:5500
```

### Test the Integration

1. Open your portfolio website
2. Go to the "Hire Me" page
3. Fill out the form
4. Attach a file (optional)
5. Submit
6. Check your email (aryandutta49142@gmail.com)

---

## Troubleshooting

### Email Not Sending

**Problem:** Form submits but no email received

**Solutions:**
1. Check Gmail App Password is correct (no spaces)
2. Verify 2-Step Verification is enabled
3. Check spam/junk folder
4. Review server logs for errors
5. Test with a different email provider

**Check logs:**
```bash
# Render
View logs in Render dashboard

# Railway
railway logs

# Local
Check terminal output
```

---

### CORS Errors

**Problem:** `Access-Control-Allow-Origin` error in browser console

**Solutions:**
1. Add your frontend URL to `ALLOWED_ORIGINS` in `.env`
2. Restart the backend server
3. Clear browser cache
4. Check URL format (include protocol: `https://`)

**Example:**
```env
ALLOWED_ORIGINS=https://aryan6000.github.io,http://localhost:5500
```

---

### Rate Limit Errors

**Problem:** "Too many requests" error

**Solutions:**
1. Wait 15 minutes
2. Adjust rate limit in `.env`:
   ```env
   RATE_LIMIT_MAX_REQUESTS=10
   ```
3. Restart server

---

### File Upload Errors

**Problem:** File upload fails

**Solutions:**
1. Check file size (max 5MB per file)
2. Check file type (JPG, PNG, GIF, PDF, DOC, DOCX only)
3. Maximum 5 files per submission
4. Check server logs for specific error

---

### Backend Not Starting

**Problem:** Server won't start

**Solutions:**
1. Check Node.js version (18+ required):
   ```bash
   node --version
   ```
2. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Check `.env` file exists and is valid
4. Check port 3000 is not in use:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Mac/Linux
   lsof -i :3000
   ```

---

## Next Steps

### 1. Monitor Your Backend

- Set up uptime monitoring: [UptimeRobot](https://uptimerobot.com)
- Check logs regularly
- Monitor email delivery

### 2. Add Analytics

Track form submissions:
```javascript
// In hire.js route
console.log(`New hire request from ${email}`);
// Or use a service like PostHog
```

### 3. Add Database (Optional)

Store submissions in a database:
- MongoDB Atlas (free tier)
- PostgreSQL on Railway
- Supabase

### 4. Add Admin Dashboard (Optional)

View submissions without checking email:
- Build a simple React admin panel
- Add authentication (JWT or Firebase Auth)
- Display submissions from database

---

## Support

Need help? Contact:
- **Email:** aryandutta49142@gmail.com
- **GitHub:** [@Aryan6000](https://github.com/Aryan6000)

---

## Summary Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Gmail App Password generated
- [ ] Backend tested locally
- [ ] Backend deployed to Render/Railway/Vercel
- [ ] Frontend `API_URL` updated
- [ ] CORS configured with frontend URL
- [ ] Test form submission end-to-end
- [ ] Email received successfully

**Congratulations! Your portfolio now has a professional backend! 🎉**
