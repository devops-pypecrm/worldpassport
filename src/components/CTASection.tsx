'use client';
import Link from 'next/link';
import { Users } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-8 sm:px-12 lg:px-16 py-16 sm:py-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/60" />

          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium">
                One Platform
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium">
                100,001+ Programs
              </span>
            </div>

            <h2 className="text-white font-bold text-3xl sm:text-4xl leading-tight mb-8">
              Ready to Start Your<br />Journey?
            </h2>

            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
              >
                Join for Free
              </Link>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-gray-900 flex items-center justify-center">
                    <Users size={12} className="text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-400 border-2 border-gray-900 flex items-center justify-center text-white text-[10px] font-bold">
                    34k
                  </div>
                </div>
                <span className="text-white/70 text-xs">Students joined us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
