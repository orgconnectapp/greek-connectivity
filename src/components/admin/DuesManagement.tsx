
import React, { useState } from 'react';
import { DollarSign, Users, Percent, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CreateDueChargeModal from '@/components/admin/CreateDueChargeModal';
import ChargeDetailsDialog from '@/components/admin/ChargeDetailsDialog';

interface DuesManagementProps {
  chargesDetails: Record<string, { paidMembers: any[] }>;
}

const DuesManagement = ({ chargesDetails }: DuesManagementProps) => {
  const [chargeDetailsDialog, setChargeDetailsDialog] = useState(false);
  const [selectedCharge, setSelectedCharge] = useState<string | null>(null);
  
  const handleChargeClick = (chargeTitle: string) => {
    setSelectedCharge(chargeTitle);
    setChargeDetailsDialog(true);
  };

  const dues = [
    { 
      title: 'Spring 2024 Membership Dues', 
      amount: '$150.00', 
      type: 'Regular Dues',
      dueDate: 'Apr 15, 2024',
      created: 'Mar 1, 2024',
      status: 'Active',
      collected: 2250,
      total: 3600,
      members: 24,
      paidMembers: 15
    },
    { 
      title: 'Leadership Conference Fee', 
      amount: '$35.00', 
      type: 'Event Fee',
      dueDate: 'Mar 30, 2024',
      created: 'Mar 5, 2024',
      status: 'Active',
      collected: 560,
      total: 840,
      members: 24,
      paidMembers: 16
    },
    { 
      title: 'Late Payment Fee', 
      amount: '$25.00', 
      type: 'Late Fee',
      dueDate: 'May 1, 2024',
      created: 'Mar 15, 2024',
      status: 'Pending',
      collected: 0,
      total: 200,
      members: 8,
      paidMembers: 0
    },
  ];

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Dues Management</h2>
            <p className="text-muted-foreground">
              Create and manage due charges for your organization
            </p>
          </div>
          <CreateDueChargeModal />
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <Input placeholder="Search due charges..." className="max-w-sm" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="regular">Regular Dues</SelectItem>
              <SelectItem value="late">Late Fees</SelectItem>
              <SelectItem value="event">Event Fees</SelectItem>
              <SelectItem value="other">Other Charges</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Table>
          <TableCaption>A list of all due charges for your organization</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dues.map((dues, index) => {
              const percentPaid = Math.round((dues.collected / dues.total) * 100);
              const percentMembers = Math.round((dues.paidMembers / dues.members) * 100);
              
              return (
                <TableRow 
                  key={index} 
                  className="cursor-pointer hover:bg-muted"
                  onDoubleClick={() => handleChargeClick(dues.title)}
                >
                  <TableCell className="font-medium">{dues.title}</TableCell>
                  <TableCell>{dues.amount}</TableCell>
                  <TableCell>{dues.type}</TableCell>
                  <TableCell>{dues.dueDate}</TableCell>
                  <TableCell>{dues.created}</TableCell>
                  <TableCell className="w-[250px]">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3.5 w-3.5 text-primary" />
                          <span>Amount Collected:</span>
                        </div>
                        <div className="font-medium">${dues.collected} of ${dues.total}</div>
                      </div>
                      <Progress value={percentPaid} className="h-2" />
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-primary" />
                          <span>Members Paid:</span>
                        </div>
                        <div className="font-medium">{dues.paidMembers} of {dues.members}</div>
                      </div>
                      <Progress value={percentMembers} className="h-2" />
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {percentPaid === 100 ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Percent className="h-3.5 w-3.5" />
                        )}
                        <span>{percentPaid}% collected</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <ChargeDetailsDialog
        open={chargeDetailsDialog}
        onOpenChange={setChargeDetailsDialog}
        chargeTitle={selectedCharge}
        chargeDetails={chargesDetails}
      />
    </>
  );
};

export default DuesManagement;
