
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
import { Checkbox } from '@/components/ui/checkbox';

interface MemberData {
  name: string;
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

  const handleAdminToggle = (checked: boolean) => {
    if (selectedMember) {
      setSelectedMember({
        ...selectedMember,
        admin: checked
      });
      
      toast({
        title: "Admin access updated",
        description: `${selectedMember.name}'s admin access has been ${checked ? 'granted' : 'revoked'}.`,
      });
    }
  };
  
  const members = [
    { 
      name: 'Jason Smith', 
      email: 'jason@greeksync.com',
      status: 'Active',
      admin: true
    },
    { 
      name: 'Emma Johnson', 
      email: 'emma@greeksync.com',
      status: 'Active',
      admin: true
    },
    { 
      name: 'Michael Brown', 
      email: 'michael@greeksync.com',
      status: 'Active',
      admin: true
    },
    { 
      name: 'Sophia Garcia', 
      email: 'sophia@greeksync.com',
      status: 'Active',
      admin: false
    },
    { 
      name: 'Alex Williams', 
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
        </div>
        
        <Table>
          <TableCaption>A list of all members with their permissions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
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
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch 
                    checked={member.admin} 
                    onCheckedChange={(checked) => {
                      // Update member's admin status in the local state
                      members[index].admin = checked;
                      toast({
                        title: "Admin access updated",
                        description: `${member.name}'s admin access has been ${checked ? 'granted' : 'revoked'}.`,
                      });
                    }}
                  />
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

      <Dialog open={editMemberDialog} onOpenChange={setEditMemberDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
            <DialogDescription>
              Update member details and status
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Member Information</h3>
                <div className="text-sm">
                  <p><span className="font-medium">Name:</span> {selectedMember.name}</p>
                  <p><span className="font-medium">Email:</span> {selectedMember.email}</p>
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
                <h3 className="text-sm font-medium">Admin Access</h3>
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={selectedMember.admin}
                    onCheckedChange={handleAdminToggle}
                  />
                  <span className="text-sm">
                    {selectedMember.admin ? 'Has admin access' : 'No admin access'}
                  </span>
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
                <p className="text-sm text-muted-foreground">
                  {selectedMember.admin ? 'Admin access' : 'Regular member'}
                </p>
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
      
      <InviteMemberDialog open={inviteDialog} onOpenChange={setInviteDialog} />
    </>
  );
};

export default MemberManagement;
