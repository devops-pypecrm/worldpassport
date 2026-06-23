'use client';
import Link from 'next/link';
import Logo from './Logo';

const columns = [
  {
    title: 'Resources',
    links: [
      { label: 'Study Guidance', href: '/overseas' },
      { label: 'Case Studies', href: '#' },
      { label: 'Student Success Stories', href: '#' },
      { label: 'Scholarship Finder', href: '#' },
      { label: 'Country Guides', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Press & Media', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Live Chat', href: '#' },
      { label: 'Partners', href: '#' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: '+91 9205031277', href: 'tel:+919205031277' },
      { label: 'bm@worldpassport.in', href: 'mailto:bm@worldpassport.in' },
      { label: 'India & Europe offices', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo size={32} className="brightness-0 invert" />
            </Link>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            {['facebook', 'twitter', 'youtube', 'instagram'].map((social) => (
              <a
                key={social}
                href="#"
                aria-label={social}
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <span className="text-xs font-bold uppercase">{social.charAt(0)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
