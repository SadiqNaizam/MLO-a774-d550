import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Plus } from 'lucide-react';

interface HeaderNavigationProps {
  className?: string;
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');

  return (
    <header
      className={cn(
        'flex items-center justify-between px-6 h-16 bg-card border-b fixed top-0 left-60 right-0 z-10',
        className
      )}
    >
      {/* Page Title: Typically managed by the page itself or layout, but example image implies it might be here */}
      {/* For this component, focusing on Tabs and Create button as per notes */}
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-foreground mr-6">Dashboard</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="">
          <TabsList className="bg-muted/60 p-1">
            <TabsTrigger value="sales" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-4 py-1.5">Sales</TabsTrigger>
            <TabsTrigger value="leads" className="text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm px-4 py-1.5">Leads</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="mr-2 h-4 w-4" />
            Create
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>New Lead</DropdownMenuItem>
          <DropdownMenuItem>New Contact</DropdownMenuItem>
          <DropdownMenuItem>New Task</DropdownMenuItem>
          <DropdownMenuItem>New Event</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default HeaderNavigation;
