'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  Building2, Mail, Phone, LogOut, BadgeCheck, Users,
  TrendingUp, Wallet, Clock, Loader, Handshake,
} from 'lucide-react';

interface PartnerData {
  _id: string;
  name: string;
  organization: string;
  email: string;
  phone?: string;
  status: string;
  createdAt: string;
}

export default function PartnerDashboardPage() {
  const router = useRouter();
  const [partner, setPartner] = useState<PartnerData | null | undefined>(undefined);

  useEffect(() => {
    fetch('/api/partner/me')
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => setPartner(data.partner))
      .catch(() => router.push('/b2b/login'));
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/partner/logout', { method: 'POST' });
    router.push('/b2b/login');
  };

  if (partner === undefined) return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF3FA 100%)' }}>
      <Navbar />
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader size={28} className="animate-spin text-blue-500" />
      </div>
      <Footer />
    </main>
  );

  if (!partner) return null;

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF3FA 100%)' }}>
      <Navbar />

      {/* Header banner */}
      <section className="px-4 sm:px-6 lg:px-8 pt-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden px-8 py-10 sm:py-12"
            style={{ background: 'linear-gradient(135deg, #0B1120 0%, #16213E 55%, #1E1B4B 100%)' }}>
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '26px 26px' }} />
            <div className="absolute top-[-30%] right-[-5%] w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #3B82F6, transparent 70%)' }} />
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}>
                  <Handshake size={22} className="text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-2xl sm:text-3xl text-white">Welcome, {partner.name}</h1>
                  <p className="text-white/50 text-sm flex items-center gap-1.5 mt-1">
                    <Building2 size={14} /> {partner.organization}
                  </p>
                </div>
              </div>
              <button onClick={handleLogout}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white/80 border border-white/15 hover:bg-white/5 hover:text-white transition-colors self-start">
                <LogOut size={15} /> Log Out
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile card */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Account Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><Mail size={14} /> Email</span>
                  <span className="font-semibold text-sm text-gray-900">{partner.email}</span>
                </div>
                {partner.phone && (
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-gray-500 text-sm flex items-center gap-2"><Phone size={14} /> Phone</span>
                    <span className="font-semibold text-sm text-gray-900">{partner.phone}</span>
                  </div>
                )}
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><BadgeCheck size={14} /> Status</span>
                  <span className="font-semibold text-sm text-emerald-600 capitalize">{partner.status}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                  <span className="text-gray-500 text-sm flex items-center gap-2"><Clock size={14} /> Partner Since</span>
                  <span className="font-semibold text-sm text-gray-900">
                    {new Date(partner.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Placeholder stats */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-lg">
              <h3 className="font-bold text-gray-900 text-sm mb-4">Your Activity</h3>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: Users, label: 'Students Referred', value: '0', color: '#2563EB' },
                  { icon: TrendingUp, label: 'Applications In Progress', value: '0', color: '#DC2626' },
                  { icon: Wallet, label: 'Commission Earned', value: '—', color: '#059669' },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="rounded-2xl p-5 bg-gray-50 border border-gray-100 text-center">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${s.color}15` }}>
                        <Icon size={18} style={{ color: s.color }} />
                      </div>
                      <div className="font-black text-2xl text-gray-900">{s.value}</div>
                      <div className="text-gray-400 text-xs mt-1">{s.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="rounded-2xl p-5 bg-blue-50 border border-blue-100 text-center">
                <p className="text-blue-700 text-sm font-medium">
                  Student referral and application tracking tools are coming soon. Your dedicated partner
                  manager will reach out to help you submit your first students in the meantime.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
