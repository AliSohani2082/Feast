'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { icons } from 'lucide-react';

import { bottombarLinks } from '@/constants';

const Bottombar = () => {
  const pathname = usePathname();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        const Icon = icons[link.icon];
        return (
          <Link
            key={`bottombar-${link.label}`}
            href={link.route}
            className={`${
              isActive && 'rounded-[10px] bg-primary-500 '
            } flex-center flex-col gap-1 p-2 transition`}
          >
            <Icon />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
