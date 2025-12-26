import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom ease similar to osmo-ease
const osmoEase = "power4.out";

const Hero = () => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const headingRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);

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

    // Scroll-triggered masked text reveal animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial state - hidden below the mask
            gsap.set([line1Ref.current, line2Ref.current], {
                yPercent: 110,
                opacity: 0
            });
            gsap.set(subtitleRef.current, {
                opacity: 0,
                y: 20
            });
            gsap.set(descriptionRef.current, {
                opacity: 0,
                y: 30
            });

            // Create scroll-triggered timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none none",
                }
            });

            // Subtitle fades in first
            tl.to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            })
                // Then the masked heading lines reveal
                .to(line1Ref.current, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: osmoEase
                }, "-=0.2")
                .to(line2Ref.current, {
                    yPercent: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: osmoEase
                }, "-=0.5")
                // Description fades in last
                .to(descriptionRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.3");

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="hero-section"
            id="home"
        >
            {/* Background */}
            <div className="hero-background">
                <div className="hero-overlay hero-overlay-left" />
                <div className="hero-overlay hero-overlay-bottom" />
                <div className="hero-vignette" />
            </div>

            {/* Content */}
            <div ref={contentRef} className="hero-content">
                <div className="hero-text-container">
                    {/* Subtitle */}
                    <span ref={subtitleRef} className="hero-subtitle">
                        <span className="hero-subtitle-line"></span>
                        <span>Elena Ross • Digital Artist</span>
                        <span className="hero-subtitle-line"></span>
                    </span>

                    {/* Masked Text Reveal Heading */}
                    <h1 ref={headingRef} className="hero-masked-heading">
                        <span className="hero-line-mask">
                            <span ref={line1Ref} className="hero-line">Art that speaks,</span>
                        </span>
                        <span className="hero-line-mask">
                            <span ref={line2Ref} className="hero-line hero-line-accent">Stories that inspire.</span>
                        </span>
                    </h1>

                    {/* Description */}
                    <p ref={descriptionRef} className='hero-description'>
                        Creating immersive worlds and captivating characters through digital art.
                        Every piece tells a story waiting to be discovered.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
