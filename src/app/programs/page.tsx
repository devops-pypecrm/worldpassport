'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BookOpen, Building2, MapPin, Clock, Wallet, CalendarDays, ArrowRight, SlidersHorizontal, X, Loader, SearchX,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import { useDestinations } from '@/lib/useDestinations';
import {
  Program, PROGRAM_LEVELS, buildProgramsUrl, fetchPrograms, filterPrograms, uniqueValues,
} from '@/lib/programs';

export default function ProgramsPage() {
  return (
    <Suspense fallback={null}>
      <ProgramsContent />
    </Suspense>
  );
}

function ProgramsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const filters = {
    program: params.get('program') || '',
    country: params.get('country') || '',
    level: params.get('level') || '',
  };

  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { destinations } = useDestinations();

  useEffect(() => {
    fetchPrograms()
      .then(setPrograms)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const programOptions = useMemo(() => uniqueValues(programs.map((p) => p.title)), [programs]);
  const countryOptions = useMemo(
    () => uniqueValues([...destinations.map((d) => d.name), ...programs.map((p) => p.country)]),
    [destinations, programs],
  );
  const levelOptions = useMemo(() => uniqueValues([...PROGRAM_LEVELS, ...programs.map((p) => p.level)]), [programs]);

  const results = useMemo(
    () => filterPrograms(programs, filters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [programs, filters.program, filters.country, filters.level],
  );

  const setFilter = (key: keyof typeof filters, value: string) => {
    router.replace(buildProgramsUrl({ ...filters, [key]: value }), { scroll: false });
  };
  const clearAll = () => router.replace('/programs', { scroll: false });

  const active = (Object.entries(filters) as [keyof typeof filters, string][]).filter(([, v]) => v);
  const filterLabel: Record<keyof typeof filters, string> = { program: 'Program', country: 'Destination', level: 'Level' };

  return (
    <PageWrapper>
      <Navbar />

      <PageHero
        crumbs={[{ label: 'Programs' }]}
        eyebrow="Find your program"
        title="Explore all programs"
        lead="Browse every program offered through our partner universities. Filter by program, destination and study level to find the right fit."
      />

      <section className="section pt-10 sm:pt-12 lg:pt-14">
        <div className="container-x">
          {/* Filters */}
          <div className="card p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
              <SlidersHorizontal size={16} /> Filter programs
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
              <div>
                <label htmlFor="f-program" className="field-label">Program</label>
                <select id="f-program" className="field" value={filters.program} onChange={(e) => setFilter('program', e.target.value)}>
                  <option value="">All programs</option>
                  {/* Keep a value from the URL selectable even if it is not in the list */}
                  {filters.program && !programOptions.some((o) => o.toLowerCase() === filters.program.toLowerCase()) && (
                    <option value={filters.program}>{filters.program}</option>
                  )}
                  {programOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="f-country" className="field-label">Destination</label>
                <select id="f-country" className="field" value={filters.country} onChange={(e) => setFilter('country', e.target.value)}>
                  <option value="">Any destination</option>
                  {filters.country && !countryOptions.some((o) => o.toLowerCase() === filters.country.toLowerCase()) && (
                    <option value={filters.country}>{filters.country}</option>
                  )}
                  {countryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="f-level" className="field-label">Study level</label>
                <select id="f-level" className="field" value={filters.level} onChange={(e) => setFilter('level', e.target.value)}>
                  <option value="">Any study level</option>
                  {filters.level && !levelOptions.some((o) => o.toLowerCase() === filters.level.toLowerCase()) && (
                    <option value={filters.level}>{filters.level}</option>
                  )}
                  {levelOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {active.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-cream-200 pt-4">
                {active.map(([k, v]) => (
                  <button key={k} onClick={() => setFilter(k, '')}
                    className="chip bg-navy-50 text-navy hover:bg-navy-100">
                    {filterLabel[k]}: <span className="font-semibold">{v}</span> <X size={12} />
                  </button>
                ))}
                <button onClick={clearAll} className="text-xs font-semibold text-brand hover:underline">Clear all</button>
              </div>
            )}
          </div>

          {/* Results */}
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-24 text-ink-muted">
              <Loader size={18} className="animate-spin" /> Loading programs…
            </div>
          ) : error ? (
            <EmptyState title="We couldn't load programs" text="Please refresh the page or try again in a moment." />
          ) : programs.length === 0 ? (
            <EmptyState title="No programs listed yet" text="New programs are being added. Talk to a counsellor and we'll tell you what's open for your profile." />
          ) : results.length === 0 ? (
            <EmptyState title="No programs match your filters" text="Try removing a filter, or speak to a counsellor for options that fit your profile."
              action={<button onClick={clearAll} className="btn-outline">Show all programs</button>} />
          ) : (
            <>
              <p className="mb-5 mt-8 text-sm text-ink-muted">
                Showing <span className="font-semibold text-navy-900">{results.length}</span> of {programs.length} program{programs.length === 1 ? '' : 's'}
              </p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((p) => <ProgramCard key={p._id} p={p} />)}
              </div>
            </>
          )}
        </div>
      </section>

      <div className="pb-16">
        <CTASection title="Not sure which program fits you?" lead="Book a free counselling session and we'll shortlist programs that match your grades, goals and budget." />
      </div>
      <Footer />
    </PageWrapper>
  );
}

function ProgramCard({ p }: { p: Program }) {
  const meta = [
    { icon: Clock, label: 'Duration', value: p.duration },
    { icon: Wallet, label: 'Tuition', value: p.tuitionFee },
    { icon: CalendarDays, label: 'Intake', value: p.intake },
  ].filter((m) => m.value);

  return (
    <article className="card card-hover flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy"><BookOpen size={20} /></span>
        <span className="chip bg-gold-50 text-gold-dark">{p.level}</span>
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-navy-900">{p.title}</h3>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-ink"><Building2 size={14} className="text-ink-soft" /> {p.university}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted"><MapPin size={14} className="text-brand" /> {p.country}</p>
      {p.description && <p className="mt-3 line-clamp-3 text-sm text-ink-muted">{p.description}</p>}

      {meta.length > 0 && (
        <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-cream p-3">
          {meta.map((m) => (
            <div key={m.label} className="min-w-0">
              <dt className="flex items-center gap-1 text-[11px] text-ink-soft"><m.icon size={12} /> {m.label}</dt>
              <dd className="mt-0.5 truncate text-xs font-semibold text-navy-900" title={m.value}>{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-auto pt-5">
        <Link href="/contact" className="btn-accent w-full">Apply now <ArrowRight size={15} /></Link>
      </div>
    </article>
  );
}

function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-cream-200 bg-cream px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy shadow-card"><SearchX size={24} /></span>
      <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-ink-muted">{text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {action}
        <Link href="/contact" className="btn-accent">Talk to a counsellor</Link>
      </div>
    </div>
  );
}
