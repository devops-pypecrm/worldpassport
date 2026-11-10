'use client';
import { useEffect, useState } from 'react';

/** Total time before the splash is removed (matches the CSS timings in globals.css). */
const TOTAL_MS = 3500;
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
        {/* WP mark: a "snake" stroke travels along the W, then the P, revealing the real logo as it goes.
            Coordinates are in the logo image's own pixel space (1827 × 699). */}
        <svg className="splash-mark" viewBox="0 0 1827 699" aria-hidden="true">
          <defs>
            <mask id="wp-snake-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1827" height="480">
              <g fill="none" stroke="#fff" strokeWidth="66" strokeLinecap="round" strokeLinejoin="round">
                {/* W: from the top-left corner down the long stroke, up to the middle peak, down the right arm */}
                <path className="snake snake-w" pathLength={1} d="M607 38 L825 425 L918 262 L958 326" />
                {/* W: top bar and short arm, drawn from the same corner */}
                <path className="snake snake-w-top" pathLength={1} d="M607 38 L789 38 L878 178" />
                {/* P: from its inner corner, across the top, round the bowl, and down the stem to the bottom corner */}
                <path className="snake snake-p" pathLength={1}
                  d="M971 185 L1072 38 L1228 38 C1350 38 1350 230 1228 230 L1088 230 L955 445" />
              </g>
            </mask>
          </defs>
          <image href={LOGO} width="1827" height="699" mask="url(#wp-snake-mask)" />
        </svg>
        {/* "WORLD PASSPORT" wordmark rises in */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="" className="splash-word" />
      </div>
      <div className="splash-bar" aria-hidden="true"><span /></div>
    </div>
  );
}
