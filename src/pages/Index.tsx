import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import LineChartCard from '../components/Dashboard/LineChartCard';
import DetailStatisticsGrid from '../components/Dashboard/DetailStatisticsGrid';
import { cn } from '@/lib/utils';

/**
 * DashboardPage Component
 *
 * This component serves as the main view for the Sales Leads Dashboard.
 * It utilizes the MainAppLayout to provide the overall page structure (sidebar, header, main content area).
 * Inside the main content area, it assembles and displays various dashboard-specific organism components:
 * - StatsCardGrid: Shows funnel counts and lead sources.
 * - LineChartCard: Displays lead tracking data over time.
 * - DetailStatisticsGrid: Presents reasons for lost leads and other miscellaneous statistics.
 *
 * The layout of these organisms within the main content area is a vertical stack with spacing,
 * achieved using Tailwind CSS grid and gap utilities, as specified in the project's layout requirements.
 */
const DashboardPage: React.FC = () => {
  return (
    <MainAppLayout>
      {/* 
        This div acts as the container for the main content sections of the dashboard.
        - 'grid': Establishes a grid layout context.
        - 'gap-6': Applies a gap of 1.5rem (24px) both vertically and horizontally between grid items. 
                   Since items are stacked vertically in a single column by default, this primarily affects vertical spacing.
        This matches the 'mainContent.container: "grid gap-y-6"' and 'mainContent.notes: "Sections are spaced using gap-6"' 
        from the Layout Requirements.
      */}
      <div className={cn('grid gap-6')}>
        <StatsCardGrid />
        <LineChartCard />
        <DetailStatisticsGrid />
      </div>
    </MainAppLayout>
  );
};

export default DashboardPage;
