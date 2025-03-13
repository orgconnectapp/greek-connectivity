
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, Mail, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MemberPaymentInfo {
  name: string;
  role: string;
  email: string;
  paid: boolean;
  amount?: number;
  date?: string;
}

interface ChargeDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chargeTitle: string | null;
  chargeDetails: Record<string, { paidMembers: MemberPaymentInfo[] }>;
}

const ChargeDetailsDialog = ({ 
  open, 
  onOpenChange, 
  chargeTitle, 
  chargeDetails 
}: ChargeDetailsDialogProps) => {
  if (!chargeTitle || !chargeDetails[chargeTitle]) return null;
  
  const members = chargeDetails[chargeTitle].paidMembers;
  const paidMembers = members.filter(member => member.paid);
  const unpaidMembers = members.filter(member => !member.paid);
  
  const handleSendReminders = () => {
    if (unpaidMembers.length === 0) {
      toast({
        title: "No reminders needed",
        description: "All members have paid this charge.",
      });
      return;
    }
    
    toast({
      title: "Reminders sent",
      description: `Payment reminders sent to ${unpaidMembers.length} members.`,
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{chargeTitle} - Payment Details</DialogTitle>
          <DialogDescription>
            View payment status for all members and send reminders
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-between py-2">
          <div className="text-sm">
            <span className="font-medium">{paidMembers.length}</span> of <span className="font-medium">{members.length}</span> members have paid
          </div>
          <Button 
            onClick={handleSendReminders}
            disabled={unpaidMembers.length === 0}
            className="gap-2"
          >
            <Mail className="h-4 w-4" />
            Send Reminders
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Paid Members Section */}
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Paid Members
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paidMembers.length > 0 ? (
                  paidMembers.map((member, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>${member.amount}</TableCell>
                      <TableCell>{member.date}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-600">Paid</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No paid members yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Unpaid Members Section */}
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <X className="h-4 w-4 text-destructive" />
              Unpaid Members
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unpaidMembers.length > 0 ? (
                  unpaidMembers.map((member, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-destructive border-destructive">
                          Unpaid
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      All members have paid
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChargeDetailsDialog;
