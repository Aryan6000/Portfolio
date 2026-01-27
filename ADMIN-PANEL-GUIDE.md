# Admin Panel Guide

Complete guide to using your portfolio admin panel.

## 🎯 Overview

Your admin panel allows you to:
- ✅ View dashboard with statistics
- ✅ Read and manage messages from contact/hire forms
- ✅ Add, edit, and delete projects
- ✅ View analytics and traffic data
- ✅ Control your portfolio content

## 🔐 Accessing the Admin Panel

### URL
```
https://your-portfolio.vercel.app/admin.html
```

### Default Login
- **Password:** `admin@2024`

**⚠️ IMPORTANT:** Change this password in production!

## 📊 Dashboard

The dashboard shows:
- **Total Messages** - All messages received
- **Today's Messages** - Messages received today
- **This Week** - Messages from the last 7 days
- **Total Projects** - Number of projects in portfolio

### Quick Actions
- Add New Project
- View Messages
- View Analytics

## 📧 Messages Management

### View Messages

1. Click **"Messages"** in sidebar
2. See all messages from contact and hire forms
3. Filter by:
   - All
   - Unread
   - Read

### Read a Message

1. Click on a message in the list
2. Message automatically marked as read
3. View full details:
   - Name and email
   - Date received
   - Message content
   - Attachments (for hire requests)

### Delete a Message

1. Select the message
2. Click **"Delete"** button
3. Confirm deletion

### Message Types

**Contact Messages:**
- Name
- Email
- Message

**Hire Requests:**
- Full name
- Email
- Phone (optional)
- Company (optional)
- Project title
- Project type
- Budget range
- Timeline
- Description
- Requirements
- Reference links
- Attachments (up to 5 files)

## 🚀 Projects Management

### View Projects

1. Click **"Projects"** in sidebar
2. See all projects in grid view
3. Each card shows:
   - Project image
   - Title and description
   - Project ID
   - Featured badge (if featured)

### Add New Project

1. Click **"Add New Project"** button
2. Fill out the form:
   - **Title** * (required)
   - **Category** * (required)
     - Web Application
     - Dashboard
     - Website
     - Mobile App
   - **Short Description** * (required)
   - **Long Description** (optional)
   - **Image URL** * (required)
   - **Featured Project** (checkbox)
   - **Live URL** (optional)
   - **GitHub URL** (optional)
3. Click **"Add Project"**

### Edit Project

1. Click **"Edit"** button on project card
2. Modify fields
3. Click **"Update Project"**

### Delete Project

1. Click **"Delete"** button on project card
2. Confirm deletion
3. Project removed from portfolio

### Featured Projects

- Check "Featured Project" to highlight on homepage
- Featured projects show ⭐ badge
- Typically 3-5 featured projects recommended

## 📈 Analytics

View analytics data:
- **Messages Over Time** - Bar chart showing daily messages
- **Message Statistics**
  - Total messages
  - Unread count
  - Read count
  - This week's messages

### Understanding Analytics

- **Peak Days** - Days with most messages
- **Trends** - Weekly/monthly patterns
- **Response Rate** - Track how quickly you respond

## 🎨 Theme Toggle

- Click moon/sun icon in header
- Switches between light and dark mode
- Preference saved in browser

## 🔒 Security

### Current Setup

- Simple password authentication
- Password stored in localStorage
- Admin routes protected with Bearer token

### Production Recommendations

1. **Change Default Password**
   - Edit `admin.js`
   - Update password check in `LoginScreen` component

2. **Use Environment Variables**
   ```javascript
   if (password === process.env.ADMIN_PASSWORD) {
       // Login
   }
   ```

3. **Implement JWT Authentication**
   - Use JSON Web Tokens
   - Add expiration
   - Refresh tokens

4. **Add Rate Limiting**
   - Limit login attempts
   - Block after failed attempts

5. **Use HTTPS Only**
   - Already enabled on Vercel
   - Never use HTTP for admin

### Changing the Password

**In `admin.js`, find:**
```javascript
if (password === 'admin@2024') {
```

**Change to:**
```javascript
if (password === 'your-secure-password-here') {
```

**Commit and push:**
```bash
git add admin.js
git commit -m "Update admin password"
git push
```

## 📱 Mobile Access

The admin panel is responsive:
- Works on tablets and phones
- Sidebar becomes horizontal on mobile
- Touch-optimized interface

## 🔄 Data Persistence

### Messages
- Stored in `backend/data/messages.json`
- Automatically saved when forms submitted
- Persists across deployments

### Projects
- Stored in `backend/data/projects.json`
- Editable through admin panel
- Changes reflect immediately on portfolio

### Local Storage
- Admin authentication state
- Theme preference
- Temporary UI state

## 🛠️ Troubleshooting

### Can't Login

**Check:**
1. Password is correct (`admin@2024` by default)
2. JavaScript is enabled
3. Browser console for errors

**Fix:**
- Clear browser cache
- Try incognito mode
- Check browser console

### Messages Not Showing

**Check:**
1. Messages are being saved to `messages.json`
2. Backend API is running
3. No errors in browser console

**Fix:**
- Check Vercel function logs
- Verify file permissions
- Test API endpoint: `/api/admin/messages`

### Projects Not Updating

**Check:**
1. Admin authentication is valid
2. API endpoint is accessible
3. `projects.json` file exists

**Fix:**
- Re-login to admin panel
- Check Vercel deployment logs
- Verify API routes are deployed

### Can't Delete/Edit

**Check:**
1. Logged in as admin
2. Bearer token is valid
3. API routes are working

**Fix:**
- Logout and login again
- Check network tab for errors
- Verify backend routes

## 🚀 Advanced Features

### Custom Analytics

Add Google Analytics or custom tracking:

```javascript
// In admin.js, add tracking
const trackEvent = (category, action) => {
    if (window.gtag) {
        gtag('event', action, {
            'event_category': category
        });
    }
};
```

### Email Notifications

Get notified of new messages:

```javascript
// In backend/routes/contact.js
// Add push notification or webhook
await sendPushNotification({
    title: 'New Message',
    body: `From ${name}: ${message.substring(0, 50)}...`
});
```

### Backup Data

Regularly backup your data:

```bash
# Download messages.json
curl https://your-api.vercel.app/api/admin/messages > backup-messages.json

# Download projects.json
curl https://your-api.vercel.app/api/projects > backup-projects.json
```

### Export Messages

Add export functionality:

```javascript
const exportMessages = () => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'messages-export.json';
    link.click();
};
```

## 📊 Best Practices

### Daily Tasks
- [ ] Check new messages
- [ ] Respond to inquiries
- [ ] Review analytics

### Weekly Tasks
- [ ] Update projects if needed
- [ ] Review message trends
- [ ] Backup data

### Monthly Tasks
- [ ] Add new projects
- [ ] Update project descriptions
- [ ] Review and improve content
- [ ] Check security logs

## 🔐 Security Checklist

- [ ] Changed default password
- [ ] Using HTTPS only
- [ ] Regular backups
- [ ] Monitor access logs
- [ ] Keep dependencies updated
- [ ] Use strong passwords
- [ ] Enable 2FA (if available)

## 📞 Support

Need help with the admin panel?

- **Email:** aryandutta49142@gmail.com
- **GitHub:** [@Aryan6000](https://github.com/Aryan6000)

## 🎯 Quick Reference

| Feature | Shortcut | Location |
|---------|----------|----------|
| Dashboard | - | Sidebar → Dashboard |
| Messages | - | Sidebar → Messages |
| Projects | - | Sidebar → Projects |
| Analytics | - | Sidebar → Analytics |
| Logout | - | Sidebar → Logout |
| Theme Toggle | - | Header → Moon/Sun icon |

## 📝 API Endpoints

### Admin Routes

All admin routes require authentication header:
```
Authorization: Bearer admin@2024
```

**GET /api/admin/stats**
- Get dashboard statistics

**GET /api/admin/messages**
- Get all messages

**GET /api/admin/projects**
- Get all projects (admin view)

**POST /api/admin/projects**
- Add new project

**PUT /api/admin/projects/:id**
- Update project

**DELETE /api/admin/projects/:id**
- Delete project

---

**Happy Managing! 🎉**
