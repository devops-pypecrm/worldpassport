'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import Logo from './Logo';
import AdminLoginModal from './AdminLoginModal';

const links = [
  { href: '/', label: 'Home' },
  { href: '/overseas', label: 'Overseas' },
  { href: '/skill', label: 'Skills' },
  { href: '/about', label: 'About Us' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-lg shadow-black/5 border-b border-gray-200/50'
            : 'bg-white/20 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">

            {/* Nav links — pill style */}
            <nav className="hidden md:flex items-center">
              <div className={`flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 ${
                scrolled ? 'bg-gray-100/80' : 'bg-white/15 backdrop-blur-sm'
              }`}>
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}
                      className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                        isActive
                          ? scrolled ? 'text-white' : 'text-white'
                          : scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-gray-700 hover:text-gray-900'
                      }`}>
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{ background: 'linear-gradient(135deg, #3B82F6, #2563EB)' }} />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Right side — Login + Logo */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">
              <button
                onClick={() => setLoginOpen(true)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  scrolled
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 border border-gray-200'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-white/30 border border-gray-300/50'
                }`}
              >
                <LogIn size={15} />
                Login
              </button>
              <Link href="/" className="flex items-center">
                <Logo size={48} animate={false} />
              </Link>
            </div>

            {/* Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                scrolled ? 'bg-gray-100 text-gray-700' : 'bg-white/20 text-gray-700 border border-gray-200/50'
              }`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/" className="flex items-center md:hidden flex-shrink-0">
              <Logo size={40} animate={false} />
            </Link>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 bg-white/95 backdrop-blur-2xl border border-gray-100 rounded-3xl p-6 flex flex-col gap-1.5 shadow-2xl"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                  pathname === link.href
                    ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-md'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-gray-100">
              <button
                onClick={() => { setMobileOpen(false); setLoginOpen(true); }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
              >
                <LogIn size={15} /> Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminLoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
