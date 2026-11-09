import LegalPage from '@/components/LegalPage';

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
  return <LegalPage title="Terms of Service" updated="January 2024" sections={sections} />;
}
