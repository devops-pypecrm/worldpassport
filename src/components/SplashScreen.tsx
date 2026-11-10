'use client';
import { useEffect, useState } from 'react';

/** Total time before the splash is removed (matches the CSS timings in globals.css). */
const TOTAL_MS = 3300;
const LOGO = '/assets/worldpassport-logo.png';

/**
 * Animated World Passport logo shown on first open / reload.
 * The animation is pure CSS so it starts with the server-rendered HTML,
 * before React loads; React only removes it from the page once it has finished.
 */
export default function SplashScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = setTimeout(() => setDone(true), reduce ? 1200 : TOTAL_MS);
    return () => { clearTimeout(t); document.documentElement.style.overflow = prev; };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = '';
  }, [done]);

  if (done) return null;

  return (
    <div className="splash" role="status" aria-label="Loading World Passport">
      <div className="splash-logo">
        {/* WP mark draws in from left to right */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="" className="splash-mark" fetchPriority="high" />
        {/* "WORLD PASSPORT" wordmark rises in */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="" className="splash-word" />
      </div>
      <div className="splash-bar" aria-hidden="true"><span /></div>
    </div>
  );
}
