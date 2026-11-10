'use client';
import { useEffect, useState } from 'react';
import { Destination, defaultDestinations } from './destinations';

interface DestinationDoc extends Omit<Destination, 'id'> { _id: string }

const toDestination = (d: DestinationDoc): Destination => ({
  id: d._id,
  code: d.code,
  name: d.name,
  tagline: d.tagline || '',
  tag: d.tag || '',
  stats: {
    unis: d.stats?.unis || '',
    avgCost: d.stats?.avgCost || '',
    acceptance: d.stats?.acceptance || '',
    intl: d.stats?.intl || '',
  },
  highlights: d.highlights || [],
  topUnis: d.topUnis || [],
  programs: d.programs || [],
  salary: d.salary || '',
});

// One request shared by every component on the page (navbar, sections, footer…).
let cache: Destination[] | null = null;
let pending: Promise<Destination[]> | null = null;

function loadDestinations() {
  if (!pending) {
    pending = fetch('/api/admin/destinations', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('Failed to load destinations'))))
      .then((data) => (Array.isArray(data.destinations) ? data.destinations.map(toDestination) : []))
      .catch(() => defaultDestinations) // database unreachable: show the built-in list
      .then((list) => { cache = list; return list; });
  }
  return pending;
}

/** Study destinations from the database, in the order set in the admin panel. */
export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>(cache || []);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;
    let alive = true;
    loadDestinations().then((list) => {
      if (alive) { setDestinations(list); setLoading(false); }
    });
    return () => { alive = false; };
  }, []);

  return { destinations, loading };
}

const WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
/** 5 -> "Five", 14 -> "14" */
export const countWord = (n: number) => WORDS[n] ?? String(n);

export const universityLabel = (unis: string) =>
  unis ? `${unis} ${unis.trim() === '1' ? 'university' : 'universities'}` : '';
