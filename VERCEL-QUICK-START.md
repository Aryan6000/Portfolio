# 🚀 Vercel Deployment - Quick Start

Deploy your portfolio to Vercel in 5 minutes!

## ✅ What You Need

1. GitHub account (with your code pushed)
2. Gmail account (for sending emails)
3. 5 minutes of your time

## 📝 Step-by-Step

### 1️⃣ Get Gmail App Password (2 minutes)

1. Go to: https://myaccount.google.com/apppasswords
2. If asked, enable 2-Step Verification first
3. Select **"Mail"** → **"Other (Custom name)"**
4. Enter **"Vercel Portfolio"**
5. Click **"Generate"**
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)
7. **Save it** - you'll need it in step 4

### 2️⃣ Sign Up for Vercel (30 seconds)

1. Go to: https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### 3️⃣ Import Your Project (30 seconds)

1. Click **"Add New..."** → **"Project"**
2. Find your portfolio repository
3. Click **"Import"**

### 4️⃣ Configure Settings (1 minute)

**Framework Preset:** Select **"Other"**

**Root Directory:** Leave as `.` (default)

**Build & Development Settings:**
- Build Command: Leave empty
- Output Directory: Leave empty
- Install Command: `npm install --prefix backend`

### 5️⃣ Add Environment Variables (1 minute)

Click **"Environment Variables"** and add these **one by one**:

| Name | Value |
|------|-------|
| `EMAIL_HOST` | `smtp.gmail.com` |
| `EMAIL_PORT` | `587` |
| `EMAIL_USER` | `your-email@gmail.com` |
| `EMAIL_PASS` | `your-16-char-password` (from step 1, no spaces!) |
| `EMAIL_FROM` | `your-email@gmail.com` |
| `EMAIL_TO` | `aryandutta49142@gmail.com` |
| `ALLOWED_ORIGINS` | `*` |
| `NODE_ENV` | `production` |

**Important:** 
- Use the 16-character App Password from step 1 for `EMAIL_PASS`
- Remove all spaces from the password
- Add to all three environments (Production, Preview, Development)

### 6️⃣ Deploy! (30 seconds)

1. Click **"Deploy"**
2. Wait 1-2 minutes ⏳
3. Done! 🎉

You'll get a URL like: `https://your-portfolio.vercel.app`

### 7️⃣ Update Frontend (1 minute)

Edit `hire-me.js` in your code:

**Find this line:**
```javascript
const API_URL = 'http://localhost:3000';
```

**Replace with:**
```javascript
const API_URL = ''; // Empty string uses same domain
```

**Commit and push:**
```bash
git add hire-me.js
git commit -m "Update API URL for Vercel"
git push origin main
```

Vercel will automatically redeploy! ✨

## ✅ Test Your Site

### 1. Homepage
Open: `https://your-portfolio.vercel.app`

Should see:
- ✅ Your portfolio loads
- ✅ No errors in console
- ✅ Dark mode toggle works

### 2. API Health Check
Open: `https://your-portfolio.vercel.app/api/health`

Should see:
```json
{
  "status": "OK",
  "timestamp": "2024-01-27T...",
  "environment": "production"
}
```

### 3. Hire Form
Open: `https://your-portfolio.vercel.app/hire-me.html`

Test:
- ✅ Fill out all fields
- ✅ Attach a file (optional)
- ✅ Click "Submit Project Request"
- ✅ Check your email (aryandutta49142@gmail.com)

## 🎉 Success!

Your portfolio is now live with:
- ✅ Professional frontend
- ✅ Working backend API
- ✅ Email notifications
- ✅ File upload support
- ✅ Auto-deployments on git push
- ✅ Free hosting
- ✅ HTTPS enabled
- ✅ Global CDN

## 🔧 Common Issues

### Email Not Working?

**Check:**
1. Gmail App Password is correct (no spaces)
2. Used the 16-character password, not your Gmail password
3. Environment variables are set in Vercel
4. Check spam folder

**Fix:**
- Go to Vercel → Your Project → Settings → Environment Variables
- Verify `EMAIL_PASS` is correct
- Redeploy

### CORS Errors?

**Fix:**
- Set `ALLOWED_ORIGINS=*` in Vercel environment variables
- Redeploy
- Clear browser cache

### File Upload Fails?

**Note:** Vercel free tier has 4.5MB limit per request

**Fix:**
- Keep files under 4.5MB
- Or upgrade to Vercel Pro ($20/month)

## 📚 Need More Help?

- 📖 **Full Guide:** [VERCEL-DEPLOYMENT.md](./VERCEL-DEPLOYMENT.md)
- ✅ **Checklist:** [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md)
- 🔧 **Backend Setup:** [BACKEND-SETUP.md](./BACKEND-SETUP.md)
- 📧 **Email:** aryandutta49142@gmail.com

## 🎯 Next Steps

1. **Share your portfolio:**
   - Add to LinkedIn
   - Update resume
   - Share on social media

2. **Custom domain (optional):**
   - Buy a domain
   - Add in Vercel → Settings → Domains
   - Follow DNS instructions

3. **Monitor:**
   - Check Vercel dashboard for errors
   - Review email deliverability
   - Monitor bandwidth usage

## 🚀 Auto-Deployments

Every time you push to GitHub, Vercel automatically deploys:

```bash
# Make changes
git add .
git commit -m "Update portfolio"
git push origin main

# Vercel deploys automatically! ✨
```

## 📊 Vercel Dashboard

Access your dashboard: https://vercel.com/dashboard

**Useful sections:**
- **Deployments:** See all deployments
- **Logs:** View function logs and errors
- **Analytics:** Track visitors (optional)
- **Settings:** Manage environment variables

---

**Congratulations! Your portfolio is live! 🎉**

**Share it:** `https://your-portfolio.vercel.app`
