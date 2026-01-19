// Project data
const projectsData = {
    1: {
        title: "E-Commerce Platform",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        description: "A comprehensive e-commerce platform built with React that provides a seamless shopping experience. This platform features a modern UI, secure payment integration, and real-time inventory management.",
        fullDescription: "This e-commerce platform was designed from the ground up to provide an exceptional shopping experience. I have developed three unique e-commerce solutions showcasing different design philosophies and features.",
        technologies: ["HTML", "CSS", "JS", "React", "Node", "Express", "MongoDB"],
        results: [
            "45% increase in conversion rates",
            "60% improvement in page load time",
            "15K+ active users within 3 months",
            "4.8/5 customer rating"
        ],
        details: "The platform was built to handle high traffic and includes features like real-time notifications, user authentication, product reviews, and admin dashboard for inventory management. The project was completed on schedule and exceeded all performance metrics.",
        isEcommerce: true,
        projects: [
            {
                name: "VIBE - Clothing Store",
                path: "https://aryan6000.github.io/Clothing-website/",
                description: "Modern streetwear e-commerce platform with trendy UI and responsive design"
            },
            {
                name: "LUXE - Premium Store",
                path: "../Ecomerce-websites/Normal website/index.html",
                description: "Multi-category premium shopping platform with advanced filtering and search"
            },
            {
                name: "SneakPeak - Sneaker Hub",
                path: "../Ecomerce-websites/Sneaker Website/index.html",
                description: "Specialized sneaker marketplace with exclusive collections and premium features"
            }
        ]
    },
    2: {
        title: "Analytics Dashboard",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        description: "Real-time analytics dashboard with interactive charts and comprehensive data visualization for business insights. Displays KPIs, trends, and actionable metrics in an intuitive interface.",
        fullDescription: "This analytics dashboard was developed to provide businesses with actionable insights into their operations. It features real-time data updates, interactive charts using Chart.js, customizable widgets, and export capabilities. The dashboard is fully responsive and supports multiple data sources.",
        technologies: ["React", "Chart.js", "Redux", "Axios", "Material-UI"],
        results: [
            "Real-time data updates",
            "40% reduction in analysis time",
            "Custom report generation",
            "Multi-user access control"
        ],
        details: "The dashboard integrates with multiple data sources and provides executives with a comprehensive view of business metrics. Users can create custom reports, set alerts for critical metrics, and collaborate with team members."
    },
    3: {
        title: "Corporate Website",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
        description: "Professional corporate landing page and website that significantly boosted client inquiries. Features SEO optimization, responsive design, and high-converting call-to-action sections.",
        fullDescription: "This corporate website was designed to establish a strong online presence and drive business inquiries. It includes a professional design, SEO optimization, fast loading times, and strategic placement of call-to-action buttons. The website showcases the company's services, team, and client testimonials effectively.",
        technologies: ["HTML5", "CSS3", "JavaScript", "WordPress", "SEO optimization"],
        results: [
            "60% increase in client inquiries",
            "2.3s average page load time",
            "Mobile conversion rate: 8.5%",
            "#1 ranking for key services"
        ],
        details: "The website includes a blog section for content marketing, integrated contact forms, client testimonials carousel, and an optimized service showcase section. All pages are fully responsive and optimized for search engines."
    }
};

// Get project ID from URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');

// Load project details
function loadProjectDetails() {
    const project = projectsData[projectId];
    
    if (!project) {
        document.querySelector('.project-details-container').innerHTML = 
            '<p style="color: white; text-align: center; margin-top: 100px;">Project not found</p>';
        return;
    }

    // Set project image
    document.getElementById('projectImage').src = project.image;
    
    // Set project title
    document.getElementById('projectTitle').textContent = project.title;
    
    // Set full description
    document.getElementById('projectFullDescription').textContent = project.fullDescription;
    
    // Set project details
    document.getElementById('projectDetails').innerHTML = `
        <p><strong>Project Overview:</strong></p>
        <p>${project.details}</p>
    `;
    
    // Set project tags
    const tagsHTML = project.technologies
        .map(tech => `<span class="skill-tag">${tech}</span>`)
        .join('');
    document.getElementById('projectTags').innerHTML = tagsHTML;
    
    // Set project info sidebar
    const infoHTML = `
        <li><strong>Type:</strong> Web Application</li>
        <li><strong>Duration:</strong> 1-2 weeks</li>
        <li><strong>Team Size:</strong> 1 Developer</li>
        <li><strong>Status:</strong> Completed</li>
    `;
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
    
    // Display ecommerce projects if this is the ecommerce platform card
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
            <div class="ecommerce-card-content">
                <h4>${project.name}</h4>
                <p>${project.description}</p>
                <a href="${project.path}" target="_blank" class="ecommerce-card-btn">
                    View Project →
                </a>
            </div>
        </div>
    `).join('');
}

// Load project details when page loads
document.addEventListener('DOMContentLoaded', loadProjectDetails);
