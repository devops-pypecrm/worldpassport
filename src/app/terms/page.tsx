'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageWrapper from '@/components/PageWrapper';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing or using the World Passport website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.',
  },
  {
    title: 'Services Provided',
    body: 'GEC provides education counselling, university application support, skill development guidance, and recruitment placement services. We act as an intermediary between students and educational institutions or employers. Admission and placement decisions remain with the respective institutions and employers.',
  },
  {
    title: 'User Responsibilities',
    body: 'You agree to provide accurate and complete information in all forms and applications. Providing false information may result in termination of services without refund. You are responsible for meeting all eligibility requirements set by partner institutions.',
  },
  {
    title: 'Fees and Payments',
    body: 'All service fees are communicated transparently before engagement. Fees are non-refundable once services have commenced, except in cases where GEC fails to deliver agreed services. Any refund claims must be submitted within 30 days of service commencement.',
  },
  {
    title: 'Limitation of Liability',
    body: 'GEC provides guidance and support but cannot guarantee admission, visa approval, scholarship awards, or employment. Our liability is limited to the fees paid for our services. We are not responsible for decisions made by third-party institutions, embassies, or employers.',
  },
  {
    title: 'Intellectual Property',
    body: 'All content on this website — including text, images, logos, and graphics — is the intellectual property of World Passport. Reproduction without written permission is prohibited.',
  },
  {
    title: 'Governing Law',
    body: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.',
  },
  {
    title: 'Changes to Terms',
    body: 'We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.',
  },
];

export default function TermsPage() {
  return (
    <PageWrapper>
      <Navbar />
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-white/60">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-blue-50 border border-blue-200">
                <FileText size={26} className="text-blue-600" />
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-3">Terms of Service</h1>
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
