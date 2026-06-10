import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowDown } from 'lucide-react';
import peacockSticker from '../assets/images/stickers/peacock_sticker.png';
import elephantSticker from '../assets/images/stickers/elephant_sticker.png';
import heroImage from '../assets/images/full_size/Neelesh & Palak Engagement - Awajishima, Keino Beach-34.jpg';
import imgBeach from '../assets/images/full_size/IMG_1361.jpg';
import imgDancing from '../assets/images/full_size/IMG-20231106-WA0009.jpg';
import imgCanyon from '../assets/images/full_size/IMG_7459.jpg';
import imgFeet from '../assets/images/full_size/IMG_4572.jpg';

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

  // Morphing navbar progress (completes transition over first 30% of scroll)
  const navProgress = Math.min(1, scrollProgress / 0.30);

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
      ? { w: 120, h: 100, right: 'calc(50% + 120px - 45px)', top: 'calc(50% - 180px)' }
      : { w: 280, h: 240, right: 'calc(50% + 250px + 24px)', top: 'calc(50% - 270px)' },
    dancing: isMobile
      ? { w: 100, h: 75, right: 'calc(50% + 120px - 30px)', top: 'calc(50% - 10px)' }
      : { w: 245, h: 165, right: 'calc(50% + 250px + 24px)', top: 'calc(50% - 10px)' },
    canyon: isMobile
      ? { w: 100, h: 75, left: 'calc(50% + 120px - 35px)', top: 'calc(50% - 60px)' }
      : { w: 220, h: 160, left: 'calc(50% + 250px + 24px)', top: 'calc(50% - 60px)' },
    feet: isMobile
      ? { w: 120, h: 120, left: 'calc(50% + 120px - 45px)', top: 'calc(50% + 70px)' }
      : { w: 280, h: 280, left: 'calc(50% + 250px + 24px)', top: 'calc(50% + 120px)' },
    peacockSticker: isMobile
      ? { w: 60, h: 100, left: 'calc(50% + 130px)', top: 'calc(50% - 200px)' }
      : { w: 110, h: 180, left: 'calc(50% + 270px)', top: 'calc(50% - 290px)' },
    elephantSticker: isMobile
      ? { w: 75, h: 90, right: 'calc(50% + 130px)', top: 'calc(50% + 110px)' }
      : { w: 135, h: 160, right: 'calc(50% + 270px)', top: 'calc(50% + 180px)' },
  };

  // Main Card Dimensions Logic
  // At p=0, Main Card is viewport size minus 32px to create a 16px gutter with rounded corners. At p=1, matches sizes.main.
  const startW = viewport.w - 32;
  const startH = viewport.h - 32;
  const mainCardWidth = startW - (startW - sizes.main.w) * scrollProgress;
  const mainCardHeight = startH - (startH - sizes.main.h) * scrollProgress;

  // Border radius of main card is constantly 32px to keep it rounded at all scroll positions
  const mainCardBorderRadius = 32;

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

  // Stickers animation values
  const easedSticker = Math.min(1, Math.max(0, scrollProgress));
  const peacockOpacity = Math.min(1, scrollProgress * 2.5);
  const peacockTransform = `translate3d(${(1 - easedSticker) * 120}px, ${(1 - easedSticker) * -120}px, 0) rotate(${45 - 55 * easedSticker}deg) scale(${1.5 - 0.5 * easedSticker})`;
  const elephantOpacity = Math.min(1, scrollProgress * 2.5);
  const elephantTransform = `translate3d(${(1 - easedSticker) * -120}px, ${(1 - easedSticker) * 120}px, 0) rotate(${-45 + 53 * easedSticker}deg) scale(${1.5 - 0.5 * easedSticker})`;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: '230vh' }}>

      {/* MORPHING FLOATING NAVBAR */}
      <nav
        className="fixed left-0 right-0 top-0 z-50 pointer-events-none"
        style={{ height: '80px' }}
      >
        <div
          className="pointer-events-auto flex items-center justify-center transition-all duration-500 ease-out"
          style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: `min(100vw, ${1200 - (1200 - 320) * navProgress}px)`,
            height: '48px',
            borderRadius: `${navProgress * 9999}px`,
            backgroundColor: `rgba(102, 120, 3, ${navProgress * 0.95})`,
            backdropFilter: navProgress > 0 ? `blur(${navProgress * 16}px)` : 'none',
            WebkitBackdropFilter: navProgress > 0 ? `blur(${navProgress * 16}px)` : 'none',
            border: navProgress > 0 ? `1px solid rgba(255, 255, 255, ${navProgress * 0.2})` : '1px solid transparent',
            boxShadow: navProgress > 0.5 ? '0 8px 24px rgba(47, 36, 27, 0.08)' : 'none',
            color: '#ffffff',
            paddingLeft: '24px',
            paddingRight: '24px',
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-semibold text-lg md:text-xl tracking-[0.25em] uppercase whitespace-nowrap cursor-pointer hover:opacity-60 transition-opacity duration-300 focus:outline-none"
            aria-label="Scroll to top"
          >
            NeelFoundHisPal
          </button>
        </div>
      </nav>

      {/* STICKY CONTAINER FOR ANIMATION */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#fcf7ed]">

        {/* COLLAGE STAGE CONTAINER */}
        <div className="relative w-full max-w-[1200px] h-[85vh] flex items-center justify-center">

          {/* BEACH CARD (TOP LEFT) */}
          <img
            src={imgBeach}
            alt="Beach sunset"
            className="absolute pointer-events-none select-none object-cover shadow-md"
            style={{
              width: `${sizes.beach.w}px`,
              height: `${sizes.beach.h}px`,
              right: sizes.beach.right,
              top: sizes.beach.top,
              borderRadius: '24px',
              opacity: 1,
              transform: `translate3d(${(1 - easedBeachX) * -translateOffset}px, ${(1 - easedBeachY) * 60}px, 0) scale(${0.85 + 0.15 * easedBeachX})`,
              transformOrigin: 'right center',
              zIndex: 20
            }}
          />

          {/* DANCING CARD (BOTTOM LEFT) */}
          <img
            src={imgDancing}
            alt="Dancing couple"
            className="absolute pointer-events-none select-none object-cover shadow-md"
            style={{
              width: `${sizes.dancing.w}px`,
              height: `${sizes.dancing.h}px`,
              right: sizes.dancing.right,
              top: sizes.dancing.top,
              borderRadius: '20px',
              opacity: 1,
              transform: `translate3d(${(1 - easedDancingX) * -translateOffset}px, ${(1 - easedDancingY) * -60}px, 0) scale(${0.85 + 0.15 * easedDancingX})`,
              transformOrigin: 'right center',
              zIndex: 20
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
              src={heroImage}
              alt="Palak & Neelesh proposal"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                transform: `scale(${1.1 - 0.1 * eased})`,
                transition: 'transform 0.1s ease-out'
              }}
            />

            {/* Dark gradient overlay for typography legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/30" />

            {/* Inside navbar removed in favor of morphing navbar */}

            {/* HERO TYPOGRAPHY OVERLAY */}
            <div
              className="absolute inset-x-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6 text-center"
              style={{ bottom: '5rem' }}
            >
              <h1
                className="text-white font-display italic text-center"
                style={{
                  fontSize: isMobile
                    ? `${2.8 + (4.2 - 2.8) * (1 - scrollProgress)}rem`
                    : `${3.6 + (8.0 - 3.6) * (1 - scrollProgress)}rem`,
                  lineHeight: 1.1,
                  textShadow: '0 2px 10px rgba(0,0,0,0.35)',
                  whiteSpace: 'nowrap'
                }}
              >
                Palak & Neelesh
              </h1>
            </div>

            {/* SCROLL PROMPT prompt (fades out on scroll) */}
            <div
              className="absolute flex flex-col items-center gap-2 z-20 pointer-events-none"
              style={{
                opacity: scrollPromptOpacity,
                bottom: '2.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'max-content',
                color: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em]">
                Scroll to explore more
              </span>
              <ArrowDown size={16} className="animate-bounce mt-1" />
            </div>
          </div>

          {/* CANYON CARD (TOP RIGHT) */}
          <img
            src={imgCanyon}
            alt="Canyon lookout"
            className="absolute pointer-events-none select-none object-cover shadow-md"
            style={{
              width: `${sizes.canyon.w}px`,
              height: `${sizes.canyon.h}px`,
              left: sizes.canyon.left,
              top: sizes.canyon.top,
              borderRadius: '20px',
              opacity: 1,
              transform: `translate3d(${(1 - easedCanyonX) * translateOffset}px, ${(1 - easedCanyonY) * 50}px, 0) scale(${0.85 + 0.15 * easedCanyonX})`,
              transformOrigin: 'left center',
              zIndex: 20,
              objectPosition: 'center 70%'
            }}
          />

          {/* FEET CARD (BOTTOM RIGHT) */}
          <img
            src={imgFeet}
            alt="Hiking legs"
            className="absolute pointer-events-none select-none object-cover shadow-md"
            style={{
              width: `${sizes.feet.w}px`,
              height: `${sizes.feet.h}px`,
              left: sizes.feet.left,
              top: sizes.feet.top,
              borderRadius: '24px',
              opacity: 1,
              transform: `translate3d(${(1 - easedFeetX) * translateOffset}px, ${(1 - easedFeetY) * -70}px, 0) scale(${0.85 + 0.15 * easedFeetX})`,
              transformOrigin: 'left center',
              zIndex: 20
            }}
          />

          {/* PEACOCK STICKER (TOP RIGHT) */}
          <img
            src={peacockSticker}
            alt="Peacock decoration sticker"
            className="absolute pointer-events-none select-none object-contain"
            style={{
              width: `${sizes.peacockSticker.w}px`,
              height: `${sizes.peacockSticker.h}px`,
              left: sizes.peacockSticker.left,
              top: sizes.peacockSticker.top,
              opacity: peacockOpacity,
              transform: peacockTransform,
              transformOrigin: 'center center',
              zIndex: 25
            }}
          />

          {/* ELEPHANT STICKER (BOTTOM LEFT) */}
          <img
            src={elephantSticker}
            alt="Elephant decoration sticker"
            className="absolute pointer-events-none select-none object-contain"
            style={{
              width: `${sizes.elephantSticker.w}px`,
              height: `${sizes.elephantSticker.h}px`,
              right: sizes.elephantSticker.right,
              top: sizes.elephantSticker.top,
              opacity: elephantOpacity,
              transform: elephantTransform,
              transformOrigin: 'center center',
              zIndex: 25
            }}
          />

        </div>

      </div>

    </div>
  );
}
