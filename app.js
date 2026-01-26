const App = () => {
    const [isNavActive, setIsNavActive] = React.useState(false);
    const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
    const [showScrollTop, setShowScrollTop] = React.useState(false);
    const [showFAB, setShowFAB] = React.useState(false);
    const [theme, setTheme] = React.useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    const testimonials = [
        {
            text: "Aryan delivered beyond expectations. Our website now loads faster and looks stunning. Sales increased by 50% in the first month!",
            author: "— Sarah Johnson, CEO TechStart",
        },
        {
            text: "Professional, fast, and exactly what we needed. The React dashboard he built saves us hours every day.",
            author: "— Michael Chen, Product Manager",
        },
        {
            text: "Best investment we made. The UI is gorgeous and our users love it. Highly recommend!",
            author: "— Emily Rodriguez, Founder StartupX",
        },
    ];

    React.useEffect(() => {
        // Set theme on mount
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    React.useEffect(() => {
        // Close menu when clicking outside
        const handleClickOutside = (e) => {
            if (isNavActive && !e.target.closest('.nav-container')) {
                setIsNavActive(false);
            }
        };
        
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isNavActive]);
    
    React.useEffect(() => {
        // --- Navbar Scroll Effect ---
        const handleScroll = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            
            // Show/hide scroll to top button and FAB
            setShowScrollTop(window.scrollY > 500);
            setShowFAB(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);

        // --- Testimonial Slider with Touch Support ---
        const testimonialInterval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 5000);
        
        // Touch swipe for testimonials
        let touchStartX = 0;
        let touchEndX = 0;
        
        const handleTouchStart = (e) => {
            touchStartX = e.changedTouches[0].screenX;
        };
        
        const handleTouchEnd = (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        };
        
        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) {
                // Swipe left - next testimonial
                setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right - previous testimonial
                setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
            }
        };
        
        const testimonialSlider = document.querySelector('.testimonial-slider');
        if (testimonialSlider) {
            testimonialSlider.addEventListener('touchstart', handleTouchStart);
            testimonialSlider.addEventListener('touchend', handleTouchEnd);
        }

        // --- Intersection Observer for Animations ---
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-card, .project-card, .stat-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s, transform 0.8s';
            observer.observe(el);
        });
        
        // Handle mobile menu close button click
        const handleMenuClose = (e) => {
            const navLinks = document.querySelector('.nav-links');
            if (!navLinks || !navLinks.classList.contains('active')) return;
            
            const rect = navLinks.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            // Check if click is in top-right area (where X button is)
            if (clickX > rect.width - 80 && clickY < 80) {
                setIsNavActive(false);
                document.querySelector('.nav-toggle')?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        };
        
        document.addEventListener('click', handleMenuClose);
        
        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(testimonialInterval);
            if (testimonialSlider) {
                testimonialSlider.removeEventListener('touchstart', handleTouchStart);
                testimonialSlider.removeEventListener('touchend', handleTouchEnd);
            }
            observer.disconnect();
            document.removeEventListener('click', handleMenuClose);
        };
    }, [theme, isNavActive]);

    const handleProjectCardClick = (projectId) => {
        window.location.href = `project-details.html?id=${projectId}`;
    };

    const handleContactCardClick = (cardType) => {
        switch (cardType) {
            case 'email':
                window.location.href = 'mailto:aryandutta49142@gmail.com';
                break;
            case 'instagram':
                window.open('https://www.instagram.com/itz.aryan6000/', '_blank');
                break;
            case 'linkedin':
                window.open('https://www.linkedin.com/in/aryan-dutta-24828132a/', '_blank');
                break;
            case 'github':
                window.open('https://github.com/Aryan6000', '_blank');
                break;
        }
    };

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsNavActive(false); // Close mobile nav on click
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const subject = `New Project Inquiry from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        window.location.href = `mailto:aryandutta49142@gmail.com?subject=${subject}&body=${body}`;
        
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Email Opened!';
        submitBtn.style.background = '#28a745';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '#0a0a0a';
            e.target.reset();
        }, 3000);
    };

    const handleSkillCardMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    };
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <div>
            <nav className="navbar">
                <div className="nav-container">
                    <a href="#home" className="nav-brand" onClick={(e) => handleSmoothScroll(e, '#home')}>
                        <img src="DIJX9665.JPG" alt="Aryan Dutta" className="profile-pic" />
                        <span>Aryan</span>
                    </a>
                    <ul className={`nav-links ${isNavActive ? 'active' : ''}`}>
                        <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a></li>
                        <li><a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')}>Skills</a></li>
                        <li><a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')}>Projects</a></li>
                        <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a></li>
                        <li><a href="#contact" className="cta-button" onClick={(e) => handleSmoothScroll(e, '#contact')}>Hire Me</a></li>
                    </ul>
                    <button 
                        className={`nav-toggle ${isNavActive ? 'active' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Toggle clicked, current state:', isNavActive);
                            setIsNavActive(!isNavActive);
                        }}
                        aria-label="Toggle navigation"
                        aria-expanded={isNavActive}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            <section id="home" className="hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <span className="hero-badge">👋 Welcome to my portfolio</span>
                        <h1>Hi, I'm <span className="highlight">Aryan Dutta</span></h1>
                        <p className="hero-tagline">Frontend Developer & React Specialist crafting beautiful, high-performance web applications that users love.</p>
                        <div className="hero-buttons">
                            <a href="#contact" className="btn btn-primary" onClick={(e) => handleSmoothScroll(e, '#contact')}>Get In Touch</a>
                            <a href="#projects" className="btn btn-secondary" onClick={(e) => handleSmoothScroll(e, '#projects')}>View Projects</a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="DIJX9665.JPG" alt="Aryan Dutta" />
                    </div>
                </div>
            </section>

            <div className="stats-bar">
                <div className="stats-container">
                    <div className="stat-item">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">100%</div>
                        <div className="stat-label">Client Satisfaction</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">3+</div>
                        <div className="stat-label">Years Experience</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Support Available</div>
                    </div>
                </div>
            </div>

            <section id="skills" className="section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">💼 My Expertise</span>
                        <h2 className="section-title">What I Bring To The Table</h2>
                        <p className="section-subtitle">Cutting-edge technologies and modern development practices for building exceptional web experiences</p>
                    </div>
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
                </div>
            </section>

            <section id="projects" className="section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">🚀 Portfolio</span>
                        <h2 className="section-title">Featured Projects</h2>
                        <p className="section-subtitle">A selection of my recent work showcasing real results for real clients</p>
                    </div>
                    <div className="projects-grid">
                    <div className="project-card" style={{cursor: 'pointer'}} onClick={() => handleProjectCardClick(1)}>
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
                    <div className="project-card" style={{cursor: 'pointer'}} onClick={() => handleProjectCardClick(2)}>
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
                    <div className="project-card" style={{cursor: 'pointer'}} onClick={() => handleProjectCardClick(3)}>
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
                </div>
            </section>

            <section className="testimonials section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">💬 Testimonials</span>
                        <h2 className="section-title">Client Success Stories</h2>
                        <p className="section-subtitle">Don't just take my word for it - hear from satisfied clients</p>
                    </div>
                    <div className="testimonial-slider">
                    {testimonials.map((testimonial, index) => (
                         <div className={`testimonial-item ${index === currentTestimonial ? 'active' : ''}`} key={index}>
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <p className="testimonial-author">{testimonial.author}</p>
                        </div>
                    ))}
                </div>
                <div className="testimonial-dots">
                    {testimonials.map((_, index) => (
                        <span 
                            className={`dot ${index === currentTestimonial ? 'active' : ''}`} 
                            key={index} 
                            onClick={() => setCurrentTestimonial(index)}
                        ></span>
                    ))}
                </div>
                </div>
            </section>

            <section id="contact-info" className="contact-info-section section">
                <div className="section-container">
                    <div className="section-header">
                        <span className="section-badge">📬 Get In Touch</span>
                        <h2 className="section-title">Let's Connect</h2>
                        <p className="section-subtitle">Feel free to reach out through any of these channels</p>
                    </div>
                    <div className="contact-cards">
                    <div className="contact-card" onClick={() => handleContactCardClick('email')}>
                        <div className="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                        </div>
                        <h3>Email</h3>
                    </div>
                    <div className="contact-card" onClick={() => handleContactCardClick('instagram')}>
                        <div className="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                        </div>
                        <h3>Instagram</h3>
                    </div>
                    <div className="contact-card" onClick={() => handleContactCardClick('github')}>
                        <div className="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </div>
                        <h3>Github</h3>
                    </div>
                    <div className="contact-card" onClick={() => handleContactCardClick('linkedin')}>
                        <div className="contact-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </div>
                        <h3>LinkedIn</h3>
                    </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="section">
                <div className="section-container">
                    <div className="cta-section">
                        <h2>Ready To Start Your Project?</h2>
                        <p>Let's discuss your ideas and create something amazing together. I'm here to help bring your vision to life.</p>
                        <form className="contact-form" id="contactForm" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <input type="text" name="name" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                        <textarea name="message" rows="5" placeholder="Tell me about your project..." required></textarea>
                    </div>
                        <button type="submit" className="submit-btn">Send Message</button>
                    </form>
                    </div>
                </div>
            </section>

            <footer>
                <div className="footer-container">
                    <div className="social-links">
                    <a href="https://github.com/Aryan6000" className="social-link" title="GitHub" target="_blank" rel="noopener noreferrer">
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/aryan-dutta-24828132a/" className="social-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://x.com/Aryandutta600" className="social-link" title="X (Twitter)" target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/itz.aryan6000/" className="social-link" title="Instagram" target="_blank" rel="noopener noreferrer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    </div>
                    <p>&copy; 2026 Aryan Dutta. All rights reserved.</p>
                </div>
            </footer>
            
            {showScrollTop && (
                <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                    </svg>
                </button>
            )}
            
            {showFAB && (
                <a href="#contact" className="fab-button" onClick={(e) => handleSmoothScroll(e, '#contact')} aria-label="Hire Me">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>Hire Me</span>
                </a>
            )}
            
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                <svg className="moon-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
                <svg className="sun-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                </svg>
            </button>
        </div>
    );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
