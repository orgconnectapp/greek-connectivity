
import React from 'react';
import DuesSummary from '@/components/dashboard/DuesSummary';
import FundraiserCard from '@/components/dashboard/FundraiserCard';
import MembershipStats from '@/components/dashboard/MembershipStats';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { CalendarDays, MessageSquare, Bell } from 'lucide-react';

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your organization.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <DuesSummary />
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <MembershipStats />
        </div>
        
        <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <DashboardCard title="Activity" className="h-full">
            <div className="space-y-4">
              {[
                { icon: Bell, text: "Dues reminder sent", time: "2 hours ago" },
                { icon: MessageSquare, text: "New message from Treasurer", time: "5 hours ago" },
                { icon: CalendarDays, text: "Fundraiser scheduled", time: "Yesterday" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 rounded-full bg-primary/10 p-1.5">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>
      
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Current Fundraisers</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <FundraiserCard
              title="Spring Charity Gala"
              date="April 20, 2024"
              raised={1250}
              goal={2000}
              participants={18}
              status="active"
              imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800"
            />
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: '0.5s' }}>
            <FundraiserCard
              title="Campus Clean-Up"
              date="May 5, 2024"
              raised={450}
              goal={500}
              participants={24}
              status="active"
              imageUrl="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800"
            />
          </div>
          
          <div className="animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <FundraiserCard
              title="Alumni Networking Event"
              date="May 15, 2024"
              raised={0}
              goal={1500}
              participants={5}
              status="upcoming"
              imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
