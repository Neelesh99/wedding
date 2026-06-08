import React, { useState, useEffect } from 'react';
import ScrollCollage from './components/ScrollCollage';
import CountdownSection from './components/CountdownSection';
import StorySection from './components/StorySection';
import EventCountdown from './components/EventCountdown';
import DetailsSection from './components/DetailsSection';
import FAQSection from './components/FAQSection';
import RSVPForm from './components/RSVPForm';

function App() {
  const [isChennai, setIsChennai] = useState(() => 
    window.location.pathname.replace(/\/$/, '').endsWith('/chennai')
  );

  useEffect(() => {
    const handlePathChange = () => {
      setIsChennai(window.location.pathname.replace(/\/$/, '').endsWith('/chennai'));
    };
    window.addEventListener('popstate', handlePathChange);
    
    // Add support for tracking custom history pushState/replaceState calls
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handlePathChange();
    };
    const originalReplaceState = history.replaceState;
    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      handlePathChange();
    };

    return () => {
      window.removeEventListener('popstate', handlePathChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#fcf7ed]">

      {/* Scroll-driven Collage Hero Section */}
      <ScrollCollage />

      {/* Soft gradient spacer transition from off-white hero to white countdown */}
      <div
        className="w-full relative z-20"
        style={{
          height: '160px',
          backgroundImage: 'linear-gradient(to bottom, #fcf7ed, #ffffff)'
        }}
      />

      {/* Main Content Sections */}
      <main className="w-full relative z-30">

        {/* Countdown to Forever Statement */}
        <CountdownSection />

        {/* Our Story Section */}
        <StorySection />

        {/* Chennai Event Countdown Section (Only for Chennai route) */}
        {isChennai && (
          <EventCountdown
            targetDateStr="2027-01-28T00:00:00+05:30"
            dateText="28 january, 2027"
            locationText="in Chennai, India"
            preambleText="so please join us to celebrate our engagement"
          />
        )}

        {/* Event Countdown Section (Jaipur) */}
        <EventCountdown />

      </main>

      {/* Footer */}
      <footer className="py-12 bg-bg-accent border-t border-black/5 text-center px-6">
        <div className="max-w-[600px] mx-auto flex flex-col items-center gap-4">
          <p className="font-display italic text-3xl text-accent-color">P&N</p>
          <p className="text-xs text-text-muted font-medium uppercase tracking-[0.2em]">
            9–11 February 2027 • Jaipur, India
          </p>
          <div className="h-[1px] w-12 bg-accent-color/30 my-2"></div>
          <p className="text-[11px] text-text-muted/65 font-light">
            Made with love by Palak and Neelesh.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;

