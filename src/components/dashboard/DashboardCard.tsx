
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const DashboardCard = ({ title, description, className, children }: DashboardCardProps) => {
  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-subtle", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
