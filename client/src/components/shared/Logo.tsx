import React from 'react';
import { Shell } from 'lucide-react';
import Link from 'next/link';

type LogoProps = {
  size: 'sm' | 'md';
};

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  return (
    <Link href="/" className="flex items-center justify-center gap-2">
      <Shell
        size={size === 'md' ? 40 : 5}
        className="text-gradi from-indigo-500 via-purple-500 to-pink-500"
      />
      {size === 'md' && (
        <span className="text-2xl font-sans font-bold">Feast</span>
      )}
    </Link>
  );
};

export default Logo;
