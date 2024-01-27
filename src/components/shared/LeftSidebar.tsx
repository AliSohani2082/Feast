'use client';

import Image from 'next/image';
import Link from 'next/link';
import { icons, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { INavLink } from '@/types';
import { sidebarLinks } from '@/constants';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/shared/Logo';
import { toast } from 'sonner';
import { Card } from '../ui/card';

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout, user } = useAuth()
  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // signOut();
    logout();
    toast.success('You have been signed out');
  };

  return (
    <nav className="hidden md:flex bg-slate-500 px-6 py-10 flex-col border-l-2 justify-between min-w-[240px] bg-dark-2">
      <div className="flex flex-col gap-11">
        <Logo size="md" />
        {isAuthenticated ? (
          <div>
            <Card className='mb-4 p-2'>
              <Link
                href={`/user/${user?.username}`}
                className="flex flex-col gap-2 justify-center items-center"
              >
                <img
                  src={user?.imageUrl || '/public/icons/profile-placeholder.svg'}
                  alt="profile"
                  className="h-20 w-20 rounded-full"
                />
                <p className="body-bold">{user?.username}</p>
              </Link>
            </Card>

            <Button
              variant="default"
              className="shad-button_ghost w-full"
              onClick={(e) => handleSignOut(e)}
            >
              <LogOut />
              <p className="small-medium lg:base-medium">Logout</p>
            </Button>
          </div>
        ) : (
          <div>
            <Button
              variant="default"
              className="shad-button_ghost w-full"
              onClick={() => router.push("/sign-up")}
            >
              <p className="small-medium lg:base-medium">SignUp</p>
            </Button>
          </div>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            const Icon = icons[link.icon];
            return (
              <li
                key={link.label}
                className={`rounded-lg base-medium hover:bg-primary-500 transition group ${
                  isActive && 'bg-primary-500'
                }`}
              >
                <Link href={link.route} className="flex gap-4 items-center bg-white justify-between px-6 rounded-full p-4">
                  <Icon />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

    </nav>
  );
};

export default LeftSidebar;
