
import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DonorType, FundraiserType } from './data';

interface FundraiserDetailsDialogProps {
  fundraiser: FundraiserType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donors: DonorType[];
  onContribute?: (fundraiser: FundraiserType) => void;
}

const FundraiserDetailsDialog = ({
  fundraiser,
  open,
  onOpenChange,
  donors,
  onContribute
}: FundraiserDetailsDialogProps) => {
  if (!fundraiser) return null;

  const handleContribute = () => {
    if (onContribute && fundraiser) {
      onOpenChange(false); // Close the details dialog
      onContribute(fundraiser);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">{fundraiser.title}</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            {fundraiser.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          <div className="md:col-span-2">
            <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden">
              <img
                src={fundraiser.image}
                alt={fundraiser.title}
                className="h-full w-full object-cover"
              />
            </AspectRatio>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Fundraiser Details</h3>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge className={
                  fundraiser.status === 'active' ? "bg-green-100 text-green-700" :
                  fundraiser.status === 'upcoming' ? "bg-blue-100 text-blue-700" :
                  "bg-gray-100 text-gray-700"
                }>
                  {fundraiser.status.charAt(0).toUpperCase() + fundraiser.status.slice(1)}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{fundraiser.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Goal</span>
                <span>${fundraiser.goal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Raised</span>
                <span>${fundraiser.raised}</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span>
                    {Math.min(Math.round((fundraiser.raised / fundraiser.goal) * 100), 100)}%
                  </span>
                </div>
                <Progress
                  value={Math.min(Math.round((fundraiser.raised / fundraiser.goal) * 100), 100)}
                  className="h-2"
                />
              </div>
            </div>

            {fundraiser.status === 'active' && (
              <Button className="w-full" onClick={handleContribute}>Contribute Now</Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Donor List</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={donor.avatar} alt={donor.name} />
                        <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{donor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>${donor.amount}</TableCell>
                  <TableCell>{donor.date}</TableCell>
                </TableRow>
              ))}
              {donors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                    No donors yet for this fundraiser
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FundraiserDetailsDialog;
