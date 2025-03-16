
import React, { useState } from 'react';
import { Users, UserCog, Flag, Upload, Download, Bell, Check, X, Calendar, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EventApprovalSection from '@/components/admin/EventApprovalSection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Event } from '@/components/calendar/types';

interface FundraiserData {
  id: number;
  title: string;
  creator: string;
  goal: number;
  description: string;
  createdAt: string;
  image: string;
}

const OverviewSection = () => {
  const [fundraisers, setFundraisers] = useState<FundraiserData[]>([
    {
      id: 1,
      title: "Fall Semester Book Drive",
      creator: "Sophia Garcia",
      goal: 2500,
      description: "Help us collect books for underprivileged children in our community.",
      createdAt: "1 day ago",
      image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=1287&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Charity Run for Cancer Research",
      creator: "Michael Brown",
      goal: 5000,
      description: "Supporting local cancer research initiatives with a 5K run on campus.",
      createdAt: "2 days ago",
      image: "https://images.unsplash.com/photo-1509099652299-30938b0aeb63?auto=format&fit=crop&q=80&w=1256&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      title: "Chapter House Renovation",
      creator: "Alex Williams",
      goal: 10000,
      description: "Help us update our chapter house with new furniture and appliances.",
      createdAt: "3 days ago",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1267&ixlib=rb-4.0.3"
    }
  ]);
  
  const [isEventSectionOpen, setIsEventSectionOpen] = useState(false);
  const [pendingEventsCount, setPendingEventsCount] = useState(3); // Initial count based on mock data

  const handleFundraiserApproval = (id: number, approved: boolean) => {
    setFundraisers(prevFundraisers => 
      prevFundraisers.filter(fundraiser => fundraiser.id !== id)
    );
    
    toast({
      title: approved ? "Fundraiser approved" : "Fundraiser denied",
      description: `The fundraiser has been ${approved ? 'approved and is now live' : 'denied and removed from the system'}.`,
    });
  };

  const handleEventApproval = (events: Event[]) => {
    setPendingEventsCount(events.length);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <DashboardCard
          title="Total Organization Members"
          description="Active members in your organization"
        >
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">24</div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
        </DashboardCard>
        
        <DashboardCard
          title="Pending Member Approvals"
          description="Members awaiting verification"
        >
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">3</div>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </div>
        </DashboardCard>
      </div>
      
      <DashboardCard
        title="Event Approvals"
        description="Events awaiting your approval"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold">{pendingEventsCount}</div>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <Collapsible
          open={isEventSectionOpen}
          onOpenChange={setIsEventSectionOpen}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full flex justify-between items-center"
              size="sm"
            >
              {isEventSectionOpen ? "Hide Details" : "View Details"}
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${
                  isEventSectionOpen ? "transform rotate-180" : ""
                }`} 
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <EventApprovalSection onEventApproval={handleEventApproval} />
          </CollapsibleContent>
        </Collapsible>
      </DashboardCard>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            Fundraiser Approvals
          </CardTitle>
          <CardDescription>
            Review and approve fundraisers created by members
          </CardDescription>
        </CardHeader>
        <CardContent>
          {fundraisers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending fundraisers to approve
            </div>
          ) : (
            <div className="space-y-4">
              {fundraisers.map((fundraiser) => (
                <div key={fundraiser.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                  <div className="w-full md:w-1/4">
                    <img 
                      src={fundraiser.image} 
                      alt={fundraiser.title}
                      className="rounded-md object-cover w-full h-[140px]"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{fundraiser.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        Submitted {fundraiser.createdAt}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Created by: {fundraiser.creator}</p>
                    <p className="text-sm">Goal: ${fundraiser.goal}</p>
                    <p className="text-sm">{fundraiser.description}</p>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        onClick={() => handleFundraiserApproval(fundraiser.id, true)}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleFundraiserApproval(fundraiser.id, false)}
                        variant="destructive"
                        size="sm"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Deny
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used admin tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Button className="justify-start">
              <Upload className="mr-2 h-4 w-4" />
              Export Member Data
            </Button>
            <Button className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
            <Button className="justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Send Organization Announcement
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewSection;
