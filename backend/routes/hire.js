const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
        files: 5 // Maximum 5 files
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || [
            'image/jpeg',
            'image/png',
            'image/gif',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Allowed types: JPG, PNG, GIF, PDF, DOC, DOCX'));
        }
    }
});

// Email transporter configuration
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Validation rules
const hireValidation = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),
    body('phone')
        .optional({ checkFalsy: true })
        .trim()
        .matches(/^[\d\s\-\+\(\)]+$/).withMessage('Please provide a valid phone number'),
    body('company')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 100 }).withMessage('Company name must be less than 100 characters'),
    body('projectTitle')
        .trim()
        .notEmpty().withMessage('Project title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Project title must be between 3 and 200 characters'),
    body('projectType')
        .trim()
        .notEmpty().withMessage('Project type is required'),
    body('budget')
        .trim()
        .notEmpty().withMessage('Budget range is required'),
    body('timeline')
        .trim()
        .notEmpty().withMessage('Timeline is required'),
    body('description')
        .trim()
        .notEmpty().withMessage('Project description is required')
        .isLength({ min: 20, max: 2000 }).withMessage('Description must be between 20 and 2000 characters'),
    body('requirements')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 2000 }).withMessage('Requirements must be less than 2000 characters'),
    body('reference')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 1000 }).withMessage('Reference links must be less than 1000 characters'),
];

// POST /api/hire - Submit hire request with attachments
router.post('/', upload.array('attachments', 5), hireValidation, async (req, res) => {
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array() 
            });
        }

        const {
            fullName,
            email,
            phone,
            company,
            projectTitle,
            projectType,
            budget,
            timeline,
            description,
            requirements,
            reference
        } = req.body;

        // Prepare attachments
        const attachments = req.files ? req.files.map(file => ({
            filename: file.originalname,
            content: file.buffer,
            contentType: file.mimetype
        })) : [];

        // Create email content
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `🚀 New Project Request: ${projectTitle}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background-color: #f8fafc; padding: 20px;">
                    <div style="background-color: #6366f1; color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px;">🚀 New Project Request</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">${projectTitle}</p>
                    </div>
                    
                    <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px;">
                        <h2 style="color: #6366f1; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Personal Information</h2>
                        <table style="width: 100%; margin-bottom: 20px;">
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; width: 150px;"><strong>Name:</strong></td>
                                <td style="padding: 8px 0;">${fullName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
                            </tr>
                            ${phone ? `
                            <tr>
                                <td style="padding: 8px 0; color: #64748b;"><strong>Phone:</strong></td>
                                <td style="padding: 8px 0;">${phone}</td>
                            </tr>
                            ` : ''}
                            ${company ? `
                            <tr>
                                <td style="padding: 8px 0; color: #64748b;"><strong>Company:</strong></td>
                                <td style="padding: 8px 0;">${company}</td>
                            </tr>
                            ` : ''}
                        </table>

                        <h2 style="color: #6366f1; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 30px;">Project Details</h2>
                        <table style="width: 100%; margin-bottom: 20px;">
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; width: 150px;"><strong>Project Type:</strong></td>
                                <td style="padding: 8px 0;">${projectType}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b;"><strong>Budget:</strong></td>
                                <td style="padding: 8px 0;">${budget}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b;"><strong>Timeline:</strong></td>
                                <td style="padding: 8px 0;">${timeline}</td>
                            </tr>
                        </table>

                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #0f172a;">Description:</h3>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: #334155;">${description}</p>
                        </div>

                        ${requirements ? `
                        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #0f172a;">Specific Requirements:</h3>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: #334155;">${requirements}</p>
                        </div>
                        ` : ''}

                        ${reference ? `
                        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #0f172a;">Reference Links:</h3>
                            <p style="white-space: pre-wrap; line-height: 1.6; color: #334155;">${reference}</p>
                        </div>
                        ` : ''}

                        ${attachments.length > 0 ? `
                        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #0f172a;">📎 Attachments (${attachments.length}):</h3>
                            <ul style="margin: 0; padding-left: 20px;">
                                ${attachments.map(att => `<li>${att.filename}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}

                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
                        
                        <p style="color: #64748b; font-size: 12px; text-align: center; margin: 0;">
                            Submitted on ${new Date().toLocaleString()}<br>
                            This email was sent from your portfolio hire form.
                        </p>
                    </div>
                </div>
            `,
            text: `
NEW PROJECT REQUEST
==================

PROJECT: ${projectTitle}

PERSONAL INFORMATION:
--------------------
Name: ${fullName}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}

PROJECT DETAILS:
---------------
Project Type: ${projectType}
Budget: ${budget}
Timeline: ${timeline}

DESCRIPTION:
${description}

${requirements ? `SPECIFIC REQUIREMENTS:\n${requirements}\n` : ''}
${reference ? `REFERENCE LINKS:\n${reference}\n` : ''}

${attachments.length > 0 ? `ATTACHMENTS (${attachments.length}):\n${attachments.map(att => `- ${att.filename}`).join('\n')}` : ''}

==================
Submitted: ${new Date().toLocaleString()}
This email was sent from your portfolio hire form.
            `,
            attachments: attachments
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
                type: 'hire',
                name: fullName,
                email,
                phone,
                company,
                projectTitle,
                projectType,
                budget,
                timeline,
                message: description,
                requirements,
                reference,
                attachments: attachments.map(a => a.filename),
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
            message: 'Your project request has been submitted successfully! I\'ll review it and get back to you within 24 hours.',
            attachmentCount: attachments.length
        });

    } catch (error) {
        console.error('Hire form error:', error);
        
        if (error instanceof multer.MulterError) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ 
                    success: false,
                    error: 'File size too large. Maximum size is 5MB per file.' 
                });
            }
            if (error.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ 
                    success: false,
                    error: 'Too many files. Maximum is 5 files.' 
                });
            }
        }
        
        res.status(500).json({ 
            success: false,
            error: 'Failed to submit project request. Please try again later.' 
        });
    }
});

module.exports = router;
