const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Email transporter configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Validation rules
const contactValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters'),
];

// POST /api/contact - Send contact form
router.post('/', contactValidation, async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array() 
            });
        }

        const { name, email, message } = req.body;

        // Create email content
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `Portfolio Contact: Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #6366f1;">New Contact Form Submission</h2>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #6366f1;">
                        <h3 style="margin-top: 0;">Message:</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
                    <p style="color: #64748b; font-size: 12px;">
                        This email was sent from your portfolio contact form.
                    </p>
                </div>
            `,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Submitted: ${new Date().toLocaleString()}

Message:
${message}

---
This email was sent from your portfolio contact form.
            `
        };

        // Send email
        const transporter = createTransporter();
        await transporter.sendMail(mailOptions);

        // Save message to database
        try {
            const fs = require('fs').promises;
            const path = require('path');
            const messagesPath = path.join(__dirname, '../data/messages.json');
            
            let messages = [];
            try {
                const data = await fs.readFile(messagesPath, 'utf8');
                messages = JSON.parse(data);
            } catch {
                // File doesn't exist, start with empty array
            }
            
            messages.push({
                id: Date.now(),
                type: 'contact',
                name,
                email,
                message,
                date: new Date().toISOString(),
                read: false
            });
            
            await fs.writeFile(messagesPath, JSON.stringify(messages, null, 2));
        } catch (saveError) {
            console.error('Error saving message:', saveError);
            // Don't fail the request if saving fails
        }

        res.json({ 
            success: true,
            message: 'Your message has been sent successfully! I\'ll get back to you soon.' 
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to send message. Please try again later.' 
        });
    }
});

module.exports = router;
