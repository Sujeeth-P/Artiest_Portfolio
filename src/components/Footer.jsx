const Footer = () => {
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const target = document.querySelector(sectionId);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    };

    const footerLinks = [
        { href: '#portfolio', label: 'Portfolio' },
        { href: '#services', label: 'Services' },
        { href: '#about', label: 'About' },
        { href: '#contact', label: 'Contact' }
    ];

    return (
        <footer className="py-16 px-10 bg-[#1a1a1a]">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <span className="font-[var(--font-display)] text-[1.8rem] font-semibold text-white tracking-[1px]">
                            Elena Ross
                        </span>
                        <p className="text-white/60 mt-1">Professional Artist & Painter</p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8 flex-wrap justify-center">
                        {footerLinks.map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-white/60 hover:text-gold-500 transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-8" />

                {/* Copyright */}
                <p className="text-center text-white/40 text-[0.9rem]">
                    © 2025 Elena Ross Art. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
