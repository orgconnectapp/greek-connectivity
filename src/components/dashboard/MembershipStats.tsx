
import React, { useState } from 'react';
import { Users, GraduationCap, BarChart, ArrowUpRight, X } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

// Mock data for members
const activeMembers = [
  { id: 1, name: "Alex Johnson", joined: "2 years ago" },
  { id: 2, name: "Maya Patel", joined: "1 year ago" },
  { id: 3, name: "Chloe Williams", joined: "8 months ago" },
  { id: 4, name: "James Rodriguez", joined: "6 months ago" },
  { id: 5, name: "Zoe Thompson", joined: "3 months ago" },
];

const alumniMembers = [
  { id: 6, name: "Emma Davis", graduated: "2023" },
  { id: 7, name: "Michael Lee", graduated: "2022" },
  { id: 8, name: "Sophia Martinez", graduated: "2022" },
  { id: 9, name: "Daniel Kim", graduated: "2021" },
  { id: 10, name: "Olivia Wilson", graduated: "2020" },
];

const MembershipStats = () => {
  const [activeMembersDialogOpen, setActiveMembersDialogOpen] = useState(false);
  const [alumniMembersDialogOpen, setAlumniMembersDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const totalMembers = activeMembers.length + alumniMembers.length;
  
  const viewProfile = (username: string) => {
    navigate(`/profile/${username.replace(' ', '-').toLowerCase()}`);
  };

  return (
    <>
      <DashboardCard 
        title="Membership"
        className="h-full"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <BarChart className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Total</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{totalMembers}</p>
            </div>
            
            <div 
              className="rounded-lg border bg-card p-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setActiveMembersDialogOpen(true)}
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Active</span>
              </div>
              <p className="mt-2 text-2xl font-bold">{activeMembers.length}</p>
            </div>
            
            <div 
              className="rounded-lg border bg-card p-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setAlumniMembersDialogOpen(true)}
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Alumni</span>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <p className="text-2xl font-bold">{alumniMembers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Recent Members</h4>
            <div className="space-y-2">
              {activeMembers.slice(0, 3).map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center justify-between rounded-md border p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => viewProfile(member.name)}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{member.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {member.joined}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardCard>
      
      {/* Active Members Dialog */}
      <Dialog open={activeMembersDialogOpen} onOpenChange={setActiveMembersDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Active Members</DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-2 p-2">
              {activeMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    viewProfile(member.name);
                    setActiveMembersDialogOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium">{member.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {member.joined}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Alumni Members Dialog */}
      <Dialog open={alumniMembersDialogOpen} onOpenChange={setAlumniMembersDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Alumni Members</DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-2 p-2">
              {alumniMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="flex items-center justify-between rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    viewProfile(member.name);
                    setAlumniMembersDialogOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium">{member.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Graduated {member.graduated}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MembershipStats;
