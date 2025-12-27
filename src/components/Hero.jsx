import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const osmoEase = "power4.out";

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
    gsap.set(heroRef.current.querySelectorAll('.hero-line-mask'), {
      overflow: 'hidden',
      display: 'block'
    });
      // initial states
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

      // 🔥 HERO INTRO (PLAY IMMEDIATELY)
      gsap.timeline()
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        })
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
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.3");

      // 🔥 PARALLAX (SCROLL-BASED)
      gsap.to(contentRef.current, {
        y: 120,
        opacity: 0.6,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-section" id="home">
      <div className="hero-background">
        <div className="hero-overlay hero-overlay-left" />
        <div className="hero-overlay hero-overlay-bottom" />
        <div className="hero-vignette" />
      </div>

      <div ref={contentRef} className="hero-content">
        <div className="hero-text-container">

          <span ref={subtitleRef} className="hero-subtitle">
            <span className="hero-subtitle-line"></span>
            <span>Elena Ross • Digital Artist</span>
            <span className="hero-subtitle-line"></span>
          </span>

          <h1 className="hero-masked-heading">
            <span className="hero-line-mask">
              <span ref={line1Ref} className="hero-line">
                Where the Art speaks,
              </span>
            </span>
            <span className="hero-line-mask">
              <span ref={line2Ref} className="hero-line hero-line-accent">
                Stories that inspire
              </span>
            </span>
          </h1>

          <p ref={descriptionRef} className="hero-description">
            Creating immersive worlds and captivating characters through digital art.
            Every piece tells a story waiting to be discovered.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Hero;
