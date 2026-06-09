import React, { useState, useEffect } from 'react';

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft(targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);
  return { days, hours, minutes, seconds };
}

export default function EventCountdown({
  targetDateStr = '2027-02-09T00:00:00+05:30',
  dateText = '9–11 february, 2027',
  locationText = 'in Jaipur, India',
  preambleText = 'so please join us to celebrate our story'
}) {
  const targetDate = React.useMemo(() => new Date(targetDateStr), [targetDateStr]);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(tick);
  }, [targetDate]);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <section
      style={{
        backgroundColor: '#fcf7ed',
        width: '100%',
        paddingTop: isMobile ? '2.5rem' : '4rem',
        paddingBottom: isMobile ? '4rem' : '6rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(47,36,27,0.07)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >


      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Preamble */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: isMobile ? '2.1rem' : '3.6rem',
            lineHeight: 1.45,
            color: 'var(--palette-green)',
            marginBottom: isMobile ? '1.8rem' : '2.5rem',
            letterSpacing: '0.01em',
          }}
        >
          {preambleText}
        </p>

        {/* Big date */}
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: isMobile ? '3rem' : '5.5rem',
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            marginBottom: isMobile ? '0.6rem' : '1rem',
            letterSpacing: '-0.01em',
          }}
        >
          {dateText}
        </h2>

        {/* Location */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 900,
            fontSize: isMobile ? '1.5rem' : '1.6rem',
            color: 'var(--palette-red)',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: isMobile ? '3rem' : '4.5rem',
          }}
        >
          {locationText}
        </p>

        {/* Countdown ticker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: isMobile ? '0.5rem' : '1.2rem',
          }}
        >
          {[
            { value: days, label: 'days' },
            { value: pad(hours), label: 'hours' },
            { value: pad(minutes), label: 'minutes' },
            { value: pad(seconds), label: 'seconds' },
          ].map((unit, i) => (
            <React.Fragment key={unit.label}>
              <div style={{ textAlign: 'center', minWidth: isMobile ? '52px' : '80px' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isMobile ? '2.2rem' : '3.6rem',
                    fontWeight: 400,
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                    transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                >
                  {unit.label === 'days' ? days : unit.value}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: isMobile ? '0.6rem' : '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginTop: isMobile ? '0.35rem' : '0.5rem',
                    opacity: 0.7,
                  }}
                >
                  {unit.label}
                </div>
              </div>
              {i < 3 && (
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: isMobile ? '1.8rem' : '3rem',
                    color: 'var(--text-muted)',
                    opacity: 0.35,
                    lineHeight: 1,
                    paddingTop: isMobile ? '0.2rem' : '0.25rem',
                    userSelect: 'none',
                  }}
                >
                  :
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
