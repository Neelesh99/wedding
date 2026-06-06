import React from 'react';
import ScrollCollage from './components/ScrollCollage';
import DetailsSection from './components/DetailsSection';
import FAQSection from './components/FAQSection';
import RSVPForm from './components/RSVPForm';

function App() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#fcf7ed]">
      
      {/* Scroll-driven Collage Hero Section */}
      <ScrollCollage />

      {/* Main Content Sections */}
      <main className="w-full relative z-30">
        
        {/* Details & Logistics */}
        <DetailsSection />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Interactive RSVP Form */}
        <RSVPForm />

      </main>

      {/* Footer */}
      <footer className="py-12 bg-bg-accent border-t border-black/5 text-center px-6">
        <div className="max-w-[600px] mx-auto flex flex-col items-center gap-4">
          <p className="font-display italic text-3xl text-accent-color">J&P</p>
          <p className="text-xs text-text-muted font-medium uppercase tracking-[0.2em]">
            June 18, 2027 • Big Sur, California
          </p>
          <div className="h-[1px] w-12 bg-accent-color/30 my-2"></div>
          <p className="text-[11px] text-text-muted/65 font-light">
            Made with love for Jim and Pam. Hopefully, Roy doesn't show up.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
