'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, MapPin } from 'lucide-react';
import type { Destination } from '@/lib/destinations';
import { universityLabel } from '@/lib/useDestinations';

interface Props {
  destinations: Destination[];
  value: string;
  onChange: (id: string) => void;
}

/** Full-width destination picker used on the Study Destinations page. */
export default function DestinationSelect({ destinations, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selected = destinations.find((d) => d.id === value);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); } };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const pick = (id: string) => {
    onChange(id);
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={ref} className="relative mt-10">
      <p id="destination-select-label" className="mb-2 text-sm font-semibold text-navy-900">Choose a study destination</p>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="destination-select-label"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-4 rounded-2xl border bg-white px-4 py-3.5 text-left shadow-card transition-colors sm:px-5 ${
          open ? 'border-navy ring-2 ring-navy/15' : 'border-cream-200 hover:border-navy-200'
        }`}
      >
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold-50 text-sm font-bold text-gold-dark">
          {selected?.code || <MapPin size={18} />}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate font-display text-lg font-semibold text-navy-900">
            {selected ? `Study in ${selected.name}` : 'Select a destination'}
          </span>
          {selected?.tagline && <span className="block truncate text-sm text-ink-muted">{selected.tagline}</span>}
        </span>
        <span className="hidden flex-shrink-0 text-sm text-ink-muted sm:block">
          {destinations.length} destination{destinations.length === 1 ? '' : 's'}
        </span>
        <ChevronDown size={20} className={`flex-shrink-0 text-navy transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-labelledby="destination-select-label"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full z-30 mt-2 grid max-h-[60vh] gap-1 overflow-y-auto rounded-2xl border border-cream-200 bg-white p-2 shadow-lift sm:grid-cols-2 lg:grid-cols-3"
          >
            {destinations.map((d) => {
              const on = d.id === value;
              return (
                <li key={d.id} role="option" aria-selected={on}>
                  <button
                    type="button"
                    onClick={() => pick(d.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      on ? 'bg-navy text-white' : 'hover:bg-navy-50'
                    }`}
                  >
                    <span className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      on ? 'bg-white/15 text-gold-light' : 'bg-gold-50 text-gold-dark'
                    }`}>{d.code}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-sm font-semibold ${on ? 'text-white' : 'text-ink'}`}>Study in {d.name}</span>
                      <span className={`block truncate text-xs ${on ? 'text-white/70' : 'text-ink-muted'}`}>
                        {[universityLabel(d.stats.unis), d.tag].filter(Boolean).join(' · ') || d.tagline}
                      </span>
                    </span>
                    {on && <Check size={16} className="flex-shrink-0 text-gold-light" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
