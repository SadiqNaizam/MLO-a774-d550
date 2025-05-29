import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface ChartDataPoint {
  name: string; // Month name
  closedWon: number;
  closedLost: number;
}

const lineChartData: ChartDataPoint[] = [
  { name: 'March', closedWon: 90, closedLost: 65 },
  { name: 'April', closedWon: 55, closedLost: 40 },
  { name: 'May', closedWon: 95, closedLost: 68 },
  { name: 'June', closedWon: 70, closedLost: 15 },
  { name: 'July', closedWon: 88, closedLost: 42 },
  { name: 'August', closedWon: 35, closedLost: 98 },
];

const LineChartCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
            <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
            <div className="mt-1">
                <span className="text-3xl font-bold text-foreground">680</span>
                <span className="ml-2 text-sm text-muted-foreground">total closed</span>
                <span className="text-3xl font-bold text-foreground ml-4">70</span>
                <span className="ml-2 text-sm text-muted-foreground">total lost</span>
            </div>
        </div>
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
      <CardContent className="pb-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineChartData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                dy={10}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                dx={-5}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 'dataMax + 10']}
              />
              <RechartsTooltip 
                cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3'}}
                contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderRadius: 'var(--radius)', borderColor: 'hsl(var(--border))' }}
                itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
              />
              <Area type="monotone" dataKey="closedWon" stroke="#0D9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClosedWon)" name="Closed Won" dot={{ r: 4, strokeWidth: 2, fill: '#0D9488', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth:2, fill: '#0D9488', stroke: 'hsl(var(--card))' }} />
              <Area type="monotone" dataKey="closedLost" stroke="#DC2626" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClosedLost)" name="Closed Lost" dot={{ r: 4, strokeWidth:2, fill: '#DC2626', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth:2, fill: '#DC2626', stroke: 'hsl(var(--card))' }}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#0D9488] mr-2"></span>
                <span>Closed won</span>
            </div>
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#DC2626] mr-2"></span>
                <span>Closed lost</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
