import React, { useState, useEffect } from 'react';

// Target: first day of the wedding, 9 February 2027, midnight IST (UTC+5:30)
const TARGET_DATE = new Date('2027-02-09T00:00:00+05:30');

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET_DATE - now;
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

export default function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(tick);
  }, []);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <section
      style={{
        backgroundColor: '#fcf7ed',
        width: '100%',
        paddingTop: isMobile ? '5rem' : '8rem',
        paddingBottom: isMobile ? '5rem' : '8rem',
        textAlign: 'center',
        borderBottom: '1px solid rgba(47,36,27,0.07)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle decorative ring (background) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '340px' : '600px',
          height: isMobile ? '340px' : '600px',
          borderRadius: '50%',
          border: '1px solid rgba(138, 90, 43, 0.08)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '480px' : '820px',
          height: isMobile ? '480px' : '820px',
          borderRadius: '50%',
          border: '1px solid rgba(138, 90, 43, 0.04)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Preamble */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: isMobile ? '1.1rem' : '1.35rem',
            color: 'var(--text-muted)',
            marginBottom: isMobile ? '1.8rem' : '2.5rem',
            letterSpacing: '0.01em',
          }}
        >
          so please join us to celebrate our story
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
          9–11 february, 2027
        </h2>

        {/* Location */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: isMobile ? '0.7rem' : '0.78rem',
            color: 'var(--accent-color)',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: isMobile ? '3rem' : '4.5rem',
          }}
        >
          📍 Jaipur, India
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
