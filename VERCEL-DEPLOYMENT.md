# Vercel Deployment Guide

Complete step-by-step guide to deploy your portfolio (frontend + backend) to Vercel.

## 🎯 What You'll Deploy

- ✅ **Frontend**: Your entire portfolio website (HTML, CSS, JS)
- ✅ **Backend API**: Serverless functions for contact form, hire form, and projects
- ✅ **Single Domain**: Everything on one Vercel domain (e.g., `yourname.vercel.app`)

---

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Free tier is perfect (sign up at [vercel.com](https://vercel.com))
3. **Gmail App Password** - For sending emails (see setup below)

---

## 🚀 Deployment Steps

### Step 1: Prepare Your Repository

Make sure all files are committed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

**Important files for Vercel:**
- ✅ `vercel.json` - Configuration file (already created)
- ✅ `backend/api/index.js` - Serverless entry point (already created)
- ✅ `.vercelignore` - Files to exclude (already created)

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

### Step 3: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your portfolio repository in the list
3. Click **"Import"**

### Step 4: Configure Project Settings

**Framework Preset:** Select **"Other"** (since it's a static site with custom backend)

**Root Directory:** Leave as `.` (root)

**Build Settings:**
- **Build Command:** Leave empty (no build needed for static files)
- **Output Directory:** Leave empty
- **Install Command:** `npm install --prefix backend`

### Step 5: Add Environment Variables

Click **"Environment Variables"** and add these:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=aryandutta49142@gmail.com
ALLOWED_ORIGINS=*
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
MAX_FILE_SIZE=5242880
NODE_ENV=production
```

**Important Notes:**
- `EMAIL_PASS` must be a Gmail App Password (see below)
- `ALLOWED_ORIGINS=*` allows all origins (or specify your domain)
- Add these to **Production**, **Preview**, and **Development** environments

### Step 6: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. You'll get a URL like: `https://your-portfolio.vercel.app`

---

## 📧 Gmail App Password Setup

### Why Needed?

Gmail requires an App Password for third-party applications. Your regular password won't work.

### Steps:

1. **Enable 2-Step Verification**
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup wizard

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Vercel Portfolio"
   - Click "Generate"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

3. **Add to Vercel**
   - In Vercel project settings → Environment Variables
   - Add `EMAIL_PASS` with the 16-character password (no spaces!)
   - Example: `abcdefghijklmnop`

---

## 🔧 Update Frontend API URL

After deployment, update your frontend to use the Vercel API:

### Edit `hire-me.js`

Find this line:
```javascript
const API_URL = 'http://localhost:3000';
```

Replace with:
```javascript
const API_URL = ''; // Empty string uses same domain
```

Or use your full Vercel URL:
```javascript
const API_URL = 'https://your-portfolio.vercel.app';
```

### Commit and Push

```bash
git add hire-me.js
git commit -m "Update API URL for Vercel"
git push origin main
```

Vercel will automatically redeploy!

---

## ✅ Testing Your Deployment

### 1. Test Health Endpoint

Open in browser:
```
https://your-portfolio.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2024-01-27T...",
  "environment": "production"
}
```

### 2. Test Contact Form

1. Go to your portfolio homepage
2. Scroll to contact section (if you have one)
3. Fill out the form
4. Submit
5. Check your email

### 3. Test Hire Form

1. Go to: `https://your-portfolio.vercel.app/hire-me.html`
2. Fill out all required fields
3. Attach a file (optional)
4. Click "Submit Project Request"
5. Check your email (aryandutta49142@gmail.com)

### 4. Test Projects API

Open in browser:
```
https://your-portfolio.vercel.app/api/projects
```

Should return your projects JSON.

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain

1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel project → **Settings** → **Domains**
3. Click **"Add"**
4. Enter your domain (e.g., `aryandutta.com`)
5. Follow DNS configuration instructions
6. Wait for DNS propagation (5-60 minutes)

### Update Environment Variables

After adding custom domain, update `ALLOWED_ORIGINS`:

```
ALLOWED_ORIGINS=https://aryandutta.com,https://www.aryandutta.com
```

---

## 🔍 Monitoring & Logs

### View Deployment Logs

1. Go to Vercel dashboard
2. Click your project
3. Click **"Deployments"**
4. Click on a deployment
5. View **"Build Logs"** and **"Function Logs"**

### View Function Logs (API Requests)

1. Go to project → **"Logs"**
2. Filter by function (e.g., `/api/hire`)
3. See all requests and errors in real-time

### Monitor Uptime

Vercel has 99.99% uptime, but you can add monitoring:
- [UptimeRobot](https://uptimerobot.com) - Free
- [Pingdom](https://www.pingdom.com) - Paid

---

## 🐛 Troubleshooting

### Issue: "Module not found" Error

**Solution:**
1. Check `backend/package.json` exists
2. Verify all dependencies are listed
3. Redeploy

### Issue: Email Not Sending

**Solutions:**
1. Check Gmail App Password is correct (no spaces)
2. Verify environment variables in Vercel
3. Check Function Logs for errors
4. Test with a different email provider

**Check logs:**
```
Vercel Dashboard → Your Project → Logs → Filter by /api/hire or /api/contact
```

### Issue: CORS Errors

**Solutions:**
1. Set `ALLOWED_ORIGINS=*` in environment variables
2. Or specify your exact domain: `ALLOWED_ORIGINS=https://your-portfolio.vercel.app`
3. Redeploy after changing environment variables

### Issue: File Upload Fails

**Solutions:**
1. Vercel has a 4.5MB body size limit for serverless functions
2. Reduce `MAX_FILE_SIZE` to `4500000` (4.5MB)
3. Update environment variable in Vercel
4. Redeploy

### Issue: Rate Limit Too Strict

**Solutions:**
1. Increase `RATE_LIMIT_MAX_REQUESTS` to `10` or `20`
2. Update in Vercel environment variables
3. Redeploy

### Issue: Function Timeout

Vercel free tier has 10-second timeout for serverless functions.

**Solutions:**
1. Optimize email sending code
2. Reduce file size limits
3. Upgrade to Pro plan ($20/month) for 60-second timeout

---

## 📊 Vercel Free Tier Limits

- ✅ **Bandwidth:** 100GB/month
- ✅ **Serverless Function Executions:** 100GB-hours/month
- ✅ **Serverless Function Duration:** 10 seconds max
- ✅ **Deployments:** Unlimited
- ✅ **Team Members:** 1 (you)
- ✅ **Custom Domains:** Unlimited

**More than enough for a portfolio!**

---

## 🔄 Automatic Deployments

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update portfolio"
git push origin main

# Vercel automatically deploys in 1-2 minutes!
```

### Preview Deployments

Every pull request gets a preview URL:
1. Create a branch: `git checkout -b new-feature`
2. Make changes and push
3. Create pull request on GitHub
4. Vercel creates preview URL
5. Test before merging to main

---

## 🎯 Post-Deployment Checklist

- [ ] Portfolio loads at Vercel URL
- [ ] All pages work (home, projects, hire-me)
- [ ] Contact form sends emails
- [ ] Hire form sends emails with attachments
- [ ] Projects API returns data
- [ ] No console errors in browser
- [ ] Mobile responsive works
- [ ] Dark mode toggle works
- [ ] All links work correctly
- [ ] Images load properly

---

## 🚀 Advanced: CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📈 Next Steps

### 1. Add Analytics

```bash
# Install Vercel Analytics
npm install @vercel/analytics
```

Add to your HTML:
```html
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

### 2. Add Speed Insights

Enable in Vercel dashboard → Analytics → Speed Insights

### 3. Set Up Monitoring

- Enable Vercel Monitoring (Pro plan)
- Or use external: UptimeRobot, Pingdom

### 4. Optimize Performance

- Enable Vercel Image Optimization
- Use Vercel Edge Functions for faster response
- Add caching headers

---

## 💡 Tips & Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel dashboard for secrets
   - Different values for preview vs production

2. **Deployment Speed**
   - Keep dependencies minimal
   - Use `.vercelignore` to exclude unnecessary files
   - Vercel caches dependencies

3. **Security**
   - Always use HTTPS (automatic on Vercel)
   - Keep dependencies updated
   - Use rate limiting (already configured)

4. **Cost Management**
   - Monitor usage in Vercel dashboard
   - Free tier is generous for portfolios
   - Upgrade only if needed

---

## 📞 Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Twitter: [@vercel](https://twitter.com/vercel)

### Your Portfolio Support
- Email: aryandutta49142@gmail.com
- GitHub: [@Aryan6000](https://github.com/Aryan6000)

---

## 🎉 Success!

Your portfolio is now live on Vercel with:
- ✅ Professional frontend
- ✅ Working backend API
- ✅ Email notifications
- ✅ File upload support
- ✅ Automatic deployments
- ✅ Free hosting
- ✅ HTTPS enabled
- ✅ Global CDN

**Share your portfolio:**
```
https://your-portfolio.vercel.app
```

**Congratulations! 🚀**
