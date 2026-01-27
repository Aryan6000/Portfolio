# Portfolio Backend API

Backend API for Aryan Dutta's Portfolio website. Handles contact forms, hire requests with file attachments, and project data management.

## Features

- ✅ **Contact Form API** - Receive and forward contact inquiries via email
- ✅ **Hire Request API** - Handle project requests with file attachments (up to 5 files, 5MB each)
- ✅ **Projects API** - Serve dynamic project data
- ✅ **Rate Limiting** - Prevent abuse (5 requests per 15 minutes)
- ✅ **Input Validation** - Comprehensive validation using express-validator
- ✅ **Security** - Helmet.js for security headers, CORS configuration
- ✅ **Email Notifications** - Beautiful HTML emails with Nodemailer

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Email**: Nodemailer (SMTP)
- **File Upload**: Multer
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting

## Installation

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=aryandutta49142@gmail.com

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5500,https://yourusername.github.io

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5
```

### 3. Gmail App Password Setup

To use Gmail SMTP, you need an **App Password**:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select **Mail** and **Other (Custom name)**
5. Enter "Portfolio Backend" and click **Generate**
6. Copy the 16-character password and use it as `EMAIL_PASS` in `.env`

## Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
```
GET /api/health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-27T10:30:00.000Z",
  "environment": "development"
}
```

### Contact Form
```
POST /api/contact
Content-Type: application/json
```

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to discuss a project..."
}
```

Response:
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I'll get back to you soon."
}
```

### Hire Request (with file attachments)
```
POST /api/hire
Content-Type: multipart/form-data
```

Form Fields:
- `fullName` (required)
- `email` (required)
- `phone` (optional)
- `company` (optional)
- `projectTitle` (required)
- `projectType` (required)
- `budget` (required)
- `timeline` (required)
- `description` (required)
- `requirements` (optional)
- `reference` (optional)
- `attachments` (optional, max 5 files, 5MB each)

Response:
```json
{
  "success": true,
  "message": "Your project request has been submitted successfully!",
  "attachmentCount": 2
}
```

### Get All Projects
```
GET /api/projects
```

Response:
```json
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

### Get Single Project
```
GET /api/projects/:id
```

Response:
```json
{
  "success": true,
  "data": {...}
}
```

## Deployment Options

### Option 1: Render (Recommended - Free Tier)

1. Create account at [render.com](https://render.com)
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: portfolio-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free
5. Add Environment Variables from your `.env` file
6. Click **Create Web Service**

Your API will be available at: `https://your-service.onrender.com`

### Option 2: Railway

1. Create account at [railway.app](https://railway.app)
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Railway will auto-detect Node.js
5. Add Environment Variables
6. Deploy

### Option 3: Vercel (Serverless Functions)

Convert to serverless functions:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Create `vercel.json`:
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

### Option 4: Heroku

```bash
# Install Heroku CLI
heroku login
heroku create portfolio-backend
git push heroku main
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
# ... set other env vars
```

## Connecting Frontend to Backend

Update your frontend code to use the backend API:

### For Contact Form (in your React app):

```javascript
const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('https://your-backend-url.com/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                message: formData.message
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
        } else {
            alert('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to send message');
    }
};
```

### For Hire Form with Attachments:

```javascript
const handleHireSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    formData.append('email', data.email);
    // ... append other fields
    
    // Append files
    const fileInput = document.querySelector('input[type="file"]');
    for (let file of fileInput.files) {
        formData.append('attachments', file);
    }
    
    try {
        const response = await fetch('https://your-backend-url.com/api/hire', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
```

## Security Best Practices

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use App Passwords** - Never use your actual Gmail password
3. **Enable Rate Limiting** - Already configured (5 requests per 15 min)
4. **Validate All Input** - Already implemented with express-validator
5. **Use HTTPS** - All deployment platforms provide free SSL
6. **Update Dependencies** - Run `npm audit` regularly

## Testing

Test the API using curl or Postman:

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Test message"}'

# Test projects endpoint
curl http://localhost:3000/api/projects
```

## Troubleshooting

### Email not sending

1. Check Gmail App Password is correct
2. Verify 2-Step Verification is enabled
3. Check spam folder
4. Review server logs for errors

### CORS errors

1. Add your frontend URL to `ALLOWED_ORIGINS` in `.env`
2. Restart the server after changing `.env`

### Rate limit errors

1. Wait 15 minutes
2. Or adjust `RATE_LIMIT_MAX_REQUESTS` in `.env`

## Support

For issues or questions:
- Email: aryandutta49142@gmail.com
- GitHub: [@Aryan6000](https://github.com/Aryan6000)

## License

MIT License - feel free to use this for your own portfolio!
