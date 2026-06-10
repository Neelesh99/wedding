import React, { useState, useEffect, useRef } from 'react';
import flowerSticker from '../assets/images/stickers/flower_sticker.png';
import bananaLeaf from '../assets/images/stickers/banana_leaf.png';
import pohaSticker from '../assets/images/stickers/poha_sticker.png';
import autoSticker from '../assets/images/stickers/auto_sticker.png';
import coconutSticker from '../assets/images/stickers/coconut_sticker.png';
import templeSticker from '../assets/images/stickers/temple_sticker.png';
import peacockSticker from '../assets/images/stickers/peacock_sticker.png';
import elephantSticker from '../assets/images/stickers/elephant_sticker.png';

import imgBeachFriends from '../assets/images/full_size/PXL_20230521_103227395.jpg';
import imgCsLunch from '../assets/images/full_size/cs_lunch.jpg';
import imgCsFriends from '../assets/images/full_size/cs_friends.jpg';
import imgFirstDate from '../assets/images/full_size/IMG_0846.jpg';
import imgCroatia from '../assets/images/full_size/FullSizeRender.jpg';
import imgWalks from '../assets/images/full_size/IMG_7149.jpg';
import imgDates from '../assets/images/full_size/IMG_2721.jpg';
import imgExploring from '../assets/images/full_size/IMG_0070.jpg';
import imgLastImage from '../assets/images/full_size/last_image.jpg';

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
      url: imgBeachFriends,
      caption: 'our first picture together',
      trigger: 0,
      angle: -5,
      x: -12,
      y: -10,
      sticker: flowerSticker,
      stickerAngle: -10,
    },
    {
      id: 1,
      url: imgCsLunch,
      caption: 'the first time we met',
      trigger: 0.1,
      angle: 4,
      x: 10,
      y: 6,
      sticker: bananaLeaf,
      stickerAngle: 15,
    },
    {
      id: 2,
      url: imgCsFriends,
      caption: 'our last work event together',
      trigger: 0.2,
      angle: -2,
      x: -6,
      y: -4,
      sticker: pohaSticker,
      stickerAngle: -8,
    },
    {
      id: 3,
      url: imgFirstDate,
      caption: 'our first date <3',
      trigger: 0.3,
      angle: 6,
      x: 8,
      y: 12,
      sticker: coconutSticker,
      stickerAngle: 12,
    },
    {
      id: 4,
      url: imgCroatia,
      caption: 'laughing at any time of day',
      trigger: 0.4,
      angle: -4,
      x: -10,
      y: -8,
      sticker: autoSticker,
      stickerAngle: -12,
    },
    {
      id: 5,
      url: imgDates,
      caption: 'dining in the west end',
      trigger: 0.5,
      angle: 3,
      x: 5,
      y: -2,
      sticker: templeSticker,
      stickerAngle: 10,
    },
    {
      id: 6,
      url: imgExploring,
      caption: 'mario karting in tokyo',
      trigger: 0.6,
      angle: 5,
      x: 12,
      y: -6,
      sticker: peacockSticker,
      stickerAngle: 18,
    },
    {
      id: 7,
      url: imgWalks,
      caption: 'celebrating together',
      trigger: 0.7,
      angle: -6,
      x: -14,
      y: 8,
      sticker: flowerSticker,
      stickerAngle: -15,
    },
    {
      id: 8,
      url: imgLastImage,
      caption: 'always by your side',
      trigger: 0.8,
      angle: -1,
      x: -2,
      y: 4,
      sticker: elephantSticker,
      stickerAngle: -5,
    }
  ];

  const activeCardIndex = cards.reduce((maxIdx, card, idx) => scrollProgress >= card.trigger ? idx : maxIdx, 0);
  const activeChapterIndex = Math.floor(activeCardIndex / 3);

  // Helper to compute opacity and translate styles for the narrative text blocks
  const getChapterTextStyle = (chapterIdx) => {
    const isChapterActive = activeChapterIndex === chapterIdx;
    let opacity = 0;
    let translateY = 30;

    if (isChapterActive) {
      opacity = 1;
      translateY = 0;
    } else if (chapterIdx < activeChapterIndex) {
      opacity = 0;
      translateY = -30;
    } else {
      opacity = 0;
      translateY = 30;
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: opacity > 0.1 ? 'auto' : 'none',
      position: 'absolute',
      width: '100%',
    };
  };

  // Single source of truth for all chapter copy — edit here to update both layouts
  const chapters = [
    {
      title: 'chapter one: how we met',
      body: 'We met at work and our early conversations were across a table tennis table, fuelled by friendly competition.',
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
      style={{ height: '600vh', backgroundColor: '#fcf7ed' }}
    >
      {/* STICKY TIMELINE AREA */}
      <div
        className="sticky top-0 w-full overflow-hidden flex flex-col items-center justify-center border-b"
        style={{
          height: '100vh',
          borderBottomColor: 'rgba(47, 36, 27, 0.05)',
          paddingTop: isMobile ? '2.5rem' : '5rem',
        }}
      >
        {/* Lowercase Title */}
        <h2
          className="font-display text-center select-none"
          style={{
            fontSize: isMobile ? '3.6rem' : '6rem',
            textTransform: 'lowercase',
            marginBottom: isMobile ? '1.5rem' : '2.5rem',
            marginTop: '0',
            color: 'var(--palette-red)',
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
                    {/* Sticker element sticking the photo */}
                    <img
                      src={card.sticker}
                      alt="Sticker decorator"
                      className="absolute pointer-events-none select-none object-contain"
                      style={{
                        left: '50%',
                        top: '-20px',
                        width: 'auto',
                        height: '45px',
                        transform: `translate3d(-50%, 0, 0) rotate(${card.stickerAngle || 0}deg) scale(${isActive ? 1 : 1.5})`,
                        opacity: isActive ? 1 : 0,
                        zIndex: 30,
                        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s, opacity 0.4s ease 0.4s'
                      }}
                    />
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
                    {/* Sticker element sticking the photo */}
                    <img
                      src={card.sticker}
                      alt="Sticker decorator"
                      className="absolute pointer-events-none select-none object-contain"
                      style={{
                        left: '50%',
                        top: '-28px',
                        width: 'auto',
                        height: '65px',
                        transform: `translate3d(-50%, 0, 0) rotate(${card.stickerAngle || 0}deg) scale(${isActive ? 1 : 1.5})`,
                        opacity: isActive ? 1 : 0,
                        zIndex: 30,
                        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s, opacity 0.4s ease 0.4s'
                      }}
                    />
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
