
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CreditCard } from 'lucide-react';
import DashboardCard from './DashboardCard';

const DuesSummary = () => {
  return (
    <DashboardCard 
      title="Dues Status" 
      description="Current payment status"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">$250</p>
            <p className="text-sm text-muted-foreground">of $500 paid</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">50%</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>
        
        <div className="rounded-md bg-muted p-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium">Next Payment</span>
            <span className="text-primary">$125</span>
          </div>
          <p className="text-xs text-muted-foreground">Due on April 15, 2024</p>
        </div>
      </div>
    </DashboardCard>
  );
};

export default DuesSummary;
