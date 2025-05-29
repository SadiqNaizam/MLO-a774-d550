import React from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from '../Dashboard/SidebarNav'; // Relative path from src/components/layout to src/components/Dashboard

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen w-60 border-r border-sidebar-border',
        // SidebarNav is expected to fill this aside and provide its own background (bg-sidebar)
        // w-60 is from Layout Requirements: layout.sizing.sidebar
        // z-20 to ensure it's above main content background, header is typically z-10 or z-30 if overlapping
        // Given Header is left-60, they don't overlap, z-ordering mainly for modals etc.
        className
      )}
    >
      {/* SidebarNav handles its own internal structure, background, and text colors */}
      <SidebarNav />
    </aside>
  );
};

export default Sidebar;
