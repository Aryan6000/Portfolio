// Project data
const projectsData = {
    1: {
        title: "E-Commerce Platform",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
        description: "Modern shopping experience with React that increased conversion rates by 45%",
        fullDescription: "A comprehensive e-commerce platform built with React that provides a seamless shopping experience. This platform features a modern UI, secure payment integration, real-time inventory management, and an intuitive admin dashboard. The project was designed from the ground up to handle high traffic while maintaining excellent performance.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API", "Redux", "Material-UI"],
        results: [
            "45% increase in conversion rates",
            "60% improvement in page load time",
            "15K+ active users within 3 months",
            "4.8/5 average customer rating"
        ],
        details: "The platform includes features like real-time notifications, user authentication with JWT, product reviews and ratings, wishlist functionality, and a comprehensive admin dashboard for inventory management. The project was completed on schedule and exceeded all performance metrics. I've developed three unique e-commerce solutions showcasing different design philosophies and features.",
        projectInfo: {
            type: "Web Application",
            duration: "2-3 weeks per project",
            role: "Full Stack Developer",
            status: "Live & Maintained"
        },
        isEcommerce: true,
        projects: [
            {
                name: "VIBE - Clothing Store",
                path: "https://aryan6000.github.io/Clothing-website/",
                description: "Modern streetwear e-commerce platform with trendy UI, smooth animations, and responsive design optimized for mobile shopping"
            },
            {
                name: "LUXE - Premium Store",
                path: "https://aryan6000.github.io/Normal-Ecomerce-website/",
                description: "Multi-category premium shopping platform with advanced filtering, search functionality, and elegant product showcase"
            },
            {
                name: "SneakPeak - Sneaker Hub",
                path: "https://aryan6000.github.io/Sneaker-website/",
                description: "Specialized sneaker marketplace featuring exclusive collections, detailed product views, and premium shopping experience"
            }
        ]
    },
    2: {
        title: "Analytics Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
        description: "Real-time data visualization with interactive charts and comprehensive business insights",
        fullDescription: "This analytics dashboard was developed to provide businesses with actionable insights into their operations. It features real-time data updates, interactive charts using Chart.js and D3.js, customizable widgets, and export capabilities. The dashboard is fully responsive and supports multiple data sources through RESTful APIs.",
        technologies: ["React", "Chart.js", "D3.js", "Redux", "Axios", "Material-UI", "WebSocket"],
        results: [
            "Real-time data updates every 5 seconds",
            "40% reduction in analysis time",
            "Custom report generation in PDF/Excel",
            "Multi-user access with role-based permissions"
        ],
        details: "The dashboard integrates with multiple data sources and provides executives with a comprehensive view of business metrics. Users can create custom reports, set alerts for critical metrics, collaborate with team members, and access historical data trends. The interface is intuitive and requires minimal training.",
        projectInfo: {
            type: "Web Application",
            duration: "1-2 weeks",
            role: "Frontend Developer",
            status: "Completed"
        }
    },
    3: {
        title: "Corporate Website",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200",
        description: "Professional landing page that boosted client inquiries by 60%",
        fullDescription: "This corporate website was designed to establish a strong online presence and drive business inquiries. It includes a professional design, comprehensive SEO optimization, fast loading times, and strategic placement of call-to-action buttons. The website effectively showcases the company's services, team, portfolio, and client testimonials.",
        technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "PHP", "SEO Tools", "Google Analytics"],
        results: [
            "60% increase in client inquiries",
            "2.3s average page load time",
            "Mobile conversion rate: 8.5%",
            "#1 Google ranking for key services"
        ],
        details: "The website includes a blog section for content marketing, integrated contact forms with email notifications, client testimonials carousel, service showcase with detailed descriptions, and an optimized portfolio gallery. All pages are fully responsive, accessible, and optimized for search engines with proper meta tags and structured data.",
        projectInfo: {
            type: "Corporate Website",
            duration: "1 week",
            role: "Web Developer",
            status: "Live & Maintained"
        }
    }
};

// Get project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Load project details
function loadProjectDetails() {
    const project = projectsData[projectId];
    
    if (!project) {
        document.querySelector('.project-details-page').innerHTML = 
            '<div style="text-align: center; padding: 100px 20px;"><h2>Project not found</h2><a href="index.html#projects" class="btn btn-primary">Back to Projects</a></div>';
        return;
    }

    // Set project image
    document.getElementById('projectImage').src = project.image;
    document.getElementById('projectImage').alt = project.title;
    
    // Set project title and description
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectDescription').textContent = project.description;
    
    // Set full description
    document.getElementById('projectFullDescription').textContent = project.fullDescription;
    
    // Set project details
    document.getElementById('projectDetails').textContent = project.details;
    
    // Set project tags
    const tagsHTML = project.technologies
        .map(tech => `<span class="project-tag">${tech}</span>`)
        .join('');
    document.getElementById('projectTags').innerHTML = tagsHTML;
    
    // Set project info sidebar
    const infoHTML = Object.entries(project.projectInfo)
        .map(([key, value]) => `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`)
        .join('');
    document.getElementById('projectInfo').innerHTML = infoHTML;
    
    // Set technologies list
    const techHTML = project.technologies
        .map(tech => `<li>${tech}</li>`)
        .join('');
    document.getElementById('technologiesList').innerHTML = techHTML;
    
    // Set results list
    const resultsHTML = project.results
        .map(result => `<li>${result}</li>`)
        .join('');
    document.getElementById('resultsList').innerHTML = resultsHTML;
    
    // Display ecommerce projects if this is the ecommerce platform
    if (project.isEcommerce && project.projects) {
        displayEcommerceProjects(project.projects);
    }
    
    // Update page title
    document.title = `${project.title} - Aryan Dutta`;
}

// Display ecommerce projects
function displayEcommerceProjects(projects) {
    const ecommerceSection = document.getElementById('ecommerceProjects');
    const ecommerceGrid = ecommerceSection.querySelector('.ecommerce-grid');
    
    ecommerceSection.style.display = 'block';
    
    ecommerceGrid.innerHTML = projects.map(project => `
        <div class="ecommerce-card">
            <h4>${project.name}</h4>
            <p>${project.description}</p>
            <a href="${project.path}" target="_blank" rel="noopener noreferrer" class="ecommerce-card-btn">
                View Live Site
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5c-1.11 0-2 .89-2 2v14c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-7h-2v7z"/>
                </svg>
            </a>
        </div>
    `).join('');
}

// Load project details when page loads
document.addEventListener('DOMContentLoaded', loadProjectDetails);
