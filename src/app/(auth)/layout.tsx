import { redirect } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

type authLayoutProps = {
  children: React.ReactNode;
};

const authLayout: React.FC<authLayoutProps> = ({ children }) => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    redirect('/');
  } else {
    return (
      <>
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          {children}
        </section>

        <Image
          width={1000}
          height={1000}
          src="/images/foodTable.jpeg"
          alt="side-image"
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
        />
      </>
    );
  }
};

export default authLayout;
