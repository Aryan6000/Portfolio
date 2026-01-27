# Quick Deploy to Vercel - 5 Minutes

## Prerequisites
- GitHub account with your code pushed
- Gmail account for sending emails

## Step-by-Step (5 Minutes)

### 1. Sign Up for Vercel (1 min)
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### 2. Import Project (1 min)
1. Click "Add New..." → "Project"
2. Find your repository
3. Click "Import"

### 3. Configure (2 min)
**Framework:** Other
**Root Directory:** `.` (leave as is)
**Build Command:** Leave empty
**Install Command:** `npm install --prefix backend`

### 4. Add Environment Variables (1 min)

Click "Environment Variables" and add:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=aryandutta49142@gmail.com
ALLOWED_ORIGINS=*
NODE_ENV=production
```

**Get Gmail App Password:**
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" → "Other"
3. Name it "Vercel"
4. Copy the 16-character password
5. Use it as `EMAIL_PASS` (no spaces!)

### 5. Deploy (30 sec)
1. Click "Deploy"
2. Wait 1-2 minutes
3. Done! 🎉

### 6. Update Frontend (30 sec)

Edit `hire-me.js`, change:
```javascript
const API_URL = 'http://localhost:3000';
```

To:
```javascript
const API_URL = ''; // Uses same domain
```

Commit and push:
```bash
git add hire-me.js
git commit -m "Update API URL"
git push
```

Vercel auto-deploys!

## Test Your Site

1. **Homepage:** `https://your-project.vercel.app`
2. **API Health:** `https://your-project.vercel.app/api/health`
3. **Hire Form:** `https://your-project.vercel.app/hire-me.html`

## Done! 🚀

Your portfolio is live with:
- ✅ Frontend hosted
- ✅ Backend API working
- ✅ Email notifications
- ✅ File uploads
- ✅ Auto-deployments on git push

## Troubleshooting

**Email not working?**
- Check Gmail App Password (no spaces)
- Check Vercel logs: Project → Logs

**CORS errors?**
- Set `ALLOWED_ORIGINS=*` in Vercel
- Redeploy

**Need help?**
- Read full guide: `VERCEL-DEPLOYMENT.md`
- Email: aryandutta49142@gmail.com
