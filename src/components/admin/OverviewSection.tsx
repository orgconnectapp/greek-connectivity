import React, { useState } from 'react';
import { Users, UserCog, Flag, Upload, Download, Bell, Check, X, Calendar, ChevronDown, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import DashboardCard from '@/components/dashboard/DashboardCard';
import EventApprovalSection from '@/components/admin/EventApprovalSection';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Event } from '@/components/calendar/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MemberApprovalDialog, { PendingMember } from './MemberApprovalDialog';

interface FundraiserData {
  id: number;
  title: string;
  creator: string;
  goal: number;
  description: string;
  createdAt: string;
  image: string;
}

const MOCK_PENDING_MEMBERS: PendingMember[] = [
  {
    id: "1",
    name: "Jordan Smith",
    email: "jordan.smith@university.edu",
    phone: "(555) 123-4567",
    major: "Computer Science",
    year: "Junior",
    bio: "I'm excited to join this organization to develop my leadership skills and network with like-minded peers.",
    appliedDate: "2 days ago",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "2",
    name: "Taylor Johnson",
    email: "taylor.johnson@university.edu",
    phone: "(555) 987-6543",
    major: "Business Administration",
    year: "Sophomore",
    bio: "Looking to gain valuable experience in event planning and community service through this organization.",
    appliedDate: "3 days ago",
    profileImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: "3",
    name: "Alex Rivera",
    email: "alex.rivera@university.edu",
    phone: "(555) 456-7890",
    major: "Marketing",
    year: "Freshman",
    bio: "Passionate about making a difference on campus and developing professional skills.",
    appliedDate: "4 days ago",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

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
  const [isFundraiserSectionOpen, setIsFundraiserSectionOpen] = useState(false);
  const [pendingEventsCount, setPendingEventsCount] = useState(3);
  
  const [selectedFundraiser, setSelectedFundraiser] = useState<FundraiserData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [isMemberSectionOpen, setIsMemberSectionOpen] = useState(false);
  const [pendingMembers, setPendingMembers] = useState<PendingMember[]>(MOCK_PENDING_MEMBERS);
  const [selectedMember, setSelectedMember] = useState<PendingMember | null>(null);
  const [isMemberDetailsOpen, setIsMemberDetailsOpen] = useState(false);

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
  
  const handleFundraiserDoubleClick = (fundraiser: FundraiserData) => {
    setSelectedFundraiser(fundraiser);
    setIsDetailsOpen(true);
  };

  const handleMemberDoubleClick = (member: PendingMember) => {
    setSelectedMember(member);
    setIsMemberDetailsOpen(true);
  };

  const handleMemberApproval = (id: string, approved: boolean) => {
    const updatedMembers = pendingMembers.filter(member => member.id !== id);
    setPendingMembers(updatedMembers);
    
    toast({
      title: approved ? "Member approved" : "Member rejected",
      description: `The membership application has been ${approved ? 'approved' : 'rejected'}.`,
    });
    
    setIsMemberDetailsOpen(false);
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
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl font-bold">{pendingMembers.length}</div>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </div>
          
          <Collapsible
            open={isMemberSectionOpen}
            onOpenChange={setIsMemberSectionOpen}
            className="w-full"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full flex justify-between items-center"
                size="sm"
              >
                {isMemberSectionOpen ? "Hide Details" : "View Details"}
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isMemberSectionOpen ? "transform rotate-180" : ""
                  }`} 
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              {pendingMembers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No pending member applications
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className="border rounded-lg p-4 space-y-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onDoubleClick={() => handleMemberDoubleClick(member)}
                    >
                      <div className="flex items-center gap-3">
                        {member.profileImage && (
                          <img 
                            src={member.profileImage} 
                            alt={member.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.major}, {member.year}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm">Applied: {member.appliedDate}</p>
                      
                      <div className="flex gap-2 pt-2">
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMemberApproval(member.id, true);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMemberApproval(member.id, false);
                          }}
                          variant="destructive"
                          size="sm"
                        >
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        </DashboardCard>
      </div>
      
      <MemberApprovalDialog
        member={selectedMember}
        isOpen={isMemberDetailsOpen}
        onOpenChange={setIsMemberDetailsOpen}
        onApprove={(id) => handleMemberApproval(id, true)}
        onReject={(id) => handleMemberApproval(id, false)}
      />
      
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
      
      <DashboardCard
        title="Fundraiser Approvals"
        description="Review and approve fundraisers created by members"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold">{fundraisers.length}</div>
          <Flag className="h-4 w-4 text-muted-foreground" />
        </div>
        
        <Collapsible
          open={isFundraiserSectionOpen}
          onOpenChange={setIsFundraiserSectionOpen}
          className="w-full"
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full flex justify-between items-center"
              size="sm"
            >
              {isFundraiserSectionOpen ? "Hide Details" : "View Details"}
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${
                  isFundraiserSectionOpen ? "transform rotate-180" : ""
                }`} 
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            {fundraisers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No pending fundraisers to approve
              </div>
            ) : (
              <div className="space-y-4">
                {fundraisers.map((fundraiser) => (
                  <div 
                    key={fundraiser.id} 
                    className="flex flex-col md:flex-row gap-4 border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onDoubleClick={() => handleFundraiserDoubleClick(fundraiser)}
                  >
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFundraiserApproval(fundraiser.id, true);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFundraiserApproval(fundraiser.id, false);
                          }}
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
          </CollapsibleContent>
        </Collapsible>
      </DashboardCard>
      
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        {selectedFundraiser && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-primary" />
                {selectedFundraiser.title}
              </DialogTitle>
              <DialogDescription>
                Fundraiser details and approval options
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <img 
                    src={selectedFundraiser.image} 
                    alt={selectedFundraiser.title}
                    className="rounded-md object-cover w-full h-auto"
                  />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="mt-1">{selectedFundraiser.description}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Created by:</span>
                    <p className="mt-1">{selectedFundraiser.creator}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Fundraising Goal:</span>
                    <p className="mt-1 font-semibold">${selectedFundraiser.goal}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Submitted:</span>
                    <p className="mt-1">{selectedFundraiser.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                onClick={() => {
                  handleFundraiserApproval(selectedFundraiser.id, true);
                  setIsDetailsOpen(false);
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="mr-2 h-4 w-4" />
                Approve Fundraiser
              </Button>
              <Button 
                onClick={() => {
                  handleFundraiserApproval(selectedFundraiser.id, false);
                  setIsDetailsOpen(false);
                }}
                variant="destructive"
              >
                <X className="mr-2 h-4 w-4" />
                Deny Fundraiser
              </Button>
            </div>
          </>
       

