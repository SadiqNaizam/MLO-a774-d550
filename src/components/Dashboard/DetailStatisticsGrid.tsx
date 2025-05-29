import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReasonLost {
  id: string;
  percentage: number;
  description: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: 'proposalUnclear', percentage: 40, description: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: 20, description: 'However venture pursuit' },
  { id: 'other', percentage: 10, description: 'Other reasons' }, 
  { id: 'timing', percentage: 30, description: 'Timing not right for client' }, // Replaced duplicate
];

interface OtherStat {
  id: string;
  value: string;
  description: string;
  hasInfo?: boolean;
  infoText?: string;
}

const otherDataStats: OtherStat[] = [
  { id: 'totalLeads', value: '900', description: 'total leads count' },
  { id: 'avgConversionTime', value: '12', description: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: '30', description: 'inactive leads', hasInfo: true, infoText: 'Leads with no activity in the last 90 days.' },
];

const DetailStatisticsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Reasons of leads lost Card */}
      <Card>
        <CardHeader>
          <CardTitle>Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-x-6 gap-y-8">
          {reasonsLostData.map((reason) => (
            <div key={reason.id}>
              <p className="text-3xl font-bold text-foreground">{reason.percentage}%</p>
              <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Other data Card */}
      <Card>
        <CardHeader>
          <CardTitle>Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8 sm:gap-y-0">
          {otherDataStats.map((stat) => (
            <div key={stat.id}>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground">{stat.description}</p>
                {stat.hasInfo && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-help flex-shrink-0" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-popover text-popover-foreground py-1 px-2 text-xs rounded shadow-lg max-w-xs">
                        <p>{stat.infoText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailStatisticsGrid;
