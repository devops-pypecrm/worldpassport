'use client';
import Image from 'next/image';

interface LogoProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export default function Logo({ size = 44, className = '' }: LogoProps) {
  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden ml-0 ${className}`}
      style={{ height: size }}
    >
      <Image
        src="/assets/logo2.png"
        alt="World Passport"
        width={420}
        height={70}
        className="object-contain"
        style={{
          height: size * 3.5,
          width: 'auto',
          maxWidth: 280,
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
        priority
      />
    </div>
  );
}
