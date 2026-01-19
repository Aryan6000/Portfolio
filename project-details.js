const { projectsData } = require("./projectsData");

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
