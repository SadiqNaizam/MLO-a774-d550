import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  User,
  FileText,
  FileStack,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings as SettingsIcon, // Renamed to avoid conflict with potential Settings component
  ChevronsLeftRight, // Icon for the company logo placeholder
} from 'lucide-react';

// Assuming a Link component from react-router-dom or Next.js for navigation
// For this example, we'll use <a> tags and manage active state internally.
// In a real app, use <Link to="..."> from react-router-dom.

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

const mainNavItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutGrid, href: '#' },
  { name: 'Leads', icon: Users, href: '#' },
  { name: 'Customers', icon: User, href: '#' },
  { name: 'Proposals', icon: FileText, href: '#' },
  { name: 'Invoices', icon: FileStack, href: '#' },
  { name: 'Items', icon: ShoppingCart, href: '#' },
  { name: 'Mail', icon: Mail, href: '#' },
  { name: 'Shoebox', icon: Archive, href: '#' },
  { name: 'Calendar', icon: CalendarDays, href: '#' },
];

const secondaryNavItems: NavItem[] = [
  { name: 'Help', icon: HelpCircle, href: '#' },
  { name: 'Settings', icon: SettingsIcon, href: '#' },
];

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [activeItem, setActiveItem] = React.useState<string>('Dashboard');

  // In a real app, activeItem would likely come from router context

  const renderNavItem = (item: NavItem, isMain: boolean) => {
    const isActive = activeItem === item.name;
    return (
      <a
        key={item.name}
        href={item.href}
        onClick={(e) => {
          e.preventDefault(); // Prevent page reload for demo
          setActiveItem(item.name);
        }}
        className={cn(
          'flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
          isActive
            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
            : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          isMain ? 'space-x-3' : 'space-x-3'
        )}
      >
        <item.icon className={cn('h-5 w-5', isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground/80')} />
        <span>{item.name}</span>
      </a>
    );
  };

  return (
    <div className={cn('h-full flex flex-col bg-sidebar text-sidebar-foreground', className)}>
      {/* Logo/Brand Placeholder - As per layout hints, a logo would be at the top of the sidebar container */}
      {/* This SidebarNav component focuses on the navigation list itself */}
      <div className="p-4 border-b border-sidebar-border">
        <a href="#" className="flex items-center space-x-2 group">
            <ChevronsLeftRight className="h-8 w-8 text-primary p-1 rounded-lg bg-primary/10" />
            <span className="font-bold text-xl text-foreground">Company</span>
        </a>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
        {mainNavItems.map(item => renderNavItem(item, true))}
      </nav>

      <div className="mt-auto p-4 space-y-1 border-t border-sidebar-border">
        {secondaryNavItems.map(item => renderNavItem(item, false))}
      </div>
    </div>
  );
};

export default SidebarNav;
