const Services = () => {
    const scrollToContact = (e) => {
        e.preventDefault();
        const target = document.querySelector('#contact');
        if (target) {
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    };

    const services = [
        {
            icon: (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="32" cy="24" r="12" />
                    <path d="M16 56c0-8.837 7.163-16 16-16s16 7.163 16 16" />
                </svg>
            ),
            title: 'Custom Portraits',
            description: 'Capture the essence of your loved ones with a beautifully crafted portrait. Perfect for gifts, memorials, or personal collections.',
            features: ['Individual & Family Portraits', 'Pet Portraits', 'Memorial Paintings', 'Work from Photos'],
            price: '$800',
            featured: false
        },
        {
            icon: (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="8" y="12" width="48" height="40" rx="2" />
                    <path d="M8 36l16-12 12 8 20-16" />
                    <circle cx="44" cy="24" r="4" />
                </svg>
            ),
            title: 'Custom Paintings',
            description: 'Commission a unique artwork tailored to your space and style. From abstract to realism, I create pieces that speak to you.',
            features: ['Any Size & Style', 'Interior Design Matching', 'Corporate Art', 'Multiple Revisions'],
            price: '$1,200',
            featured: true
        },
        {
            icon: (
                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="12" y="8" width="40" height="48" rx="2" />
                    <path d="M20 20h24M20 28h24M20 36h16M20 44h20" />
                </svg>
            ),
            title: 'Illustration & Design',
            description: 'Professional illustrations for books, branding, events, and more. High-quality artwork for commercial and personal use.',
            features: ['Book Covers & Interiors', 'Wedding Invitations', 'Brand Illustrations', 'Digital & Print Ready'],
            price: '$500',
            featured: false
        }
    ];

    return (
        <section className="py-[120px] px-10 bg-[#fcf7e7]" id="services">
            {/* Section Header */}
            <div className="text-center max-w-[600px] mx-auto mb-[60px]">
                <span className="inline-block text-[0.8rem] font-semibold tracking-[3px] uppercase text-gold-500 mb-[15px]">
                    What I Offer
                </span>
                <h2 className="font-[var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-semibold text-[#1a1a1a] mb-5">
                    Commission <span className="text-gold-500 italic">Services</span>
                </h2>
                <p className="text-[1.05rem] text-[#4a4a4a] leading-[1.7]">
                    From personalized portraits to custom paintings, I bring your artistic vision to life
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] max-w-[1200px] mx-auto">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`relative p-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
              transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]
              hover:-translate-y-[10px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
              ${service.featured ? 'bg-gradient-to-br from-[#f5f0e8] to-white border-2 border-gold-400' : 'bg-white'}`}
                    >
                        {service.featured && (
                            <div className="absolute -top-3 right-[30px] px-5 py-2 text-[0.75rem] font-semibold 
                tracking-[1px] uppercase text-white bg-gold-500 rounded-[20px]">
                                Most Popular
                            </div>
                        )}

                        <div className="w-[70px] h-[70px] mb-6">
                            <div className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-gold-500">
                                {service.icon}
                            </div>
                        </div>

                        <h3 className={`font-[var(--font-display)] text-[1.5rem] font-semibold mb-[15px]
              ${service.featured ? 'text-[#2a2a2a]' : 'text-[#1a1a1a]'}`}>
                            {service.title}
                        </h3>

                        <p className={`text-[0.95rem] leading-[1.7] mb-6
              ${service.featured ? 'text-[#525252]' : 'text-[#4a4a4a]'}`}>
                            {service.description}
                        </p>

                        <ul className="list-none mb-[30px]">
                            {service.features.map((feature, fIndex) => (
                                <li
                                    key={fIndex}
                                    className={`relative pl-6 text-[0.9rem] mb-[10px]
                    before:content-['✓'] before:absolute before:left-0 before:text-gold-500 before:font-semibold
                    ${service.featured ? 'text-[#525252]' : 'text-[#4a4a4a]'}`}
                                >
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="mb-6">
                            <span className={`block text-[0.8rem] mb-[5px]
                ${service.featured ? 'text-[#8a8a8a]' : 'text-[#7a7a7a]'}`}>
                                Starting from
                            </span>
                            <span className={`font-[var(--font-display)] text-[2rem] font-semibold
                ${service.featured ? 'text-gold-500' : 'text-gold-500'}`}>
                                {service.price}
                            </span>
                        </div>

                        <a
                            href="#contact"
                            onClick={scrollToContact}
                            className={`inline-block text-[0.95rem] font-semibold transition-colors duration-200
                ${service.featured
                                    ? 'text-gold-500 hover:text-gold-600'
                                    : 'text-gold-500 hover:text-gold-600'
                                }`}
                        >
                            Request Quote →
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
