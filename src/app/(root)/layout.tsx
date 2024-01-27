import React from 'react';
import Bottombar from '@/components/shared/Bottombar';
import Topbar from '@/components/shared/Topbar';
import LeftSidebar from '@/components/shared/LeftSidebar';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const dashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="felx flex-row justify-start items-stretch w-screen h-screen fixed md:flex">
      {/* <Topbar /> */}
      <LeftSidebar />
      <main className='w-full flex flex-col justify-center items-center'>{children}</main>
      {/* <Bottombar /> */}
    </div>
  );
};

export default dashboardLayout;
