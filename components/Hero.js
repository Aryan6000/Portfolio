const Hero = ({ vantaRef, onSmoothScroll }) => {
    return (
        <section id="home" className="hero" ref={vantaRef}>
            <div className="hero-content">
                <div className="hero-subtitle">Frontend Developer & React Specialist</div>
                <h1>Aryan Dutta</h1>
                <p className="hero-tagline">Crafting Digital Experiences That Convert</p>
                <div className="cta-container">
                    <a href="#contact" className="cta-button" onClick={(e) => onSmoothScroll(e, '#contact')}>Start Your Project</a>
                    <a href="#projects" className="cta-button cta-secondary" onClick={(e) => onSmoothScroll(e, '#projects')}>View My Work</a>
                </div>
            </div>
        </section>
    );
}
