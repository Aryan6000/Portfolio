# Vercel Deployment Checklist ✅

Use this checklist to ensure everything is ready for deployment.

## Pre-Deployment

### Code Preparation
- [ ] All files committed to Git
- [ ] Code pushed to GitHub
- [ ] `vercel.json` exists in root
- [ ] `backend/api/index.js` exists
- [ ] `.vercelignore` exists
- [ ] `package.json` exists in root

### Gmail Setup
- [ ] Gmail account ready
- [ ] 2-Step Verification enabled
- [ ] App Password generated (16 characters)
- [ ] App Password saved securely

### Test Locally (Optional)
- [ ] Backend runs locally (`cd backend && npm run dev`)
- [ ] Contact form works
- [ ] Hire form works
- [ ] File uploads work

## Vercel Setup

### Account & Project
- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] Repository imported to Vercel
- [ ] Project name set

### Configuration
- [ ] Framework set to "Other"
- [ ] Root directory is `.`
- [ ] Install command: `npm install --prefix backend`
- [ ] Build command: empty
- [ ] Output directory: empty

### Environment Variables
Add these in Vercel dashboard:

- [ ] `EMAIL_HOST` = `smtp.gmail.com`
- [ ] `EMAIL_PORT` = `587`
- [ ] `EMAIL_USER` = your Gmail address
- [ ] `EMAIL_PASS` = 16-char App Password (no spaces!)
- [ ] `EMAIL_FROM` = your Gmail address
- [ ] `EMAIL_TO` = `aryandutta49142@gmail.com`
- [ ] `ALLOWED_ORIGINS` = `*`
- [ ] `NODE_ENV` = `production`
- [ ] `RATE_LIMIT_WINDOW_MS` = `900000`
- [ ] `RATE_LIMIT_MAX_REQUESTS` = `5`
- [ ] `MAX_FILE_SIZE` = `4500000`

**Important:** Add to all three environments:
- [ ] Production
- [ ] Preview
- [ ] Development

## Deployment

- [ ] Click "Deploy" button
- [ ] Wait for deployment (1-2 minutes)
- [ ] Deployment successful (green checkmark)
- [ ] Vercel URL received (e.g., `your-project.vercel.app`)

## Post-Deployment

### Update Frontend
- [ ] Edit `hire-me.js`
- [ ] Change `API_URL` to `''` or your Vercel URL
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Vercel auto-deploys

### Testing

#### Homepage
- [ ] Homepage loads: `https://your-project.vercel.app`
- [ ] No console errors
- [ ] Images load
- [ ] Navigation works
- [ ] Dark mode toggle works
- [ ] Mobile responsive

#### API Endpoints
- [ ] Health check works: `/api/health`
- [ ] Returns JSON with status "OK"
- [ ] Projects API works: `/api/projects`
- [ ] Returns project data

#### Contact Form (if you have one)
- [ ] Form loads
- [ ] Can fill out fields
- [ ] Submit button works
- [ ] Email received at aryandutta49142@gmail.com
- [ ] No errors in Vercel logs

#### Hire Form
- [ ] Form loads: `/hire-me.html`
- [ ] All fields work
- [ ] File upload works
- [ ] Can select multiple files (max 5)
- [ ] File size validation works (max 4.5MB)
- [ ] Submit button works
- [ ] Loading state shows
- [ ] Success message appears
- [ ] Email received with attachments
- [ ] No errors in Vercel logs

#### Projects Page
- [ ] Project details page loads
- [ ] All projects display
- [ ] Images load
- [ ] Links work

### Vercel Dashboard
- [ ] Check deployment logs (no errors)
- [ ] Check function logs (no errors)
- [ ] Monitor bandwidth usage
- [ ] Check function execution time

## Optional Enhancements

### Custom Domain
- [ ] Domain purchased
- [ ] Domain added in Vercel
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Update `ALLOWED_ORIGINS` with custom domain

### Analytics
- [ ] Vercel Analytics enabled
- [ ] Speed Insights enabled
- [ ] Google Analytics added (optional)

### Monitoring
- [ ] UptimeRobot configured
- [ ] Email alerts set up
- [ ] Status page created (optional)

### SEO
- [ ] Meta tags updated
- [ ] Open Graph tags added
- [ ] Sitemap created
- [ ] robots.txt added
- [ ] Google Search Console verified

## Troubleshooting Checklist

If something doesn't work:

### Email Issues
- [ ] Check Gmail App Password (no spaces)
- [ ] Verify 2-Step Verification enabled
- [ ] Check spam folder
- [ ] Review Vercel function logs
- [ ] Test with different email provider

### CORS Issues
- [ ] Set `ALLOWED_ORIGINS=*`
- [ ] Clear browser cache
- [ ] Check browser console for errors
- [ ] Verify Vercel environment variables

### File Upload Issues
- [ ] Check file size (max 4.5MB on Vercel free tier)
- [ ] Check file type (JPG, PNG, PDF, DOC, DOCX)
- [ ] Max 5 files per upload
- [ ] Check Vercel function logs

### Function Timeout
- [ ] Check function execution time in logs
- [ ] Optimize code if > 10 seconds
- [ ] Consider upgrading to Pro plan

### Build Errors
- [ ] Check build logs in Vercel
- [ ] Verify all dependencies in package.json
- [ ] Check Node.js version compatibility
- [ ] Redeploy

## Success Criteria

Your deployment is successful when:

- ✅ Homepage loads without errors
- ✅ All pages are accessible
- ✅ API endpoints respond correctly
- ✅ Contact/Hire forms send emails
- ✅ File uploads work
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Dark mode works
- ✅ Fast load times (< 3 seconds)
- ✅ HTTPS enabled (automatic)
- ✅ Auto-deployments work on git push

## Final Steps

- [ ] Share portfolio URL with friends
- [ ] Add URL to resume
- [ ] Update LinkedIn profile
- [ ] Update GitHub profile
- [ ] Tweet about your portfolio
- [ ] Add to portfolio directories

## Maintenance

### Weekly
- [ ] Check Vercel dashboard for errors
- [ ] Review email deliverability
- [ ] Monitor bandwidth usage

### Monthly
- [ ] Update dependencies
- [ ] Review and respond to inquiries
- [ ] Check analytics
- [ ] Update projects if needed

### As Needed
- [ ] Add new projects
- [ ] Update skills
- [ ] Refresh testimonials
- [ ] Improve performance

---

## Quick Reference

**Vercel Dashboard:** https://vercel.com/dashboard

**Your Portfolio:** `https://your-project.vercel.app`

**API Health:** `https://your-project.vercel.app/api/health`

**Hire Form:** `https://your-project.vercel.app/hire-me.html`

**Logs:** Vercel Dashboard → Your Project → Logs

**Environment Variables:** Vercel Dashboard → Your Project → Settings → Environment Variables

---

## Need Help?

- 📖 Full Guide: `VERCEL-DEPLOYMENT.md`
- 🚀 Quick Start: `deploy-to-vercel.md`
- 📧 Email: aryandutta49142@gmail.com
- 🐙 GitHub: [@Aryan6000](https://github.com/Aryan6000)

---

**Good luck with your deployment! 🎉**
