import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'World Passport | Study Abroad Admissions & Counselling',
  description:
    'World Passport guides Indian students to accredited universities abroad — course selection, applications, scholarships, visas and arrival support, all in one place.',
  keywords: 'study abroad, overseas education, university admissions, student visa, European universities, India',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
