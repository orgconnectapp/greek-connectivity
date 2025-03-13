
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  up: boolean | null;
}

const StatCard = ({ title, value, icon: Icon, change, up }: StatCardProps) => {
  return (
    <Card className="animate-fade-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">{value}</div>
          <div className="rounded-full bg-primary/10 p-2">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        <div className="mt-4 text-sm">
          <span className={up === true ? 'text-green-500' : up === false ? 'text-red-500' : 'text-muted-foreground'}>
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
