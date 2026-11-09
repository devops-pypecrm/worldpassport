'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { LogIn, Loader, ArrowLeft, Eye, EyeOff, Handshake, CheckCircle } from 'lucide-react';

export default function PartnerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/partner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/b2b/dashboard');
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-600/15 transition-all text-sm';

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <section className="px-4 sm:px-6 lg:px-8 py-10 min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <Link href="/b2b" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft size={15} /> Back to Partner With Us
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl shadow-gray-200/60">

            {/* Left panel */}
            <div className="hidden lg:flex lg:col-span-2 relative p-10 flex-col justify-between"
              style={{ background: '#1B2B5A' }}>
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '26px 26px' }} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: '#C2922F' }}>
                  <Handshake size={22} className="text-white" />
                </div>
                <h2 className="font-display font-semibold text-3xl text-white mb-3 leading-tight">Welcome Back, Partner</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Sign in to manage your student referrals and track your partnership with World Passport.
                </p>
              </div>
              <div className="relative z-10 space-y-3 mt-10">
                {['Live application status', 'Commission overview', 'Direct partner support'].map(item => (
                  <div key={item} className="flex items-center gap-2.5 text-white/70 text-sm">
                    <CheckCircle size={15} className="text-gold-light flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel — form */}
            <div className="lg:col-span-3 bg-white p-8 sm:p-12">
              <h1 className="font-display font-semibold text-3xl text-navy-900 mb-1">Partner Login</h1>
              <p className="text-gray-500 text-sm mb-6">Sign in to your World Passport partner account.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address" className={inputClass} />
                <div className="relative">
                  <input required type={showPassword ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" className={inputClass} style={{ paddingRight: 44 }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold transition-all hover:scale-[1.01] shadow-lg disabled:opacity-60"
                  style={{ background: '#1B2B5A' }}>
                  {loading ? <Loader size={16} className="animate-spin" /> : <LogIn size={16} />}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <p className="text-center text-gray-400 text-xs mt-6">
                Not a partner yet?{' '}
                <Link href="/b2b#partner-form" className="text-navy font-semibold hover:underline">Apply here</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
