import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);

            // Update active nav link based on scroll position
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(sectionId);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const target = document.querySelector(sectionId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        setMobileMenuOpen(false);
    };

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#services', label: 'Services' },
        { href: '#client-work', label: 'Client Work' },
        { href: '#about', label: 'About' }
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[1000] py-5 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${scrolled ? 'bg-white/95 backdrop-blur-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] py-[15px]' : ''}`}
        >
            <div className="max-w-[1400px] mx-auto px-10 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#home"
                    onClick={(e) => scrollToSection(e, '#home')}
                    className="flex flex-col"
                >
                    <span className="font-[var(--font-display)] text-[1.8rem] font-semibold text-[#1a1a1a] tracking-[1px]">
                        Elena Ross
                    </span>
                    <span className="text-[0.7rem] font-medium tracking-[3px] uppercase text-gold-500">
                        Fine Art
                    </span>
                </a>

                {/* Navigation Menu */}
                <ul
                    className={`flex gap-10 list-none md:flex
            max-md:absolute max-md:top-full max-md:left-0 max-md:right-0 max-md:bg-white max-md:p-5 
            max-md:flex-col max-md:gap-5 max-md:shadow-[0_10px_30px_rgba(0,0,0,0.1)]
            max-md:transition-all max-md:duration-300 max-md:ease-out
            ${mobileMenuOpen
                            ? 'max-md:opacity-100 max-md:visible max-md:translate-y-0'
                            : 'max-md:opacity-0 max-md:invisible max-md:-translate-y-5'
                        }`}
                >
                    {navLinks.map(link => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`text-[0.9rem] font-medium relative py-[5px] transition-colors duration-200
                  ${activeSection === link.href.slice(1)
                                        ? 'text-[#1a1a1a] after:w-full'
                                        : 'text-[#4a4a4a] hover:text-[#1a1a1a] after:w-0 hover:after:w-full'
                                    }
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] 
                  after:bg-gold-500 after:transition-all after:duration-400 after:ease-[cubic-bezier(0.4,0,0.2,1)]`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="hidden md:flex items-center gap-2 px-7 py-3 text-[0.85rem] font-semibold text-white 
            bg-charcoal-800 rounded-[30px] transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
            hover:bg-gold-500 hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(185,150,63,0.3)]"
                >
                    <span>Commission Art</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden flex flex-col gap-[5px] p-[10px]"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`w-[25px] h-[2px] bg-[#1a1a1a] transition-transform duration-200
              ${mobileMenuOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''}`}
                    />
                    <span
                        className={`w-[25px] h-[2px] bg-[#1a1a1a] transition-opacity duration-200
              ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <span
                        className={`w-[25px] h-[2px] bg-[#1a1a1a] transition-transform duration-200
              ${mobileMenuOpen ? '-rotate-45 translate-x-[5px] -translate-y-[5px]' : ''}`}
                    />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
