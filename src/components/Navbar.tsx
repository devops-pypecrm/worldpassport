'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, LogIn, ChevronDown, Video, Globe2 } from 'lucide-react';
import Logo from './Logo';
import AdminLoginModal from './AdminLoginModal';
import { useDestinations, universityLabel } from '@/lib/useDestinations';

const links = [
  { href: '/', label: 'Home' },
  { href: '/overseas', label: 'Study Destinations', dropdown: true },
  { href: '/about', label: 'About Us' },
  { href: '/b2b', label: 'Partner With Us' },
  { href: '/contact', label: 'Contact Us' },
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function Navbar() {
  const { destinations } = useDestinations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const destRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDestOpen(false); }, [pathname]);

  useEffect(() => {
    if (!destOpen) return;
    const onDown = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDestOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [destOpen]);

  // On top of the blue hero the bar is blue with white text; once scrolled it turns white.
  const solid = scrolled || mobileOpen;
  const linkBase = solid ? 'text-ink hover:text-navy' : 'text-white/90 hover:text-white';

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          solid ? 'bg-white shadow-[0_6px_24px_rgba(20,33,61,0.08)]' : 'bg-navy'
        }`}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-4">
          <Link href="/" aria-label="World Passport home"
            className={`flex-shrink-0 rounded-xl px-3 py-1.5 transition-colors ${solid ? '' : 'bg-white shadow-sm'}`}>
            <Logo size={40} />
          </Link>

          <nav className="hidden xl:flex items-center gap-1" aria-label="Main">
            {links.map((link) => {
              const active = isActive(pathname, link.href);
              if (link.dropdown) {
                return (
                  <div key={link.href} ref={destRef} className="relative"
                    onMouseEnter={() => setDestOpen(true)} onMouseLeave={() => setDestOpen(false)}>
                    <button
                      onClick={() => setDestOpen((v) => !v)}
                      aria-expanded={destOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 px-3 py-2 text-[15px] font-semibold transition-colors ${linkBase} ${active ? (solid ? '!text-navy' : '!text-white') : ''}`}
                    >
                      {link.label}
                      <ChevronDown size={16} className={`transition-transform ${destOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {destOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-1/2 top-full w-[440px] -translate-x-1/2 pt-3"
                        >
                          <div className="rounded-2xl border border-cream-200 bg-white p-3 shadow-lift">
                            <div className="grid grid-cols-2 gap-1">
                              {destinations.map((d) => (
                                <Link key={d.id} href={`/overseas?search=${encodeURIComponent(d.name)}`}
                                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-navy-50">
                                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-50 text-xs font-bold text-gold-dark">{d.code}</span>
                                  <span>
                                    <span className="block text-sm font-semibold text-ink">Study in {d.name}</span>
                                    {d.stats.unis && <span className="block text-xs text-ink-muted">{universityLabel(d.stats.unis)}</span>}
                                  </span>
                                </Link>
                              ))}
                              <Link href="/overseas" className="flex items-center gap-3 rounded-xl bg-navy-50 px-3 py-2.5 hover:bg-navy-100">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white"><Globe2 size={16} /></span>
                                <span className="text-sm font-semibold text-navy">All destinations</span>
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return (
                <Link key={link.href} href={link.href}
                  className={`relative px-3 py-2 text-[15px] font-semibold transition-colors ${linkBase} ${active ? (solid ? '!text-navy' : '!text-white') : ''}`}>
                  {link.label}
                  {active && <span className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full ${solid ? 'bg-navy' : 'bg-gold-light'}`} />}
                </Link>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center gap-2.5">
            <button onClick={() => setLoginOpen(true)} className="btn-accent !px-4 !py-2.5 text-[13px]">
              <LogIn size={15} /> Login
            </button>
            <Link href="/contact" className={`btn !px-4 !py-2.5 text-[13px] ${solid ? 'bg-brand-50 text-brand hover:bg-brand-50/70' : 'bg-white text-brand hover:bg-brand-50'}`}>
              <Video size={16} /> Book Free Counselling
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`xl:hidden flex h-11 w-11 items-center justify-center rounded-lg border ${solid ? 'border-cream-200 text-navy' : 'border-white/40 text-white'}`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="xl:hidden overflow-hidden border-t border-cream-200 bg-white"
            >
              <div className="container-x flex flex-col py-3">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}
                    className={`rounded-lg px-3 py-3 text-[15px] font-semibold ${
                      isActive(pathname, link.href) ? 'bg-navy-50 text-navy' : 'text-ink hover:bg-cream'
                    }`}>
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-wrap gap-2 px-3 pb-2 pt-1">
                  {destinations.map((d) => (
                    <Link key={d.id} href={`/overseas?search=${encodeURIComponent(d.name)}`} className="chip bg-gold-50 text-gold-dark">
                      {d.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-3 grid gap-2 border-t border-cream-200 pt-4 sm:grid-cols-2">
                  <Link href="/contact" className="btn-accent"><Video size={16} /> Book Free Counselling</Link>
                  <button onClick={() => { setMobileOpen(false); setLoginOpen(true); }} className="btn-outline">
                    <LogIn size={15} /> Login
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
