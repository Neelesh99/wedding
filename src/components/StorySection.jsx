import React, { useState, useEffect, useRef } from 'react';

export default function StorySection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalScrollableHeight = rect.height - window.innerHeight;
            if (totalScrollableHeight > 0) {
              const relativeScroll = -rect.top;
              const progress = Math.min(1, Math.max(0, relativeScroll / totalScrollableHeight));
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    {
      id: 0,
      url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600',
      caption: 'First year on campus',
      trigger: 0,
      angle: -5,
      x: -12,
      y: -10
    },
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600',
      caption: 'Coffee between classes',
      trigger: 0.12,
      angle: 4,
      x: 10,
      y: 6
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600',
      caption: 'Late study sessions',
      trigger: 0.22,
      angle: -2,
      x: -6,
      y: -4
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=600',
      caption: 'A favorite city corner',
      trigger: 0.35,
      angle: 3,
      x: 12,
      y: -12
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600',
      caption: 'Our everyday ritual',
      trigger: 0.45,
      angle: -6,
      x: -14,
      y: 10
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600',
      caption: 'Weekend park walks',
      trigger: 0.55,
      angle: 2,
      x: 8,
      y: 4
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600',
      caption: 'Mountain hiking',
      trigger: 0.68,
      angle: -4,
      x: -8,
      y: -8
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?q=80&w=600',
      caption: 'Quiet sunset views',
      trigger: 0.78,
      angle: 5,
      x: 14,
      y: 12
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600',
      caption: 'Right after yes',
      trigger: 0.88,
      angle: -1,
      x: 0,
      y: 0
    }
  ];

  // Helper to compute opacity and translate styles for the narrative text blocks
  const getChapterTextStyle = (chapterIdx) => {
    let opacity = 0;
    let translateY = 30;

    if (chapterIdx === 0) {
      if (scrollProgress < 0.3) {
        opacity = 1;
        translateY = 0;
      } else if (scrollProgress < 0.35) {
        const t = (scrollProgress - 0.3) / 0.05; // 0 to 1
        opacity = 1 - t;
        translateY = -30 * t;
      }
    } else if (chapterIdx === 1) {
      if (scrollProgress >= 0.32 && scrollProgress < 0.36) {
        const t = (scrollProgress - 0.32) / 0.04;
        opacity = t;
        translateY = 30 * (1 - t);
      } else if (scrollProgress >= 0.36 && scrollProgress < 0.63) {
        opacity = 1;
        translateY = 0;
      } else if (scrollProgress >= 0.63 && scrollProgress < 0.68) {
        const t = (scrollProgress - 0.63) / 0.05;
        opacity = 1 - t;
        translateY = -30 * t;
      }
    } else if (chapterIdx === 2) {
      if (scrollProgress >= 0.65 && scrollProgress < 0.7) {
        const t = (scrollProgress - 0.65) / 0.05;
        opacity = t;
        translateY = 30 * (1 - t);
      } else if (scrollProgress >= 0.7) {
        opacity = 1;
        translateY = 0;
      }
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: opacity > 0.1 ? 'auto' : 'none',
      position: 'absolute',
      width: '100%',
    };
  };

  // Single source of truth for all chapter copy — edit here to update both layouts
  const chapters = [
    {
      title: 'chapter one: how we met',
      body: 'We met at work but initially we hardly talked to each other, and when we did it was usually from across a table tennis table with a healthy rivalry.',
    },
    {
      title: 'chapter two: falling in love',
      body: 'What started off as an airport pickup quickly turned into late night car rides, weekly badminton frays, food + crafts date nights and enjoying our little life in London.',
    },
    {
      title: 'chapter three: the next step',
      body: 'On a trip with 2 questions, yesses and rings — suddenly the future we had been imagining became something we could invite everyone to.',
    },
  ];

  const polaroidWidth = isMobile ? 240 : 320;
  const polaroidHeight = isMobile ? 290 : 380;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '350vh', backgroundColor: '#fcf7ed' }}
    >
      {/* STICKY TIMELINE AREA */}
      <div
        className="sticky top-0 w-full overflow-hidden flex flex-col items-center justify-center border-b"
        style={{
          height: '100vh',
          borderBottomColor: 'rgba(47, 36, 27, 0.05)',
        }}
      >
        {/* Lowercase Title */}
        <h2
          className="font-display text-text-primary text-center select-none"
          style={{
            fontSize: isMobile ? '3.6rem' : '6rem',
            textTransform: 'lowercase',
            marginBottom: isMobile ? '1.5rem' : '2.5rem',
            marginTop: isMobile ? '2.5rem' : '0',
          }}
        >
          our story
        </h2>

        {/* RESPONSIVE LAYOUT CONTAINER */}
        {isMobile ? (
          /* MOBILE LAYOUT: Text on top, stacked cards below */
          <div
            className="w-full flex flex-col items-center justify-start px-6"
            style={{ height: 'calc(100vh - 180px)' }}
          >
            {/* TEXT CONTAINER (Sticky text fading in/out) */}
            <div
              className="relative w-full text-center"
              style={{ height: '150px', marginBottom: '1rem' }}
            >
              {chapters.map((ch, i) => (
                <div key={i} style={getChapterTextStyle(i)}>
                  <span className="font-bold text-text-primary text-sm uppercase block tracking-wider" style={{ marginBottom: '0.5rem' }}>
                    {ch.title}
                  </span>
                  <p className="font-light leading-relaxed" style={{ fontSize: '13.5px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
                    {ch.body}
                  </p>
                </div>
              ))}
            </div>

            {/* STACK AREA (Polaroids building up) */}
            <div
              className="relative flex items-center justify-center w-full"
              style={{ height: `${polaroidHeight + 40}px` }}
            >
              {cards.map((card) => {
                const isActive = scrollProgress >= card.trigger;
                return (
                  <div
                    key={card.id}
                    className="polaroid-card absolute"
                    style={{
                      width: `${polaroidWidth}px`,
                      height: `${polaroidHeight}px`,
                      padding: '10px 10px 22px 10px',
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? `translate3d(${card.x * 0.7}px, ${card.y * 0.7}px, 0) scale(1) rotate(${card.angle}deg)`
                        : `translate3d(${card.x * 0.7}px, 100vh, 0) scale(1.15) rotate(${card.angle + 15}deg)`,
                      transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 10 + card.id,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <div className="polaroid-image-wrapper w-full h-[76%] overflow-hidden rounded-[4px] bg-[#fcf7ed]">
                      <img
                        src={card.url}
                        alt={card.caption}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    </div>
                    <div
                      className="font-display italic text-center select-none"
                      style={{
                        fontSize: '1.2rem',
                        marginTop: '10px',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {card.caption}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* DESKTOP LAYOUT: Text left/right alternating, polaroids centered */
          <div
            className="w-full flex items-center justify-between px-12 mx-auto"
            style={{ maxWidth: '1200px', height: '65vh' }}
          >
            {/* LEFT COLUMN: Chapter 1 and Chapter 3 Text */}
            <div className="relative" style={{ width: '28%', height: '240px' }}>
              {/* Chapters 1 & 3 sit in the left column */}
              {[0, 2].map((i) => (
                <div key={i} style={getChapterTextStyle(i)}>
                  <span className="font-bold text-text-primary tracking-wide block lowercase" style={{ fontSize: '1.25rem', marginBottom: '0.85rem' }}>
                    {chapters[i].title}
                  </span>
                  <p className="font-light leading-relaxed text-text-muted" style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
                    {chapters[i].body}
                  </p>
                </div>
              ))}
            </div>

            {/* CENTER COLUMN: The Stacking Polaroid Pile */}
            <div className="relative flex items-center justify-center" style={{ width: '38%', height: '440px' }}>
              {cards.map((card) => {
                const isActive = scrollProgress >= card.trigger;
                return (
                  <div
                    key={card.id}
                    className="polaroid-card absolute"
                    style={{
                      width: `${polaroidWidth}px`,
                      height: `${polaroidHeight}px`,
                      opacity: isActive ? 1 : 0,
                      transform: isActive
                        ? `translate3d(${card.x}px, ${card.y}px, 0) scale(1) rotate(${card.angle}deg)`
                        : `translate3d(${card.x}px, 100vh, 0) scale(1.15) rotate(${card.angle + 15}deg)`,
                      transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
                      zIndex: 10 + card.id,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <div className="polaroid-image-wrapper w-full h-[76%] overflow-hidden rounded-[4px] bg-[#fcf7ed]">
                      <img
                        src={card.url}
                        alt={card.caption}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                    </div>
                    <div
                      className="font-display italic text-center select-none"
                      style={{
                        fontSize: '1.4rem',
                        marginTop: '12px',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {card.caption}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Chapter 2 Text */}
            <div className="relative" style={{ width: '28%', height: '240px' }}>
              {/* Chapter 2 sits in the right column */}
              <div style={getChapterTextStyle(1)}>
                <span className="font-bold text-text-primary tracking-wide block lowercase" style={{ fontSize: '1.25rem', marginBottom: '0.85rem' }}>
                  {chapters[1].title}
                </span>
                <p className="font-light leading-relaxed text-text-muted" style={{ fontSize: '15px', color: 'var(--text-muted)' }}>
                  {chapters[1].body}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
