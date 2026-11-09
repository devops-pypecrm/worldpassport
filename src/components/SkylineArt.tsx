/** Decorative line-art of a university campus, drawn as faint strokes on the blue hero bands. */
export default function SkylineArt({ className = '' }: { className?: string }) {
  const columns = Array.from({ length: 9 }, (_, i) => 330 + i * 30);
  const windows = Array.from({ length: 7 }, (_, i) => 60 + i * 34);
  const windowsR = Array.from({ length: 7 }, (_, i) => 650 + i * 34);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 960 420"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* ground */}
      <path d="M0 400 H960" />
      {/* left wing */}
      <path d="M40 400 V250 H300 V400" />
      <path d="M40 250 L170 200 L300 250" />
      {windows.map((x) => (
        <path key={`l${x}`} d={`M${x} 380 V300 a10 10 0 0 1 20 0 V380 Z`} />
      ))}
      {/* left tower */}
      <path d="M90 250 V150 H130 V250 M90 150 L110 100 L130 150 M110 100 V80" />
      {/* central portico */}
      <path d="M310 400 V230 H630 V400" />
      <path d="M300 230 L470 165 L640 230 Z" />
      {columns.map((x) => (
        <path key={`c${x}`} d={`M${x} 390 V245 M${x + 12} 390 V245`} />
      ))}
      <path d="M310 245 H630 M310 390 H630" />
      {/* dome */}
      <path d="M400 165 V140 H540 V165" />
      <path d="M410 140 C410 70 530 70 530 140" />
      <path d="M440 140 C440 95 500 95 500 140 M470 78 V45 M462 52 H478" />
      <circle cx="470" cy="118" r="10" />
      {/* right wing */}
      <path d="M640 400 V250 H920 V400" />
      <path d="M640 250 L780 200 L920 250" />
      {windowsR.map((x) => (
        <path key={`r${x}`} d={`M${x} 380 V300 a10 10 0 0 1 20 0 V380 Z`} />
      ))}
      {/* right spires */}
      <path d="M840 250 V130 H880 V250 M840 130 L860 60 L880 130 M860 60 V35" />
      <path d="M700 200 V150 L715 110 L730 150 V200" />
    </svg>
  );
}
