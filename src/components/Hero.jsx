const Hero = () => {
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const target = document.querySelector(sectionId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-20 px-10 overflow-hidden" id="home">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-200 to-[rgba(201,169,97,0.1)]" />
                <div className="hero-pattern" />
            </div>

            {/* Content */}
            <div className="relative z-[1] max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Text Content */}
                <div className="max-w-[580px]">
                    <span className="inline-block text-[0.8rem] font-semibold tracking-[3px] uppercase text-gold-500 mb-5 opacity-0 animate-fade-in-up animate-delay-200">
                        Professional Artist
                    </span>

                    <h1 className="font-[var(--font-display)] text-[clamp(3rem,6vw,4.5rem)] font-semibold leading-[1.1] text-[#1a1a1a] mb-6 opacity-0 animate-fade-in-up animate-delay-400">
                        Transforming Your <br />
                        <span className="text-gold-500 italic">Vision Into Art</span>
                    </h1>

                    <p className="text-[1.1rem] text-[#4a4a4a] leading-[1.8] mb-9 opacity-0 animate-fade-in-up animate-delay-600">
                        I create stunning custom paintings, portraits, and artwork that capture emotions and tell your
                        unique story. Every piece is crafted with passion and precision.
                    </p>

                    <div className="flex gap-5 mb-[50px] opacity-0 animate-fade-in-up animate-delay-800 flex-wrap">
                        <a
                            href="#portfolio"
                            onClick={(e) => scrollToSection(e, '#portfolio')}
                            className="inline-flex items-center gap-[10px] px-8 py-4 text-[0.9rem] font-semibold rounded-[50px] 
                text-white bg-charcoal-800 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
                hover:bg-gold-500 hover:-translate-y-[3px] hover:shadow-[0_15px_40px_rgba(185,150,63,0.3)]"
                        >
                            <span>View My Work</span>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                        <a
                            href="#contact"
                            onClick={(e) => scrollToSection(e, '#contact')}
                            className="inline-flex items-center gap-[10px] px-8 py-4 text-[0.9rem] font-semibold rounded-[50px]
                text-[#1a1a1a] bg-transparent border-2 border-charcoal-800 transition-all duration-400 
                hover:bg-charcoal-800 hover:text-white hover:-translate-y-[3px]"
                        >
                            <span>Start Commission</span>
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-[50px] pt-[30px] border-t border-cream-300 opacity-0 animate-fade-in-up animate-delay-1000 flex-wrap">
                        {[
                            { number: '150+', label: 'Artworks Created' },
                            { number: '80+', label: 'Happy Clients' },
                            { number: '8', label: 'Years Experience' }
                        ].map((stat, index) => (
                            <div key={index} className="text-left">
                                <span className="block font-[var(--font-display)] text-[2.5rem] font-semibold text-[#1a1a1a] leading-none">
                                    {stat.number}
                                </span>
                                <span className="text-[0.85rem] text-[#7a7a7a] mt-[5px]">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Gallery - Static without parallax animation */}
                <div className="relative h-[600px] hidden lg:block">
                    <div className="absolute w-[380px] h-[480px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] 
            rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-400
            hover:scale-[1.02] hover:shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
                        <img src="/assets/portrait_artwork.png" alt="Portrait Artwork by Elena Ross" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border-4 border-white/50 rounded-lg pointer-events-none" />
                    </div>

                    <div className="absolute w-[200px] h-[260px] top-[10%] left-0 z-[2] -rotate-[5deg]
            rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-400
            hover:scale-105">
                        <img src="/assets/landscape_painting.png" alt="Landscape Painting" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border-4 border-white/50 rounded-lg pointer-events-none" />
                    </div>

                    <div className="absolute w-[200px] h-[260px] bottom-[10%] right-0 z-[2] rotate-[5deg]
            rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-400
            hover:scale-105">
                        <img src="/assets/abstract_art.png" alt="Abstract Art" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 border-4 border-white/50 rounded-lg pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px] opacity-0 animate-fade-in-up animate-delay-1200">
                <div className="scroll-line" />
                <span className="text-[0.7rem] font-medium tracking-[2px] uppercase text-[#7a7a7a]">Scroll to explore</span>
            </div>
        </section>
    );
};

export default Hero;
