import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <Sidebar />
      <Header />
      <main
        className={cn(
          'ml-60', // Offset for the fixed sidebar (w-60)
          'mt-16', // Offset for the fixed header (h-16, which is 4rem)
          'min-h-[calc(100vh-4rem)]', // Ensure main content can fill vertical space
          'p-6', // Padding as per Layout Requirements > mainContent > layout
          'overflow-y-auto', // Scrollable content area as per Layout Requirements > mainContent > sizing
          'min-w-0' // Essential for proper rendering of flex/grid children, prevents overflow
        )}
      >
        {/* The 'mainContent.container: "grid gap-y-6"' (or gap-6 from notes) 
            is intended for the direct children/sections within this main content area.
            This structure will be provided by the page component rendering inside this layout.
            For example, DashboardPage will wrap its organisms in a div with these grid/gap classes. */}
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
