
import React, { useState } from 'react';
import DuesSummary from '@/components/dashboard/DuesSummary';
import FundraiserCard from '@/components/dashboard/FundraiserCard';
import MembershipStats from '@/components/dashboard/MembershipStats';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Button } from '@/components/ui/button';
import { CalendarDays, MessageSquare, Bell } from 'lucide-react';
import FundraiserDetailsDialog from '@/components/fundraisers/FundraiserDetailsDialog';
import ShareFundraiserDialog from '@/components/fundraisers/ShareFundraiserDialog';
import { FundraiserType, DonorType } from '@/components/fundraisers/data';

const Index = () => {
  // Add state for fundraiser details dialog
  const [selectedFundraiser, setSelectedFundraiser] = useState<FundraiserType | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [sharingFundraiser, setSharingFundraiser] = useState<FundraiserType | null>(null);
  
  // Sample fundraisers data - this would typically come from an API
  const fundraisers = [
    {
      id: 1,
      title: "Spring Charity Gala",
      date: "April 20, 2024",
      raised: 1250,
      goal: 2000,
      participants: 18,
      status: "active" as const,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800",
      description: "Join us for an evening of entertainment and fundraising to support local charities."
    },
    {
      id: 2,
      title: "Campus Clean-Up",
      date: "May 5, 2024",
      raised: 450,
      goal: 500,
      participants: 24,
      status: "active" as const,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800",
      description: "Help us clean up our campus and surrounding areas to create a better environment for everyone."
    },
    {
      id: 3,
      title: "Alumni Networking Event",
      date: "May 15, 2024",
      raised: 0,
      goal: 1500,
      participants: 5,
      status: "upcoming" as const,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800",
      description: "Connect with alumni and build your professional network at this special event."
    }
  ];

  // Sample donors data - this would typically come from an API
  const donors: DonorType[] = [
    {
      id: 1,
      name: "John Smith",
      amount: 50,
      date: "April 5, 2024",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Jane Doe",
      amount: 75,
      date: "April 7, 2024",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      name: "Bob Johnson",
      amount: 100,
      date: "April 10, 2024",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];

  // Function to handle double click on a fundraiser card
  const handleFundraiserDoubleClick = (fundraiser: any) => {
    setSelectedFundraiser(fundraiser);
    setDetailsDialogOpen(true);
  };

  // Function to handle share button click
  const handleShareFundraiser = (fundraiser: FundraiserType) => {
    setSharingFundraiser(fundraiser);
    setShareDialogOpen(true);
  };

  // Function to get donors for a specific fundraiser
  const getFundraiserDonors = () => {
    // In a real application, this would filter donors based on the fundraiser ID
    return donors;
  };

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
          {fundraisers.map((fundraiser, index) => (
            <div 
              key={fundraiser.id} 
              className="animate-fade-up"
              style={{ animationDelay: `${0.4 + (index * 0.1)}s` }}
              onDoubleClick={() => handleFundraiserDoubleClick(fundraiser)}
            >
              <FundraiserCard
                title={fundraiser.title}
                date={fundraiser.date}
                raised={fundraiser.raised}
                goal={fundraiser.goal}
                participants={fundraiser.participants}
                status={fundraiser.status}
                imageUrl={fundraiser.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fundraiser Details Dialog */}
      <FundraiserDetailsDialog
        fundraiser={selectedFundraiser}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        donors={getFundraiserDonors()}
        onContribute={undefined} // You can implement contribution functionality if needed
        onShare={handleShareFundraiser}
      />

      {/* Share Fundraiser Dialog */}
      <ShareFundraiserDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        fundraiser={sharingFundraiser}
      />
    </div>
  );
};

export default Index;
