
import React, { useState } from 'react';
import { Pencil, UserPlus, UserX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import InviteMemberDialog from '@/components/members/InviteMemberDialog';

interface MemberData {
  name: string;
  role: string;
  email: string;
  status: string;
  admin: boolean;
}

const MemberManagement = () => {
  const [editMemberDialog, setEditMemberDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberData | null>(null);
  const [removeMemberDialog, setRemoveMemberDialog] = useState(false);
  const [inviteDialog, setInviteDialog] = useState(false);

  const handleEditMember = (member: MemberData) => {
    setSelectedMember(member);
    setEditMemberDialog(true);
  };

  const handleRemoveMember = () => {
    toast({
      title: "Member removed",
      description: `${selectedMember?.name} has been removed from the organization.`,
    });
    
    setRemoveMemberDialog(false);
    setEditMemberDialog(false);
  };

  const handleStatusChange = (status: string) => {
    toast({
      title: "Status updated",
      description: `${selectedMember?.name}'s status has been updated to ${status}.`,
    });
  };

  const handleRoleChange = (role: string) => {
    toast({
      title: "Role updated",
      description: `${selectedMember?.name}'s role has been updated to ${role}.`,
    });
  };
  
  const members = [
    { 
      name: 'Jason Smith', 
      role: 'President', 
      email: 'jason@greeksync.com',
      status: 'Active',
      admin: true
    },
    { 
      name: 'Emma Johnson', 
      role: 'Vice President', 
      email: 'emma@greeksync.com',
      status: 'Active',
      admin: true
    },
    { 
      name: 'Michael Brown', 
      role: 'Treasurer', 
      email: 'michael@greeksync.com',
      status: 'Active',
      admin: true
    },
    { 
      name: 'Sophia Garcia', 
      role: 'Secretary', 
      email: 'sophia@greeksync.com',
      status: 'Active',
      admin: false
    },
    { 
      name: 'Alex Williams', 
      role: 'Event Coordinator', 
      email: 'alex@greeksync.com',
      status: 'Active',
      admin: false
    },
  ];

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Member Management</h2>
          <Button size="sm" onClick={() => setInviteDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Search members..." className="max-w-sm" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="president">President</SelectItem>
              <SelectItem value="treasurer">Treasurer</SelectItem>
              <SelectItem value="secretary">Secretary</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Table>
          <TableCaption>A list of all members with their roles and permissions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Admin Access</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch checked={member.admin} />
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEditMember(member)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Member Dialog */}
      <Dialog open={editMemberDialog} onOpenChange={setEditMemberDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update member details, role, and status
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Member Information</h3>
                <div className="text-sm">
                  <p><span className="font-medium">Name:</span> {selectedMember.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedMember.email}</p>
                  <p><span className="font-medium">Current Role:</span> {selectedMember.role}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Change Status</h3>
                <Select 
                  defaultValue={selectedMember.status.toLowerCase()}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Assign Role</h3>
                <Select 
                  defaultValue={selectedMember.role.toLowerCase().replace(' ', '-')}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="president">President</SelectItem>
                    <SelectItem value="vice-president">Vice President</SelectItem>
                    <SelectItem value="treasurer">Treasurer</SelectItem>
                    <SelectItem value="secretary">Secretary</SelectItem>
                    <SelectItem value="event-coordinator">Event Coordinator</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Admin Access</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Grant admin panel access</span>
                  <Switch defaultChecked={selectedMember.admin} />
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={() => setRemoveMemberDialog(true)}
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Remove from Organization
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMemberDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              toast({
                title: "Changes saved",
                description: "Member information has been updated",
              });
              setEditMemberDialog(false);
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Remove Member Confirmation Dialog */}
      <Dialog open={removeMemberDialog} onOpenChange={setRemoveMemberDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this member from your organization? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="py-4">
              <div className="p-4 border rounded-md bg-muted/50 mb-4">
                <p className="font-medium">{selectedMember.name}</p>
                <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                <p className="text-sm text-muted-foreground">{selectedMember.role}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-destructive font-medium">
                  <UserX className="h-4 w-4 inline mr-1" />
                  This will permanently remove the member
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveMemberDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveMember}>
              Remove Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Invite Member Dialog */}
      <InviteMemberDialog open={inviteDialog} onOpenChange={setInviteDialog} />
    </>
  );
};

export default MemberManagement;
