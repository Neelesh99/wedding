import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    {
      q: "What is the dress code?",
      a: "The dress code is cocktail attire or semi-formal. Note that our ceremony will be held outdoors in a redwood grove, so we recommend block heels, wedges, or flats for walking on wood chips and soil."
    },
    {
      q: "Are kids welcome?",
      a: "While we love your little ones, our wedding weekend will be an adults-only celebration. We appreciate your understanding and hope you can join us for a night off!"
    },
    {
      q: "Can I bring a plus-one?",
      a: "Due to strict venue capacity constraints, we can only accommodate guests who are explicitly listed on your invitation. If your invitation includes a guest, you will see their RSVP option when you submit your RSVP below."
    },
    {
      q: "Will the events be indoors or outdoors?",
      a: "The ceremony will be outdoors under the redwoods. The cocktail hour will be on an outdoor terrace, and dinner/dancing will take place indoors with a covered patio area."
    },
    {
      q: "By when should I submit my RSVP?",
      a: "Please submit your RSVP using the online form below by May 1st, 2027. This helps us finalize our seating arrangement and catering orders."
    },
    {
      q: "What if I have dietary restrictions?",
      a: "Please let us know about any food allergies or dietary needs when you RSVP. The caterer will be prepared to accommodate vegetarian, vegan, gluten-free, and nut-free requests."
    }
  ];

  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-12 bg-bg-surface w-full border-t border-black/5 flex flex-col items-center">
      <div className="w-full max-w-[800px]">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-display italic text-3xl text-accent-color block mb-2">Have questions?</span>
          <h2 className="text-4xl md:text-5xl font-display mb-4">Frequently Asked Questions</h2>
          <p className="text-base text-text-muted max-w-[500px] mx-auto font-light">
            Here are some quick details to help you plan your trip. If you have any other questions, please reach out to us!
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="bg-white border border-border-color rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)'
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-bg-accent/30 transition-colors duration-200"
                >
                  <span className="text-lg font-medium text-text-primary pr-4">{faq.q}</span>
                  <ChevronDown 
                    className="text-text-muted shrink-0 transition-transform duration-300" 
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    size={20}
                  />
                </button>
                
                <div 
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? '200px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    visibility: isOpen ? 'visible' : 'hidden',
                    overflow: 'hidden'
                  }}
                >
                  <div className="p-6 pt-0 border-t border-black/5 text-sm text-text-muted leading-relaxed font-light">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
