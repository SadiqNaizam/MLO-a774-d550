import React from 'react';
import { cn } from '@/lib/utils';
import HeaderNavigation from '../Dashboard/HeaderNavigation'; // Relative path from src/components/layout to src/components/Dashboard

interface HeaderProps {
  className?: string;
  // title?: string; // If title needed to be dynamic, pass to HeaderNavigation
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  // The HeaderNavigation component already implements most of the styling
  // and positioning requirements defined in 'Layout Requirements > header'.
  // This includes: fixed positioning, height (h-16), background (bg-card, which is bg-surface),
  // padding, border, and z-index.
  // This Header component acts as a semantic wrapper within the main layout structure.
  return (
    <HeaderNavigation className={cn(className)} />
  );
};

export default Header;
