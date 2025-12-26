import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GuidedGallery = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const sophieRef = useRef(null);
    const marcusRef = useRef(null);
    const sophieBubbleRef = useRef(null);
    const marcusBubbleRef = useRef(null);
    const cardsRef = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentSpeaker, setCurrentSpeaker] = useState('sophie');
    const prevIndexRef = useRef(0);

    // Artworks with Sophie & Marcus conversations
    const artworks = [
        {
            id: 1,
            image: '/assets/gallery/paons-et-pavots.jpg',
            title: 'Paons et Pavots',
            category: 'Nature',
            speaker: 'sophie',
            text: "This peacock piece is one of my favorites. The colors are so vibrant!"
        },
        {
            id: 2,
            image: '/assets/gallery/cacatoës-et-magnolia.jpg',
            title: 'Cacatoës et Magnolia',
            category: 'Botanical',
            speaker: 'marcus',
            text: "The magnolias are stunning! Elena's botanical work is incredible."
        },
        {
            id: 3,
            image: '/assets/gallery/cygne-sauvage.jpg',
            title: 'Cygne Sauvage',
            category: 'Wildlife',
            speaker: 'sophie',
            text: "Look at this wild swan! Such grace captured perfectly."
        },
        {
            id: 4,
            image: '/assets/gallery/nénuphar.jpg',
            title: 'Nénuphar',
            category: 'Botanical',
            speaker: 'marcus',
            text: "These water lilies remind me of Monet's work."
        },
        {
            id: 5,
            image: '/assets/aigles.jpg',
            title: 'Aigles Majestueux',
            category: 'Nature',
            speaker: 'sophie',
            text: "The majestic eagles! Elena captured their power beautifully."
        }
    ];

    const currentArtwork = artworks[currentIndex];

    // Typewriter effect
    useEffect(() => {
        if (!currentArtwork) return;
        if (currentIndex === prevIndexRef.current && displayedText) return;

        prevIndexRef.current = currentIndex;
        const text = currentArtwork.text;
        setCurrentSpeaker(currentArtwork.speaker);
        setDisplayedText('');
        setIsTyping(true);

        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                setDisplayedText(text.substring(0, charIndex + 1));
                charIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typeInterval);
            }
        }, 35);

        return () => clearInterval(typeInterval);
    }, [currentIndex]);

    // Vertical scroll drives horizontal movement + conversation
    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        const cards = cardsRef.current.filter(Boolean);

        if (!section || !track || cards.length === 0) return;

        const ctx = gsap.context(() => {
            const cardWidth = 420; // Card width + gap
            const totalScroll = artworks.length * window.innerHeight * 0.8;

            // Characters fade in
            gsap.fromTo([sophieRef.current, marcusRef.current],
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    onComplete: () => {
                        // Clear GSAP inline opacity so CSS can control it
                        gsap.set([sophieRef.current, marcusRef.current], { clearProps: 'opacity' });
                    }
                }
            );

            // Pin section and control with vertical scroll
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${totalScroll}`,
                pin: true,
                scrub: 0.5,
                onUpdate: (self) => {
                    const newIndex = Math.min(
                        Math.floor(self.progress * artworks.length),
                        artworks.length - 1
                    );
                    setCurrentIndex(newIndex);

                    // Move track horizontally based on scroll
                    const targetX = -newIndex * cardWidth;
                    gsap.to(track, {
                        x: targetX,
                        duration: 0.5,
                        ease: 'power2.out',
                        overwrite: true
                    });
                }
            });

        }, section);

        return () => ctx.revert();
    }, [artworks.length]);

    return (
        <section ref={sectionRef} className="guided-gallery">
            {/* Sophie - Top Left with bubble */}
            <div ref={sophieRef} className={`guide-char sophie-char ${currentSpeaker === 'sophie' ? 'active' : 'inactive'}`}>
                <div
                    ref={sophieBubbleRef}
                    className={`guide-bubble ${currentSpeaker === 'sophie' ? 'visible' : ''}`}
                >
                    <span className="bubble-name">Sophie</span>
                    <p className="bubble-text">
                        {currentSpeaker === 'sophie' ? displayedText : ''}
                        {currentSpeaker === 'sophie' && isTyping && <span className="typing-cursor">|</span>}
                    </p>
                </div>
                <div className="char-img">
                    <img src="/assets/todol/convooo.png" alt="Sophie" />
                </div>
            </div>

            {/* Gallery Track - Center */}
            <div className="gallery-viewport">
                <div ref={trackRef} className="gallery-track">
                    {artworks.map((artwork, index) => (
                        <div
                            key={artwork.id}
                            ref={el => cardsRef.current[index] = el}
                            className={`gallery-card ${index === currentIndex ? 'active' : ''}`}
                        >
                            <div className="card-frame">
                                <img src={artwork.image} alt={artwork.title} />
                            </div>
                            <div className="card-details">
                                <span className="card-cat">{artwork.category}</span>
                                <h3 className="card-title">{artwork.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress */}
            {/* <div className="gallery-counter">
                <span className="counter-num">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="counter-sep">/</span>
                <span className="counter-total">{String(artworks.length).padStart(2, '0')}</span>
            </div> */}

            {/* Marcus - Bottom Right with bubble */}
            <div ref={marcusRef} className={`guide-char marcus-char ${currentSpeaker === 'marcus' ? 'active' : 'inactive'}`}>
                <div
                    ref={marcusBubbleRef}
                    className={`guide-bubble marcus-bubble ${currentSpeaker === 'marcus' ? 'visible' : ''}`}
                >
                    <span className="bubble-name">Marcus</span>
                    <p className="bubble-text">
                        {currentSpeaker === 'marcus' ? displayedText : ''}
                        {currentSpeaker === 'marcus' && isTyping && <span className="typing-cursor">|</span>}
                    </p>
                </div>
                <div className="char-img">
                    <img src="/assets/todol/convoo.png" alt="Marcus" />
                </div>
            </div>

            <style>{`
                .guided-gallery {
                    position: relative;
                    height: 100vh;
                    background: #fcf7e7;
                    overflow: hidden;
                }

                /* Sophie - Top Left */
                .guide-char.sophie-char {
                    position: absolute;
                    top: 18%;
                    left: 8%;
                    z-index: 20;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                    transition: all 0.4s ease;
                }

                /* Marcus - Bottom Right */
                .guide-char.marcus-char {
                    position: absolute;
                    bottom: 16%;
                    right: 6%;
                    z-index: 20;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 10px;
                    transition: all 0.4s ease;
                }

                .guide-char.inactive {
                    opacity: 0.25;
                    filter: grayscale(0.8);
                }

                .guide-char.inactive .guide-bubble {
                    opacity: 0 !important;
                    visibility: hidden;
                }

                .char-img {
                    width: 150px;
                    height: auto;
                }

                .char-img img {
                    width: 100%;
                    height: auto;
                    object-fit: contain;
                }

                /* Bubbles */
                .guide-bubble {
                    background: white;
                    border: 2px solid #2d3436;
                    border-radius: 16px;
                    padding: 14px 18px;
                    max-width: 260px;
                    min-width: 180px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                }

                .guide-bubble.visible {
                    opacity: 1;
                    visibility: visible;
                }

                /* Sophie's bubble - shift right and down */
                .sophie-char .guide-bubble {
                    position: relative;
                    left: 70px;
                    top: 20px;
                }

                /* Marcus's bubble - shift left */
                .marcus-bubble {
                    text-align: right;
                    position: relative;
                    right: 80px;
                }

                .bubble-name {
                    display: block;
                    font-size: 0.6rem;
                    font-weight: 600;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #b8963f;
                    margin-bottom: 6px;
                }

                .bubble-text {
                    font-family: 'Georgia', serif;
                    font-size: 0.85rem;
                    line-height: 1.5;
                    color: #1a1a1a;
                    margin: 0;
                    min-height: 36px;
                }

                .typing-cursor {
                    color: #b8963f;
                    font-weight: bold;
                    animation: cursorBlink 0.7s infinite;
                }

                @keyframes cursorBlink {
                    50% { opacity: 0; }
                }

                /* Gallery Viewport */
                .gallery-viewport {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    overflow: visible;
                }

                .gallery-track {
                    display: flex;
                    gap: 40px;
                    padding: 0 calc(50vw - 180px);
                    will-change: transform;
                }

                .gallery-card {
                    margin-top: 20%;
                    flex-shrink: 0;
                    width: 380px;
                    text-align: center;
                    opacity: 0.15;
                    transform: scale(0.85);
                    filter: grayscale(0.9);
                    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .gallery-card.active {
                    opacity: 1;
                    transform: scale(1);
                    filter: none;
                }

                .card-frame {
                    width: 100%;
                    height: 480px;
                    border-radius: 16px;
                    overflow: hidden;
                    background: #e8dfd3;
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
                }

                .card-frame img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .card-details {
                    padding: 20px 0;
                }

                .card-cat {
                    font-size: 0.65rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: #b8963f;
                }

                .card-title {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.4rem;
                    font-weight: 500;
                    color: #1a1a1a;
                    margin: 8px 0 0;
                    font-style: italic;
                }

                /* Counter */
                .gallery-counter {
                    position: absolute;
                    bottom: 50px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: baseline;
                    gap: 6px;
                    z-index: 10;
                }

                .counter-num {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.8rem;
                    font-weight: 600;
                    color: #b8963f;
                }

                .counter-sep {
                    color: #ccc;
                    font-size: 1rem;
                }

                .counter-total {
                    font-size: 0.9rem;
                    color: #8a8a8a;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .guide-char.sophie-char {
                        top: 30px;
                        left: 25px;
                    }

                    .guide-char.marcus-char {
                        bottom: 30px;
                        right: 25px;
                    }

                    .char-img {
                        width: 80px;
                    }

                    .guide-bubble {
                        max-width: 200px;
                        min-width: 150px;
                        padding: 12px 14px;
                    }

                    .gallery-card {
                        width: 320px;
                    }

                    .card-frame {
                        height: 400px;
                    }
                }

                @media (max-width: 768px) {
                    .char-img {
                        width: 60px;
                    }

                    .guide-bubble {
                        max-width: 160px;
                        min-width: 120px;
                        padding: 10px 12px;
                        font-size: 0.8rem;
                    }

                    .gallery-card {
                        width: 260px;
                    }

                    .card-frame {
                        height: 340px;
                    }

                    .gallery-counter {
                        bottom: 30px;
                    }
                }
            `}</style>
        </section>
    );
};

export default GuidedGallery;
