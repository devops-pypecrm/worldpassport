'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect information you provide directly — name, email, phone number, educational background, and preferences — when you fill out our consultation forms or contact us. We also collect limited usage data (pages visited, time on site) to improve our services.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use your information solely to provide education counselling and placement services. This includes matching you with suitable programs, contacting you about your enquiry, sending relevant updates, and improving our services. We never sell your data to third parties.',
  },
  {
    title: 'Data Sharing',
    body: 'We may share your profile information with partner universities or employers strictly for the purpose of applications and placements — only with your explicit consent. We do not share data with advertisers or unrelated third parties.',
  },
  {
    title: 'Data Security',
    body: 'We implement industry-standard security measures to protect your personal information. All data is stored securely and access is restricted to authorised personnel only.',
  },
  {
    title: 'Cookies',
    body: 'Our website uses cookies to enhance your browsing experience and analyse site traffic. You can disable cookies in your browser settings, though this may affect some functionality.',
  },
  {
    title: 'Your Rights',
    body: 'You have the right to access, correct, or delete your personal data at any time. To make a request, contact us at info@gecouncil.com. We will respond within 30 days.',
  },
  {
    title: 'Contact',
    body: 'For any privacy-related questions, reach us at: info@gecouncil.com or +91 98765 43210.',
  },
];

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <Navbar />
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-white/60">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-blue-50 border border-blue-200">
                <Shield size={26} className="text-blue-600" />
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">Privacy Policy</h1>
              <p className="text-gray-500 text-sm">Last updated: January 2024</p>
            </motion.div>

            <div className="space-y-6">
              {sections.map((s, i) => (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white/90 border border-gray-100 rounded-2xl shadow-sm p-6">
                  <h2 className="font-display font-bold text-gray-900 mb-3">{s.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </PageWrapper>
  );
}
