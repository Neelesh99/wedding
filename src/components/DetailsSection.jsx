import React from 'react';
import { Calendar, MapPin, Plane, Hotel, Gift, Info } from 'lucide-react';

export default function DetailsSection() {
  const schedule = [
    {
      title: "Welcome Cocktails",
      date: "Thursday, June 17, 2027",
      time: "6:00 PM - 8:30 PM",
      location: "The Lodge Terrace",
      desc: "Join us for drinks and light bites as we kick off the wedding weekend."
    },
    {
      title: "Ceremony & Reception",
      date: "Friday, June 18, 2027",
      time: "4:00 PM - Midnight",
      location: "Redwood Meadow & Hall",
      desc: "The main event! Redwood forest ceremony followed by dinner, drinks, and dancing."
    },
    {
      title: "Farewell Brunch",
      date: "Saturday, June 19, 2027",
      time: "10:00 AM - Noon",
      location: "The Garden Pavilion",
      desc: "A casual drop-in breakfast before we say our goodbyes."
    }
  ];

  const travel = [
    {
      icon: <Plane className="text-accent-color" size={24} />,
      title: "Air Travel",
      desc: "We recommend flying into San Jose International Airport (SJC), which is a 1.5-hour drive from Big Sur. San Francisco International (SFO) is also an option (2.5-hour drive)."
    },
    {
      icon: <Hotel className="text-accent-color" size={24} />,
      title: "Accommodations",
      desc: "We have blocked rooms at the Redwood Mountain Lodge. Please mention the 'Palak & Neelesh Wedding' when booking before April 1st to receive our group rate."
    },
    {
      icon: <Info className="text-accent-color" size={24} />,
      title: "Local Transport",
      desc: "Shuttle transportation will be provided between the host hotels and the ceremony location starting at 3:15 PM on Friday. Self-parking is available but limited."
    }
  ];

  return (
    <section id="details" className="py-24 px-6 md:px-12 bg-white w-full border-t border-black/5 flex flex-col items-center">
      <div className="w-full max-w-[1000px]">
        
        {/* Intro */}
        <div className="text-center mb-20">
          <span className="font-display italic text-3xl text-accent-color block mb-2">So please join us</span>
          <h2 className="text-4xl md:text-6xl font-display mb-6">The Wedding Weekend</h2>
          <p className="text-lg text-text-muted max-w-[600px] mx-auto font-light">
            We can't wait to celebrate this new chapter with our favorite people in one of our absolute favorite places on earth.
          </p>
        </div>

        {/* Date & Location Big Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 bg-bg-main p-8 md:p-12 rounded-3xl border border-border-color shadow-sm">
          <div className="flex items-start gap-4">
            <Calendar className="text-accent-color shrink-0 mt-1" size={28} />
            <div>
              <h3 className="text-2xl font-semibold mb-2 font-display">When</h3>
              <p className="text-lg font-medium text-text-primary">June 18, 2027</p>
              <p className="text-sm text-text-muted mt-1">Ceremony starts promptly at 4:00 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="text-accent-color shrink-0 mt-1" size={28} />
            <div>
              <h3 className="text-2xl font-semibold mb-2 font-display">Where</h3>
              <p className="text-lg font-medium text-text-primary">Redwood Mountain Lodge</p>
              <p className="text-sm text-text-muted mt-1">Big Sur, California</p>
            </div>
          </div>
        </div>

        {/* Event Schedule */}
        <div className="mb-24">
          <h3 className="text-3xl font-display text-center mb-12">The Schedule</h3>
          <div className="space-y-6">
            {schedule.map((event, idx) => (
              <div 
                key={idx} 
                className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-bg-surface hover:bg-bg-accent transition-colors duration-300 border border-border-color rounded-2xl"
              >
                <div className="md:w-1/4 mb-2 md:mb-0">
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent-color block">{event.date}</span>
                  <span className="text-sm text-text-muted mt-1 block">{event.time}</span>
                </div>
                <div className="md:w-1/2 mb-4 md:mb-0">
                  <h4 className="text-2xl font-display mb-1">{event.title}</h4>
                  <p className="text-sm text-text-muted font-light">{event.desc}</p>
                </div>
                <div className="md:w-1/4 text-left md:text-right flex items-center md:justify-end gap-1 text-sm text-accent-color font-medium">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel & Lodging */}
        <div className="mb-24">
          <h3 className="text-3xl font-display text-center mb-12">Travel & Logistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travel.map((item, idx) => (
              <div key={idx} className="p-8 bg-bg-surface border border-border-color rounded-2xl flex flex-col items-center text-center shadow-sm">
                <div className="w-12 h-12 bg-bg-accent rounded-full flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h4 className="text-2xl font-display mb-4">{item.title}</h4>
                <p className="text-sm text-text-muted font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Registry Section */}
        <div className="p-8 md:p-12 bg-bg-accent border border-border-color rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Gift className="text-accent-color" size={26} />
            </div>
            <div>
              <h3 className="text-2xl font-display mb-2">Our Wedding Registry</h3>
              <p className="text-sm text-text-muted font-light max-w-[500px]">
                Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have created a registry for our honeymoon fund and home goals.
              </p>
            </div>
          </div>
          <button className="btn-primary shrink-0 flex items-center gap-2">
            View Registry
          </button>
        </div>

      </div>
    </section>
  );
}
