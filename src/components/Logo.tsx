'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  animate?: boolean;
  className?: string;
}

export default function Logo({ size = 44, animate = true, className = '' }: LogoProps) {
  return (
    <motion.div
      className={`relative flex-shrink-0 ${className}`}
      style={{ height: size }}
      initial={animate ? { opacity: 0, scale: 0.85 } : false}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    >
      <Image
        src="/assets/worldpassport-logo.png"
        alt="World Passport"
        width={1827}
        height={699}
        className="object-contain"
        style={{ height: size, width: 'auto' }}
        priority
      />
    </motion.div>
  );
}
