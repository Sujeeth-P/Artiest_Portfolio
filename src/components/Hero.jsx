import { useEffect, useRef, useState } from 'react';

const Hero = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Slideshow images from todol folder
    const slides = [
        '/assets/todol/Hero2.jpg',
        '/assets/todol/download.jpg',
        '/assets/todol/download (1).jpg',
        '/assets/todol/download (2).jpg',
        '/assets/todol/download (3).jpg'
    ];

    // Auto-advance slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                setTimeout(() => setIsTransitioning(false), 1200);
            }, 600);
        }, 6000); // Change slide every 6 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    useEffect(() => {
        // Parallax effect on scroll
        const handleScroll = () => {
            if (!heroRef.current) return;
            const scrollY = window.scrollY;
            const heroHeight = heroRef.current.offsetHeight;

            if (scrollY < heroHeight) {
                const translateY = scrollY * 0.3;
                const opacity = 1 - (scrollY / heroHeight) * 0.5;

                if (contentRef.current) {
                    contentRef.current.style.transform = `translateY(${translateY}px)`;
                    contentRef.current.style.opacity = opacity;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const target = document.querySelector(sectionId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={heroRef}
            className="hero-section"
            id="home"
        >
            {/* Background Slideshow with Ink Reveal */}
            <div className="hero-background">
                {/* Ink reveal mask overlay */}
                <div className={`hero-ink-mask ${isTransitioning ? 'active' : ''}`}>
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle className="ink-circle ink-circle-1" cx="50" cy="50" r="0" />
                        <circle className="ink-circle ink-circle-2" cx="30" cy="70" r="0" />
                        <circle className="ink-circle ink-circle-3" cx="70" cy="30" r="0" />
                        <circle className="ink-circle ink-circle-4" cx="20" cy="20" r="0" />
                        <circle className="ink-circle ink-circle-5" cx="80" cy="80" r="0" />
                    </svg>
                </div>

                {/* Slideshow images */}
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide}
                        alt={`Artwork showcase ${index + 1}`}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''} ${index === (currentSlide - 1 + slides.length) % slides.length ? 'prev' : ''
                            }`}
                    />
                ))}

                {/* Gradient Overlays for text readability */}
                <div className="hero-overlay hero-overlay-left" />
                <div className="hero-overlay hero-overlay-bottom" />
                <div className="hero-vignette" />
            </div>

            {/* Slide indicators */}
            <div className="hero-slide-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => {
                            if (index !== currentSlide) {
                                setIsTransitioning(true);
                                setTimeout(() => {
                                    setCurrentSlide(index);
                                    setTimeout(() => setIsTransitioning(false), 1200);
                                }, 600);
                            }
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Content */}
            <div ref={contentRef} className="hero-content">
                <div className="hero-text-container">
                    <span className="hero-subtitle">
                        <span className="hero-subtitle-line"></span>
                        Digital Artist & Illustrator
                        <span className="hero-subtitle-line"></span>
                    </span>

                    <h1 className="hero-title">
                        <span className="hero-title-line">Where Stories</span>
                        <span className="hero-title-line hero-title-accent">Come to Life</span>
                    </h1>

                    <p className="hero-description">
                        Creating immersive worlds and captivating characters through
                        digital art. Every piece tells a story waiting to be discovered.
                    </p>

                    <div className="hero-cta-group">
                        <a
                            href="#portfolio"
                            onClick={(e) => scrollToSection(e, '#portfolio')}
                            className="hero-cta hero-cta-primary"
                        >
                            <span>Explore My Art</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="hero-cta hero-cta-secondary"
                        >
                            <span>Commission Work</span>
                        </a>
                    </div>
                </div>

                {/* Floating Stats */}
                <div className="hero-stats">
                    {[
                        { number: '150+', label: 'Artworks' },
                        { number: '80+', label: 'Clients' },
                        { number: '8+', label: 'Years' }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="hero-stat"
                            style={{ animationDelay: `${1.2 + index * 0.15}s` }}
                        >
                            <span className="hero-stat-number">{stat.number}</span>
                            <span className="hero-stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-scroll-indicator">
                <div className="hero-scroll-mouse">
                    <div className="hero-scroll-wheel"></div>
                </div>
                <span className="hero-scroll-text">Scroll to explore</span>
            </div>

            {/* Decorative Elements */}
            <div className="hero-decorative">
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>
            </div>
        </section>
    );
};

export default Hero;
