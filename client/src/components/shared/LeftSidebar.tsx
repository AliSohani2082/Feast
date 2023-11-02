'use client';

import Image from 'next/image';
import Link from 'next/link';
import { icons, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { redirect } from 'next/navigation';
import { INavLink } from '@/types';
import { sidebarLinks } from '@/constants';
import Loader from '@/components/shared/Loader';
import { Button } from '@/components/ui/button';
// import { useSignOutAccount } from '@/lib/react-query/queries'
import { useUserContext, INITIAL_USER } from '@/context/AuthContext';
import Logo from '@/components/shared/Logo';

const LeftSidebar = () => {
  const pathname = usePathname();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  // const { mutate: signOut } = useSignOutAccount()

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log('wana signout');
    // signOut()
    // setIsAuthenticated(false)
    // setUser(INITIAL_USER)
    // redirect('/sign-in')
  };

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link href="/" className="flex gap-3 items-center">
          <Logo size="md" />
        </Link>

        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link
            href={`/profile/${user.id}`}
            className="flex gap-3 items-center"
          >
            <img
              src={user.imageUrl || '/public/icons/profile-placeholder.svg'}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            const Icon = icons[link.icon];
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
              >
                <Link href={link.route} className="flex gap-4 items-center p-4">
                  <Icon />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={(e) => handleSignOut(e)}
      >
        <LogOut />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
