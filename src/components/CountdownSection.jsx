import React, { useRef, useState, useEffect } from 'react';
import leftStencil from '../assets/images/stenciles/0ef7b8e8df281f4e561195ae9e7e21a7.png';
import rightStencil from '../assets/images/stenciles/a5c037181700647b1d18aec187b2fe42.png';

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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // Calculate scroll progress through the viewport
            if (rect.top >= viewportHeight) {
              setScrollY(0);
            } else if (rect.bottom <= 0) {
              setScrollY(1);
            } else {
              const totalDist = viewportHeight + rect.height;
              const currentDist = viewportHeight - rect.top;
              const progress = Math.min(1, Math.max(0, currentDist / totalDist));
              setScrollY(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
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

  // Calculate stencil opacity (fades from 80% to 100% as user scrolls to them)
  const stencilOpacity = 0.8 + 0.2 * Math.min(1, scrollY / 0.65);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-white w-full flex items-center justify-center border-b"
      style={{
        paddingTop: isMobile ? '3rem' : '5rem',
        paddingBottom: isMobile ? '4rem' : '7rem',
      }}
    >
      {/* Background Parallax Stencil Images - absolute positioned far to the sides to prevent overlaying with text */}
      <img 
        src={leftStencil} 
        alt="Decorative Indian Kolam Stencil Left" 
        className="absolute pointer-events-none select-none z-10 object-contain"
        style={{
          left: isMobile ? '-60px' : '2%',
          top: isMobile ? '5%' : '8%',
          width: isMobile ? '120px' : '300px',
          height: 'auto',
          opacity: stencilOpacity * (isMobile ? 0.5 : 1.0),
          transform: `translate3d(0, ${leftTranslateY}px, 0)`,
          transition: 'opacity 0.15s ease-out',
        }}
      />

      <img 
        src={rightStencil} 
        alt="Decorative Floral Paisley Stencil Right" 
        className="absolute pointer-events-none select-none z-10 object-contain"
        style={{
          right: isMobile ? '-60px' : '2%',
          bottom: isMobile ? '5%' : '5%',
          width: isMobile ? '130px' : '320px',
          height: 'auto',
          opacity: stencilOpacity * (isMobile ? 0.5 : 1.0),
          transform: `translate3d(0, ${rightTranslateY}px, 0)`,
          transition: 'opacity 0.15s ease-out',
        }}
      />

      {/* Center Statement Container */}
      <div 
        className="mx-auto text-center z-20"
        style={{
          maxWidth: '750px',
          transform: `translate3d(0, ${textTranslateY}px, 0)`,
          opacity: textOpacity,
          transition: 'opacity 0.1s ease-out',
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
