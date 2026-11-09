import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SkylineArt from './SkylineArt';

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
}

/** Inner-page header: blue band with curved bottom, breadcrumb and white title. */
export default function PageHero({ eyebrow, title, lead, crumbs = [], children, aside }: PageHeroProps) {
  return (
    <section className="hero-blue">
      <SkylineArt className="absolute bottom-8 right-[-120px] w-[900px] max-w-none text-white/[0.12]" />
      <div className="container-x relative pb-20 pt-8 sm:pb-24 sm:pt-10 lg:pb-28">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-white/75">
            <Link href="/" className="hover:text-white">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight size={14} className="text-white/50" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span className="font-semibold text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={`grid gap-10 ${aside ? 'lg:grid-cols-[1.4fr_1fr] items-center' : ''}`}>
          <div className="max-w-3xl">
            {eyebrow && (
              <span className="inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white">{eyebrow}</span>
            )}
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl">{title}</h1>
            {lead && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">{lead}</p>}
            {children && <div className="hero-actions mt-8">{children}</div>}
          </div>
          {aside && <div className="text-ink">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
