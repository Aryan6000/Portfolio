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

// File upload preview
const fileInput = document.getElementById('attachments');
const fileList = document.getElementById('fileList');

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
        alert('Maximum 5 files allowed');
        fileInput.value = '';
        fileList.innerHTML = '';
        return;
    }
    
    fileList.innerHTML = '';
    
    files.forEach((file, index) => {
        const fileSize = (file.size / 1024 / 1024).toFixed(2);
        
        if (file.size > 5 * 1024 * 1024) {
            alert(`File "${file.name}" is too large. Maximum size is 5MB.`);
            fileInput.value = '';
            fileList.innerHTML = '';
            return;
        }
        
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span class="file-name">📄 ${file.name}</span>
            <span class="file-size">${fileSize} MB</span>
            <button type="button" class="remove-file" data-index="${index}">✕</button>
        `;
        fileList.appendChild(fileItem);
    });
    
    // Add remove file functionality
    document.querySelectorAll('.remove-file').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            const dt = new DataTransfer();
            const files = Array.from(fileInput.files);
            
            files.forEach((file, i) => {
                if (i !== index) dt.items.add(file);
            });
            
            fileInput.files = dt.files;
            fileInput.dispatchEvent(new Event('change'));
        });
    });
});

// Form Submission with Backend API
const hireForm = document.getElementById('hireForm');

// IMPORTANT: Replace this URL with your deployed backend URL
const API_URL = 'http://localhost:3000'; // Change this after deployment

hireForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = hireForm.querySelector('.submit-btn');
    const originalHTML = submitBtn.innerHTML;
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="animation: spin 1s linear infinite;">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
        </svg>
        Submitting...
    `;
    
    try {
        // Create FormData object
        const formData = new FormData(hireForm);
        
        // Send to backend API
        const response = await fetch(`${API_URL}/api/hire`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Success
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Submitted Successfully!
            `;
            submitBtn.style.background = '#10b981';
            
            alert(result.message);
            
            // Reset form after delay
            setTimeout(() => {
                hireForm.reset();
                fileList.innerHTML = '';
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            // Error from backend
            throw new Error(result.error || 'Submission failed');
        }
        
    } catch (error) {
        console.error('Submission error:', error);
        
        submitBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
            Failed
        `;
        submitBtn.style.background = '#ef4444';
        
        alert(`Error: ${error.message}\n\nPlease check:\n1. Backend server is running\n2. API_URL in hire-me.js is correct\n3. All required fields are filled`);
        
        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    }
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

// Add CSS for spinning animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
