'use client';

interface PageWrapperProps {
  children: React.ReactNode;
  bg?: string;
}

export default function PageWrapper({ children, bg = '/assets/page-bg.jpg' }: PageWrapperProps) {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat relative"
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <div className="absolute inset-0 bg-white/60" />
      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}
