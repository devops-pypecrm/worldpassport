import LegalPage from '@/components/LegalPage';

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
  return <LegalPage title="Privacy Policy" updated="January 2024" sections={sections} />;
}
