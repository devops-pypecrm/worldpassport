import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Study Abroad', href: '/overseas' },
      { label: 'About Us', href: '/about' },
      { label: 'Partner With Us', href: '/b2b' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Albania', href: '/overseas?search=albania' },
      { label: 'Malta', href: '/overseas?search=malta' },
      { label: 'Malaysia', href: '/overseas?search=malaysia' },
      { label: 'Mauritius', href: '/overseas?search=mauritius' },
      { label: 'Montenegro', href: '/overseas?search=montenegro' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Partner Login', href: '/b2b/login' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="container-x py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block rounded-xl bg-white px-4 py-3">
              <Image src="/assets/worldpassport-logo.png" alt="World Passport" width={1827} height={699}
                style={{ height: 40, width: 'auto' }} />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Study-abroad counselling and admissions support for Indian students, from choosing a
              course to settling in on campus.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li><a href="tel:+919205031277" className="flex items-center gap-2.5 hover:text-white"><Phone size={14} className="text-gold-light" /> +91 92050 31277</a></li>
              <li><a href="mailto:bm@worldpassport.in" className="flex items-center gap-2.5 hover:text-white"><Mail size={14} className="text-gold-light" /> bm@worldpassport.in</a></li>
              <li className="flex items-start gap-2.5"><MapPin size={14} className="mt-0.5 text-gold-light flex-shrink-0" /> Offices in Noida, Kochi &amp; Dubai</li>
            </ul>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 font-display text-base font-semibold text-white">{col.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-white">Not sure where to start?</p>
            <p className="text-sm">Talk to a counsellor. The first session is free.</p>
          </div>
          <Link href="/contact" className="btn-gold">Book a session <ArrowRight size={15} /></Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs sm:flex-row">
          <p>&copy; {new Date().getFullYear()} World Passport. All rights reserved.</p>
          <p className="text-white/50">Accredited universities · Transparent fees · End-to-end guidance</p>
        </div>
      </div>
    </footer>
  );
}
