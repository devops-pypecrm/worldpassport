interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/** Plain page shell — no fixed/sticky background image. */
export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return <main className={`min-h-screen bg-white ${className}`}>{children}</main>;
}
