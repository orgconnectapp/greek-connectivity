
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CalendarIcon, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DashboardCard from './DashboardCard';

interface FundraiserCardProps {
  title: string;
  date: string;
  raised: number;
  goal: number;
  participants: number;
  status: 'active' | 'upcoming' | 'completed';
}

const FundraiserCard = ({ 
  title, 
  date, 
  raised, 
  goal, 
  participants, 
  status 
}: FundraiserCardProps) => {
  const progress = Math.min(Math.round((raised / goal) * 100), 100);
  
  const statusColors = {
    active: "bg-green-100 text-green-700",
    upcoming: "bg-blue-100 text-blue-700",
    completed: "bg-gray-100 text-gray-700"
  };
  
  return (
    <DashboardCard
      title={title}
      className="h-full"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">${raised} of ${goal}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{participants} participants</span>
        </div>
      </div>
    </DashboardCard>
  );
};

export default FundraiserCard;
