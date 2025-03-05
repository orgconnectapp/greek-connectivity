
import React from 'react';
import { Users, UserPlus, ArrowUpRight } from 'lucide-react';
import DashboardCard from './DashboardCard';

const MembershipStats = () => {
  return (
    <DashboardCard 
      title="Membership"
      className="h-full"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">Active</span>
            </div>
            <p className="mt-2 text-2xl font-bold">52</p>
          </div>
          
          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <UserPlus className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium">New</span>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <p className="text-2xl font-bold">7</p>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="h-3 w-3" />
                <span>12%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Recent Members</h4>
          <div className="space-y-2">
            {["Alex Johnson", "Maya Patel", "Chloe Williams"].map((name, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {i === 0 ? "Today" : i === 1 ? "Yesterday" : "3d ago"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default MembershipStats;
