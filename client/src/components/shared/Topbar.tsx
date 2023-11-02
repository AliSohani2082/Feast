'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';
// import { useUserContext } from '@/context/AuthContext'
// import { useSignOutAccount } from '@/lib/react-query/queries'
import Logo from '@/components/shared/Logo';
import { LogOut, User } from 'lucide-react';

const Topbar = () => {
  const router = useRouter();
  // const { user } = useUserContext()
  // const { mutate: signOut, isSuccess } = useSignOutAccount()

  // useEffect(() => {
  //   if (isSuccess) router.push('/')
  // }, [isSuccess])

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <div className="flex gap-3 items-center">
          <Logo size="md" />
        </div>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            // onClick={() => signOut()}
            onClick={() => console.log('wana logout')}
          >
            <LogOut />
          </Button>
          {/* <Link href={`/profile/${user.id}`} className="flex-center gap-3"> */}
          <Link href={`/profile/${123}`} className="flex-center gap-3">
            {/* {user.imageUrl ?? (
              <img
                src='/public/icons/profile-placeholder.svg'
                alt="profile"
                className="h-8 w-8 rounded-full"
              />
            ): <User/>} */}
            <User />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
