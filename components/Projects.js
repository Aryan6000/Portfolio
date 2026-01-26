const Projects = ({ onProjectCardClick }) => {
    return (
        <section id="projects" className="section">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">Real results for real clients</p>
            <div className="projects-grid">
                <div className="project-card" style={{ cursor: 'pointer' }} onClick={() => onProjectCardClick(1)}>
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" alt="Project 1" className="project-image" />
                    <div className="project-content">
                        <h3 className="project-title">E-Commerce Platform</h3>
                        <p className="project-desc">Modern shopping experience with React. Increased conversion rates by 45%.</p>
                        <div className="skill-tags">
                            <span className="skill-tag">React</span>
                            <span className="skill-tag">API Integration</span>
                        </div>
                    </div>
                </div>
                <div className="project-card" style={{ cursor: 'pointer' }} onClick={() => onProjectCardClick(2)}>
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800" alt="Project 2" className="project-image" />
                    <div className="project-content">
                        <h3 className="project-title">Analytics Dashboard</h3>
                        <p className="project-desc">Real-time data visualization with interactive charts and insights.</p>
                        <div className="skill-tags">
                            <span className="skill-tag">React</span>
                            <span className="skill-tag">Charts</span>
                        </div>
                    </div>
                </div>
                <div className="project-card" style={{ cursor: 'pointer' }} onClick={() => onProjectCardClick(3)}>
                    <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800" alt="Project 3" className="project-image" />
                    <div className="project-content">
                        <h3 className="project-title">Corporate Website</h3>
                        <p className="project-desc">Professional landing page that boosted client inquiries by 60%.</p>
                        <div className="skill-tags">
                            <span className="skill-tag">HTML/CSS</span>
                            <span className="skill-tag">JS</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
