const Skills = ({ handleSkillCardMouseMove }) => {
    return (
        <section id="skills" className="section section-dark">
            <h2 className="section-title">What I Bring To The Table</h2>
            <p className="section-subtitle">Cutting-edge technologies for modern web solutions</p>
            <div className="skills-grid">
                <div className="skill-card" onMouseMove={handleSkillCardMouseMove}>
                    <span className="skill-icon">⚛️</span>
                    <h3>React Development</h3>
                    <p>Building blazing-fast, interactive user interfaces with React. Component-based architecture for scalable applications.</p>
                    <div className="skill-tags">
                        <span className="skill-tag">React</span>
                        <span className="skill-tag">Hooks</span>
                        <span className="skill-tag">State Management</span>
                    </div>
                </div>
                <div className="skill-card" onMouseMove={handleSkillCardMouseMove}>
                    <span className="skill-icon">🎨</span>
                    <h3>Modern UI/UX</h3>
                    <p>Pixel-perfect designs that convert visitors into customers. Responsive, accessible, and beautiful across all devices.</p>
                    <div className="skill-tags">
                        <span className="skill-tag">CSS3</span>
                        <span className="skill-tag">Animations</span>
                        <span className="skill-tag">Responsive</span>
                    </div>
                </div>
                <div className="skill-card" onMouseMove={handleSkillCardMouseMove}>
                    <span className="skill-icon">⚡</span>
                    <h3>Performance Optimization</h3>
                    <p>Lightning-fast load times and smooth interactions. Every millisecond counts for user experience and SEO.</p>
                    <div className="skill-tags">
                        <span className="skill-tag">JavaScript</span>
                        <span className="skill-tag">ES6+</span>
                        <span className="skill-tag">Optimization</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
