import React, { useRef, useState, useEffect } from 'react';

export default function CountdownSection() {
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0.5);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress through the viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
          const totalDist = viewportHeight + rect.height;
          const currentDist = viewportHeight - rect.top;
          const progress = Math.min(1, Math.max(0, currentDist / totalDist));
          setScrollY(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax rates: translate based on scroll progress relative to center (0.5)
  // Left leaf drifts slower
  const leftTranslateY = (scrollY - 0.5) * -80;
  // Right leaf drifts faster
  const rightTranslateY = (scrollY - 0.5) * -140;
  // Text group drifts slightly
  const textTranslateY = (scrollY - 0.5) * -30;
  
  // Calculate text opacity (fade in when entering, solid in middle, fade out when leaving)
  const textOpacity = scrollY < 0.25 
    ? scrollY / 0.25 
    : scrollY > 0.75 
      ? (1 - scrollY) / 0.25 
      : 1;

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-white w-full flex items-center justify-center border-b"
      style={{
        paddingTop: isMobile ? '6rem' : '10rem',
        paddingBottom: isMobile ? '6rem' : '10rem',
      }}
    >
      {/* Background Parallax SVGs - absolute positioned far to the sides to prevent overlaying with text */}
      <div 
        className="absolute pointer-events-none select-none z-10"
        style={{
          left: isMobile ? '-25px' : '4%',
          top: '10%',
          width: isMobile ? '120px' : '200px',
          height: isMobile ? '240px' : '400px',
          opacity: isMobile ? 0.2 : 0.45,
          transform: `translate3d(0, ${leftTranslateY}px, 0) rotate(-15deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <svg viewBox="0 0 100 200" fill="none" stroke="var(--accent-color)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M50 180 C40 130, 60 70, 50 20" />
          <path d="M50 150 Q20 140, 30 120 Q40 120, 50 140" fill="var(--accent-color)" fillOpacity="0.06" />
          <path d="M50 130 Q80 120, 70 100 Q60 100, 50 120" fill="var(--accent-color)" fillOpacity="0.06" />
          <path d="M50 100 Q25 90, 35 70 Q45 70, 50 90" fill="var(--accent-color)" fillOpacity="0.06" />
          <path d="M50 80 Q75 70, 65 50 Q55 50, 50 70" fill="var(--accent-color)" fillOpacity="0.06" />
          <path d="M50 50 Q30 40, 40 25 Q50 25, 50 45" fill="var(--accent-color)" fillOpacity="0.06" />
        </svg>
      </div>

      <div 
        className="absolute pointer-events-none select-none z-10"
        style={{
          right: isMobile ? '-25px' : '4%',
          bottom: '10%',
          width: isMobile ? '120px' : '200px',
          height: isMobile ? '240px' : '400px',
          opacity: isMobile ? 0.2 : 0.45,
          transform: `translate3d(0, ${rightTranslateY}px, 0) rotate(15deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <svg viewBox="0 0 100 200" fill="none" stroke="var(--accent-color)" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M50 180 C60 140, 40 80, 50 20" />
          <path d="M50 160 Q80 150, 70 130 Q60 130, 50 150" fill="var(--accent-color)" fillOpacity="0.06" />
          <path d="M50 135 Q20 125, 30 105 Q40 105, 50 125" fill="var(--accent-color)" fillOpacity="0.06" />
          <path d="M50 110 Q75 100, 65 80 Q55 80, 50 100" fill="var(--accent-color)" fillOpacity="0.06" />
          <path d="M50 85 Q30 75, 40 55 Q50 55, 50 75" fill="var(--accent-color)" fillOpacity="0.06" />
          <path d="M50 55 Q70 45, 60 30 Q50 30, 50 50" fill="var(--accent-color)" fillOpacity="0.06" />
        </svg>
      </div>

      {/* Center Statement Container */}
      <div 
        className="mx-auto text-center z-20"
        style={{
          maxWidth: '750px',
          transform: `translate3d(0, ${textTranslateY}px, 0)`,
          opacity: textOpacity,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          paddingLeft: '24px',
          paddingRight: '24px',
        }}
      >
        <span 
          className="font-semibold uppercase block"
          style={{
            fontSize: '11px',
            letterSpacing: '0.4em',
            color: 'var(--accent-color)',
            marginBottom: '2rem',
          }}
        >
          The Promise
        </span>
        
        <h2 
          className="font-display italic text-text-primary font-normal"
          style={{
            fontSize: isMobile ? '2.1rem' : '3.6rem',
            lineHeight: 1.45,
          }}
        >
          “The countdown to forever begins {!isMobile && <br />}
          with a celebration of <span style={{ color: 'var(--accent-color)' }}>love, laughter</span> {!isMobile && <br />}
          and <span style={{ borderBottom: '1px solid rgba(138, 90, 43, 0.25)', paddingBottom: '3px' }}>happily ever after</span>”
        </h2>

        {/* Elegant vertical visual anchor */}
        <div 
          className="mx-auto"
          style={{
            width: '1px',
            height: '80px',
            backgroundColor: 'rgba(138, 90, 43, 0.2)',
            marginTop: '3.5rem',
          }}
        ></div>
      </div>
    </section>
  );
}
