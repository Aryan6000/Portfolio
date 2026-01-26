const Navbar = ({ isNavActive, onNavToggle, onSmoothScroll }) => {
    return (
        <nav className="navbar">
            <div className="nav-brand">
                <img src="DIJX9665.JPG" alt="Aryan Dutta" className="profile-pic" />
                <span className="brand-text">Aryan</span>
            </div>
            <ul className={`nav-links ${isNavActive ? 'active' : ''}`}>
                <li><a href="#home" onClick={(e) => onSmoothScroll(e, '#home')}>Home</a></li>
                <li><a href="#skills" onClick={(e) => onSmoothScroll(e, '#skills')}>Skills</a></li>
                <li><a href="#projects" onClick={(e) => onSmoothScroll(e, '#projects')}>Projects</a></li>
                <li><a href="#contact" onClick={(e) => onSmoothScroll(e, '#contact')}>Contact</a></li>
                <li><a href="#contact" className="cta-button" onClick={(e) => onSmoothScroll(e, '#contact')}>Hire Me</a></li>
            </ul>
            <div className="nav-toggle" onClick={onNavToggle}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    );
}
