import React from 'react';
import Bottombar from '@/components/shared/Bottombar';
import Topbar from '@/components/shared/Topbar';
import LeftSidebar from '@/components/shared/LeftSidebar';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const dashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      <main className='w-full'>{children}</main>
      <Bottombar />
    </div>
  );
};

export default dashboardLayout;
