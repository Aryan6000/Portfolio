// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Form Submission
const hireForm = document.getElementById('hireForm');

hireForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(hireForm);
    
    // Build email content
    const emailSubject = `New Project Request: ${formData.get('projectTitle')}`;
    
    const emailBody = `
NEW PROJECT REQUEST
==================

PERSONAL INFORMATION:
--------------------
Name: ${formData.get('fullName')}
Email: ${formData.get('email')}
Phone: ${formData.get('phone') || 'Not provided'}
Company: ${formData.get('company') || 'Not provided'}

PROJECT DETAILS:
---------------
Project Title: ${formData.get('projectTitle')}
Project Type: ${formData.get('projectType')}
Budget Range: ${formData.get('budget')}
Timeline: ${formData.get('timeline')}

Description:
${formData.get('description')}

ADDITIONAL INFORMATION:
----------------------
Specific Requirements:
${formData.get('requirements') || 'None provided'}

Reference Links:
${formData.get('reference') || 'None provided'}

==================
Submitted on: ${new Date().toLocaleString()}
    `.trim();
    
    // Create mailto link
    const mailtoLink = `mailto:aryandutta49142@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    const submitBtn = hireForm.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        Email Client Opened!
    `;
    submitBtn.style.background = '#10b981';
    submitBtn.disabled = true;
    
    // Show additional instructions
    setTimeout(() => {
        alert('Your email client has been opened with the project details. Please:\n\n1. Review the information\n2. Attach any relevant files (mockups, documents, etc.)\n3. Click Send to submit your request\n\nI\'ll get back to you within 24 hours!');
        
        // Reset form after a delay
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            hireForm.reset();
        }, 3000);
    }, 500);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
