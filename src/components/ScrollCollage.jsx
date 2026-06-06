import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowDown } from 'lucide-react';

export default function ScrollCollage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewport, setViewport] = useState({ w: 1200, h: 800 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef(null);

  // Track viewport resize
  useEffect(() => {
    const handleResize = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll and calculate progress
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const totalHeight = rect.height - window.innerHeight;
            if (totalHeight > 0) {
              const relativeScroll = -rect.top;
              // Clamp progress between 0 and 1
              const progress = Math.min(1, Math.max(0, relativeScroll / totalHeight));
              setScrollProgress(progress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Easing function for smoother transitions (Cubic Ease-Out)
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const eased = easeOutCubic(scrollProgress);

  // Custom non-linear easing curves for horizontal (X) and vertical (Y) trajectories per card
  // This gives each card its own unique path and speed, creating a curved "invasion" effect.
  
  // Beach (top-left) - fast horizontally, slow start/fast end vertically. Starts lower, slides up.
  const easedBeachX = 1 - Math.pow(1 - scrollProgress, 3.5);
  const easedBeachY = Math.pow(scrollProgress, 1.8);
  
  // Dancing (bottom-left) - medium horizontally, slower vertically. Starts higher, slides down.
  const easedDancingX = 1 - Math.pow(1 - scrollProgress, 2.2);
  const easedDancingY = Math.pow(scrollProgress, 1.5);

  // Canyon (top-right) - very fast horizontally, linear/moderate vertically. Starts lower, slides up.
  const easedCanyonX = 1 - Math.pow(1 - scrollProgress, 3.0);
  const easedCanyonY = Math.pow(scrollProgress, 1.6);

  // Feet (bottom-right) - late horizontally, very late vertically. Starts higher, slides down.
  const easedFeetX = 1 - Math.pow(1 - scrollProgress, 1.8);
  const easedFeetY = Math.pow(scrollProgress, 2.2);

  const isMobile = viewport.w < 768;

  // Responsive dimensions for elements in the collage (in pixels)
  const sizes = {
    main: isMobile ? { w: 240, h: 340 } : { w: 500, h: 520 },
    beach: isMobile 
      ? { w: 120, h: 100, right: 'calc(50% + 130px + 12px)', top: 'calc(50% - 180px)' } 
      : { w: 280, h: 240, right: 'calc(50% + 250px + 24px)', top: 'calc(50% - 270px)' },
    dancing: isMobile 
      ? { w: 100, h: 70, right: 'calc(50% + 130px + 12px)', top: 'calc(50% - 10px)' } 
      : { w: 245, h: 165, right: 'calc(50% + 250px + 24px)', top: 'calc(50% - 10px)' },
    canyon: isMobile 
      ? { w: 100, h: 70, left: 'calc(50% + 130px + 12px)', top: 'calc(50% - 40px)' } 
      : { w: 220, h: 160, left: 'calc(50% + 250px + 24px)', top: 'calc(50% - 60px)' },
    feet: isMobile 
      ? { w: 120, h: 120, left: 'calc(50% + 130px + 12px)', top: 'calc(50% + 80px)' } 
      : { w: 280, h: 280, left: 'calc(50% + 250px + 24px)', top: 'calc(50% + 120px)' },
  };

  // Main Card Dimensions Logic
  // At p=0, Main Card matches viewport size. At p=1, matches sizes.main.
  const mainCardWidth = viewport.w - (viewport.w - sizes.main.w) * scrollProgress;
  const mainCardHeight = viewport.h - (viewport.h - sizes.main.h) * scrollProgress;
  
  // Interpolate border radius of main card: 0px when full screen, 32px when in collage
  const mainCardBorderRadius = scrollProgress * 32;

  // Horizontal translation offset for side images flying in
  const translateOffset = viewport.w * 0.45;

  // Scroll Prompts and Inside Nav Opacities
  const insideNavOpacity = Math.max(0, 1 - scrollProgress * 12);
  const scrollPromptOpacity = Math.max(0, 1 - scrollProgress * 8);

  // Floating Nav Opacity and Translation
  // Appears after scrolling 5% down
  const floatingNavOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.05) * 10));
  const floatingNavY = -40 + Math.min(40, scrollProgress * 40);

  // Helper for scroll section navigation
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '230vh' }}>
      
      {/* FIXED FLOATING NAVBAR (appears on scroll) */}
      <nav 
        className="fixed left-0 right-0 top-0 z-50 px-4 md:px-8 pointer-events-none"
        style={{ 
          opacity: floatingNavOpacity,
          transform: `translateY(${floatingNavY}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="mx-auto mt-4 w-full max-w-[1200px] glass-nav pointer-events-auto flex items-center justify-between h-14 px-6">
          <a href="#" className="font-semibold text-lg tracking-wider hover:opacity-75 transition-opacity" onClick={() => scrollToSection('top')}>
            J&P
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('details')} className="text-sm font-medium hover:opacity-75 transition-opacity">Travel Logistics</button>
            <button onClick={() => scrollToSection('details')} className="text-sm font-medium hover:opacity-75 transition-opacity">Registry</button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-medium hover:opacity-75 transition-opacity">FAQ</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('rsvp')}
              className="btn-primary text-sm font-semibold tracking-wide py-1.5 px-5"
            >
              Submit RSVP
            </button>
            
            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-1 md:hidden hover:bg-black/5 rounded-full transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-4 left-4 bg-white/95 backdrop-blur-md border border-black/5 rounded-2xl p-6 shadow-xl flex flex-col gap-4 pointer-events-auto md:hidden">
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollToSection('details'); }} 
              className="text-left py-2 font-medium text-lg border-b border-black/5"
            >
              Travel Logistics
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollToSection('details'); }} 
              className="text-left py-2 font-medium text-lg border-b border-black/5"
            >
              Registry
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollToSection('faq'); }} 
              className="text-left py-2 font-medium text-lg"
            >
              FAQ
            </button>
          </div>
        )}
      </nav>

      {/* STICKY CONTAINER FOR ANIMATION */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#fcf7ed]">
        
        {/* COLLAGE STAGE CONTAINER */}
        <div className="relative w-full max-w-[1200px] h-[85vh] flex items-center justify-center">

          {/* BEACH CARD (TOP LEFT) */}
          <img 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600" 
            alt="Beach sunset" 
            className="absolute pointer-events-none select-none z-20 object-cover shadow-md"
            style={{
              width: `${sizes.beach.w}px`,
              height: `${sizes.beach.h}px`,
              right: sizes.beach.right,
              top: sizes.beach.top,
              borderRadius: '24px',
              opacity: 1,
              transform: `translate3d(${(1 - easedBeachX) * -translateOffset}px, ${(1 - easedBeachY) * 60}px, 0) scale(${0.85 + 0.15 * easedBeachX})`,
              transformOrigin: 'right center'
            }}
          />

          {/* DANCING CARD (BOTTOM LEFT) */}
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=600" 
            alt="Dancing couple" 
            className="absolute pointer-events-none select-none z-20 object-cover shadow-md"
            style={{
              width: `${sizes.dancing.w}px`,
              height: `${sizes.dancing.h}px`,
              right: sizes.dancing.right,
              top: sizes.dancing.top,
              borderRadius: '20px',
              filter: 'grayscale(0.6)',
              opacity: 1,
              transform: `translate3d(${(1 - easedDancingX) * -translateOffset}px, ${(1 - easedDancingY) * -60}px, 0) scale(${0.85 + 0.15 * easedDancingX})`,
              transformOrigin: 'right center'
            }}
          />

          {/* MAIN HERO CARD (CENTERED) */}
          <div 
            className="absolute overflow-hidden shadow-2xl z-10"
            style={{
              width: `${mainCardWidth}px`,
              height: `${mainCardHeight}px`,
              left: '50%',
              top: '50%',
              transform: 'translate3d(-50%, -50%, 0)',
              borderRadius: `${mainCardBorderRadius}px`,
              boxShadow: scrollProgress > 0.95 ? '0 16px 48px rgba(47, 36, 27, 0.15)' : 'none'
            }}
          >
            {/* Background Image inside Main Card */}
            <img 
              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200" 
              alt="Jim & Pam proposal" 
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `scale(${1.1 - 0.1 * eased})`,
                transition: 'transform 0.1s ease-out'
              }}
            />

            {/* Dark gradient overlay for typography legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30" />

            {/* INTEGRATED NAVBAR INSIDE HERO CARD (fades out on scroll) */}
            <div 
              className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between text-white z-30"
              style={{ 
                opacity: insideNavOpacity,
                pointerEvents: scrollProgress > 0.05 ? 'none' : 'auto'
              }}
            >
              <span className="font-semibold text-lg tracking-wider">J&P</span>
              <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                <button onClick={() => scrollToSection('details')} className="hover:opacity-85 transition-opacity">Travel Logistics</button>
                <button onClick={() => scrollToSection('details')} className="hover:opacity-85 transition-opacity">Registry</button>
                <button onClick={() => scrollToSection('faq')} className="hover:opacity-85 transition-opacity">FAQ</button>
              </div>
              <button 
                onClick={() => scrollToSection('rsvp')}
                className="btn-primary text-sm font-semibold tracking-wide py-1.5 px-5"
                style={{ backgroundColor: '#8a5a2b', color: '#fff9f1' }}
              >
                Submit RSVP
              </button>
            </div>

            {/* HERO TYPOGRAPHY OVERLAY */}
            <div className="absolute inset-x-0 bottom-16 flex flex-col items-center justify-center z-20 pointer-events-none px-6 text-center">
              <h1 
                className="text-white font-display italic text-center"
                style={{
                  fontSize: isMobile 
                    ? `${2.2 + (3.5 - 2.2) * (1 - scrollProgress)}rem` 
                    : `${2.8 + (6.5 - 2.8) * (1 - scrollProgress)}rem`,
                  lineHeight: 1.1,
                  textShadow: '0 2px 10px rgba(0,0,0,0.35)',
                  whiteSpace: 'nowrap'
                }}
              >
                Jim & Pam
              </h1>
            </div>

            {/* SCROLL PROMPT prompt (fades out on scroll) */}
            <div 
              className="absolute inset-x-0 bottom-6 flex items-center justify-between px-8 text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] text-white/90 z-20 pointer-events-none"
              style={{ opacity: scrollPromptOpacity }}
            >
              <div className="flex items-center gap-1">
                <ArrowDown size={14} className="animate-bounce" />
              </div>
              <span>Scroll to explore</span>
            </div>
          </div>

          {/* CANYON CARD (TOP RIGHT) */}
          <img 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=600" 
            alt="Canyon lookout" 
            className="absolute pointer-events-none select-none z-20 object-cover shadow-md"
            style={{
              width: `${sizes.canyon.w}px`,
              height: `${sizes.canyon.h}px`,
              left: sizes.canyon.left,
              top: sizes.canyon.top,
              borderRadius: '20px',
              opacity: 1,
              transform: `translate3d(${(1 - easedCanyonX) * translateOffset}px, ${(1 - easedCanyonY) * 50}px, 0) scale(${0.85 + 0.15 * easedCanyonX})`,
              transformOrigin: 'left center'
            }}
          />

          {/* FEET CARD (BOTTOM RIGHT) */}
          <img 
            src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=600" 
            alt="Hiking legs" 
            className="absolute pointer-events-none select-none z-20 object-cover shadow-md"
            style={{
              width: `${sizes.feet.w}px`,
              height: `${sizes.feet.h}px`,
              left: sizes.feet.left,
              top: sizes.feet.top,
              borderRadius: '24px',
              opacity: 1,
              transform: `translate3d(${(1 - easedFeetX) * translateOffset}px, ${(1 - easedFeetY) * -70}px, 0) scale(${0.85 + 0.15 * easedFeetX})`,
              transformOrigin: 'left center'
            }}
          />

        </div>

      </div>

    </div>
  );
}
