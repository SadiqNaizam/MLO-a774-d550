import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CalendarDays, Info } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

// Funnel Card Data
interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string;
  textColor: string;
}

const funnelStagesData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-red-500', textColor: 'text-red-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, time: 'average time on this stage', color: 'bg-indigo-500', textColor: 'text-indigo-500' },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-green-500', textColor: 'text-green-500' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-500', textColor: 'text-purple-500' },
];

const totalFunnelCount = funnelStagesData.reduce((sum, stage) => sum + stage.count, 0);

// Sources Card Data
interface SourceDataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
}
const sourcesChartData: SourceDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F06A6A' }, 
  { name: 'Behance', value: 1500, percentage: 25, color: '#F5B861' }, 
  { name: 'Instagram', value: 900, percentage: 15, color: '#69D3B0' }, 
  { name: 'Dribbble', value: 600, percentage: 10, color: '#6AAFF0' }, 
];

const StatsCardGrid: React.FC = () => {
  const [activeSourceFilter, setActiveSourceFilter] = React.useState<string>('leadsConverted');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Funnel Count Card */}
      <Card>
        <CardHeader>
          <CardTitle>Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold text-foreground">600</span>
            <span className="ml-2 text-muted-foreground">active leads</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden mb-6 bg-muted">
            {funnelStagesData.map((stage) => (
              <div
                key={stage.id}
                className={cn(stage.color, 'h-full')}
                style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
              />
            ))}
          </div>
          <ul className="space-y-3">
            {funnelStagesData.map((stage) => (
              <li key={stage.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className={cn('w-3 h-3 rounded-full mr-3', stage.color)} />
                  <span className="text-card-foreground">{stage.name}</span>
                  {stage.name === 'Qualified' && (
                     <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-popover text-popover-foreground py-1 px-2 text-xs rounded shadow-lg">
                                <p>Average time on this stage</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-muted-foreground w-10 text-right">{stage.count}</span>
                  <span className="text-muted-foreground w-16 text-right">$ {stage.value}</span>
                  <span className={cn('text-muted-foreground w-20 text-right', stage.name === 'In conversation' && 'text-xs')}>{stage.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Sources Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-medium">Sources</CardTitle>
          <Select defaultValue="last-6-months">
            <SelectTrigger className="h-8 w-auto text-xs px-2 border-none shadow-none bg-transparent text-muted-foreground hover:text-foreground focus:ring-0 focus:ring-offset-0">
              <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="last-3-months">Last 3 months</SelectItem>
              <SelectItem value="last-6-months">Last 6 months</SelectItem>
              <SelectItem value="last-12-months">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full mb-4 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderRadius: 'var(--radius)', borderColor: 'hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                />
                <Pie
                  data={sourcesChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="hsl(var(--card))"
                  strokeWidth={3}
                >
                  {sourcesChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-2 mb-4">
            {sourcesChartData.map((source) => (
              <li key={source.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: source.color }} />
                  <span className="text-card-foreground">{source.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <span className="text-muted-foreground font-medium">$ {source.value.toLocaleString()}</span>
                    <span className="text-muted-foreground w-8 text-right">{source.percentage}%</span>
                </div>
              </li>
            ))}
          </ul>
           <ToggleGroup 
                type="single" 
                defaultValue="leadsConverted" 
                value={activeSourceFilter} 
                onValueChange={(value) => { if (value) setActiveSourceFilter(value); }}
                className="w-full grid grid-cols-3 gap-1 bg-muted/60 p-0.5 rounded-md"
            >
                <ToggleGroupItem value="leadsCame" aria-label="Leads came" className="text-xs py-1.5 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm rounded-sm flex-1">
                    Leads came
                </ToggleGroupItem>
                <ToggleGroupItem value="leadsConverted" aria-label="Leads Converted" className="text-xs py-1.5 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm rounded-sm flex-1">
                    Leads Converted
                </ToggleGroupItem>
                <ToggleGroupItem value="totalDeals" aria-label="Total deals size" className="text-xs py-1.5 data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm rounded-sm flex-1">
                    Total deals size
                </ToggleGroupItem>
            </ToggleGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCardGrid;
