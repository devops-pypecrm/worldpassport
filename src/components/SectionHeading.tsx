interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow, title, lead, align = 'center', light = false, className = '',
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-4 ${light ? '!text-gold-light' : ''}`}>{eyebrow}</p>
      )}
      <h2 className={`heading-lg ${light ? '!text-white' : ''}`}>{title}</h2>
      {lead && (
        <p className={`lead mt-4 ${light ? '!text-white/70' : ''}`}>{lead}</p>
      )}
    </div>
  );
}
