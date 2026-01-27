# Aryan Dutta - Portfolio Website

Professional full-stack portfolio website showcasing frontend development skills with a complete backend API.

🌐 **Deploy Now:** [5-Minute Vercel Setup](./deploy-to-vercel.md)

## 🎯 Overview

A modern, responsive portfolio with:
- ✅ **Frontend**: Clean, professional design with dark mode
- ✅ **Backend API**: Contact forms, file uploads, email notifications
- ✅ **Admin Panel**: Manage messages, projects, and analytics
- ✅ **Full-Stack**: Demonstrates complete software development lifecycle

## ✨ Features

### Frontend
- Modern, clean design with light/dark mode toggle
- Fully responsive (mobile, tablet, desktop)
- Typing animation in hero section
- Floating contact bubbles with animations
- Horizontal scrolling projects on mobile
- Touch-optimized gestures
- Smooth animations and transitions

### Backend API
- Contact form with email notifications
- Hire request form with file attachments (up to 5 files, 4.5MB each)
- Dynamic projects API
- Rate limiting and security
- Beautiful HTML email templates
- Input validation
- Message storage and retrieval

### Admin Panel
- Dashboard with statistics
- Message management (read, delete, filter)
- Project management (add, edit, delete)
- Analytics and traffic data
- Password-protected access
- Responsive design
- Dark mode support

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- React 18 (via CDN)
- Responsive Design
- CSS Variables for theming

**Backend:**
- Node.js + Express
- Nodemailer (Email)
- Multer (File uploads)
- express-validator
- Helmet (Security)

**Deployment:**
- Vercel (Frontend + Serverless Backend)
- GitHub (Version control)

## 📁 Project Structure

```
portfolio/
├── index.html              # Homepage
├── hire-me.html           # Hire request form
├── project-details.html   # Project details page
├── app.js                 # Main React app
├── hire-me.js            # Hire form logic
├── style.css             # Global styles
├── vercel.json           # Vercel configuration
│
├── backend/              # Backend API
│   ├── api/
│   │   └── index.js     # Serverless entry point
│   ├── routes/
│   │   ├── contact.js   # Contact form endpoint
│   │   ├── hire.js      # Hire form endpoint
│   │   └── projects.js  # Projects API
│   ├── data/
│   │   └── projects.json # Project data
│   ├── server.js        # Express server (local dev)
│   └── package.json     # Backend dependencies
│
└── docs/               # Documentation
    ├── VERCEL-DEPLOYMENT.md
    ├── deploy-to-vercel.md
    ├── DEPLOYMENT-CHECKLIST.md
    └── BACKEND-SETUP.md
```

## 🚀 Quick Start

### Option 1: Deploy to Vercel (Recommended)

Follow the [5-minute deployment guide](./deploy-to-vercel.md)

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aryan6000/portfolio.git
   cd portfolio
   ```

2. **Set up backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your Gmail credentials
   npm run dev
   ```

3. **Open frontend**
   - Open `index.html` in your browser
   - Or use Live Server in VS Code

## 📧 Email Configuration

The backend uses Gmail SMTP. You need a Gmail App Password:

1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password in your `.env` file

See [BACKEND-SETUP.md](./BACKEND-SETUP.md) for detailed instructions.

## 🎨 Design Philosophy

- **Clean & Minimal** - Focus on content, not distractions
- **Professional** - Business-ready aesthetic
- **Accessible** - WCAG compliant with keyboard navigation
- **Responsive** - Perfect on all devices
- **Fast** - Optimized performance

## 📱 Key Features

### Hero Section
- Typing animation cycling through roles
- Responsive layout (text left, image right on mobile)
- Call-to-action buttons

### Stats Bar
- Horizontal scrolling on mobile
- Animated numbers
- Touch-optimized

### Skills Section
- Circular icon badges
- Centered layout on mobile
- Hover effects

### Projects Section
- Horizontal scrolling on mobile
- Snap points for smooth navigation
- Click to view details

### Testimonials
- Auto-rotating carousel
- Touch swipe support
- Card-based design with quote marks

### Contact Section
- Floating bubble design
- Animated on hover
- Direct links to social media

### Hire Form
- Comprehensive project request form
- File upload support (images, PDFs, documents)
- Real-time file preview
- Backend API integration

## 🔧 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `POST /api/contact` - Contact form submission
- `POST /api/hire` - Hire request with file uploads
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project

### Admin Endpoints (Protected)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/messages` - Get all messages
- `GET /api/admin/projects` - Get projects (admin view)
- `POST /api/admin/projects` - Add new project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

## 🔐 Admin Panel

Access the admin panel at: `/admin.html`

**Default Password:** `admin@2024` (⚠️ Change before deploying!)

**Features:**
- Dashboard with statistics
- Message management
- Project management
- Analytics
- Dark mode

**Documentation:** [ADMIN-PANEL-GUIDE.md](./ADMIN-PANEL-GUIDE.md)

## 🎨 Color Palette

### Light Mode
- Primary: `#6366f1` (Indigo 500)
- Text: `#0f172a` (Slate 900)
- Background: `#ffffff` (White)

### Dark Mode
- Primary: `#818cf8` (Indigo 400)
- Text: `#f1f5f9` (Slate 100)
- Background: `#0f172a` (Slate 900)

## 📊 Performance

- Lighthouse Score: 95+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Mobile-optimized with touch gestures

## 🔒 Security

- Rate limiting (5 requests per 15 minutes)
- Input validation on all forms
- CORS configuration
- Helmet.js security headers
- File type and size validation
- XSS protection

## 📝 Documentation

- [Vercel Deployment Guide](./VERCEL-DEPLOYMENT.md) - Complete deployment instructions
- [Quick Deploy Guide](./deploy-to-vercel.md) - 5-minute setup
- [Deployment Checklist](./DEPLOYMENT-CHECKLIST.md) - Step-by-step checklist
- [Backend Setup](./BACKEND-SETUP.md) - Backend configuration and alternatives

## 🐛 Troubleshooting

See [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) for common issues and solutions.

## 🤝 Contributing

This is a personal portfolio, but feel free to:
- Report bugs
- Suggest improvements
- Use as inspiration for your own portfolio

## 📄 License

MIT License - Feel free to use this code for your own portfolio!

## 👤 Author

**Aryan Dutta**
- Email: aryandutta49142@gmail.com
- GitHub: [@Aryan6000](https://github.com/Aryan6000)
- LinkedIn: [Aryan Dutta](https://www.linkedin.com/in/aryan-dutta-24828132a/)
- Instagram: [@itz.aryan6000](https://www.instagram.com/itz.aryan6000/)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from SVG libraries
- Images from Unsplash
- Fonts from Google Fonts

---

**⭐ If you found this helpful, please star the repository!**

**🚀 Ready to deploy? Follow the [Quick Deploy Guide](./deploy-to-vercel.md)**

© 2026 Aryan Dutta. All rights reserved.
