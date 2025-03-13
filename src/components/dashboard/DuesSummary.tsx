
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { CreditCard, Share, CalendarDays, Receipt } from 'lucide-react';
import DashboardCard from './DashboardCard';
import { Button } from '@/components/ui/button';
import PaymentModal from '../dues/PaymentModal';
import SharePaymentModal from '../dues/SharePaymentModal';

export interface DuesData {
  paidAmount: number;
  totalAmount: number;
  remainingAmount: number;
  dueDate: string;
  nextPaymentAmount: number;
  progressPercentage: number;
  chargeBreakdown: DuesChargeItem[];
}

export interface DuesChargeItem {
  name: string;
  amount: number;
  description?: string;
}

// Move duesData outside of the component
export const duesData: DuesData = {
  paidAmount: 250,
  totalAmount: 500,
  remainingAmount: 250, // totalAmount - paidAmount
  dueDate: "April 15, 2024",
  nextPaymentAmount: 125,
  progressPercentage: 50, // Math.round((paidAmount / totalAmount) * 100)
  chargeBreakdown: [
    {
      name: "National Dues",
      amount: 200,
      description: "Annual membership fees to national organization"
    },
    {
      name: "Chapter Fees",
      amount: 150,
      description: "Local chapter operational costs"
    },
    {
      name: "Event Fund",
      amount: 100,
      description: "Contribution to chapter events"
    },
    {
      name: "Insurance",
      amount: 50,
      description: "Liability coverage for members"
    }
  ]
};

const DuesSummary = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const { paidAmount, totalAmount, remainingAmount, dueDate, nextPaymentAmount, progressPercentage } = duesData;

  return (
    <DashboardCard 
      title="Dues Status" 
      description="Current payment status"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">${paidAmount}</p>
            <p className="text-sm text-muted-foreground">of ${totalAmount} paid</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <div className="rounded-md bg-muted p-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="font-medium">Remaining</span>
            <span className="text-destructive font-medium">${remainingAmount}</span>
          </div>
          <p className="text-xs text-muted-foreground">Due on {dueDate}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            className="w-full" 
            onClick={() => setIsPaymentModalOpen(true)}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Pay Now
          </Button>
          
          <Button 
            className="w-full" 
            variant="outline"
            onClick={() => setIsShareModalOpen(true)}
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        
        <PaymentModal
          open={isPaymentModalOpen}
          onOpenChange={setIsPaymentModalOpen}
          outstandingAmount={remainingAmount}
        />
        
        <SharePaymentModal
          open={isShareModalOpen}
          onOpenChange={setIsShareModalOpen}
          paymentDetails={{
            id: 1,
            description: "Chapter Dues",
            amount: remainingAmount,
            dueDate: dueDate
          }}
        />
      </div>
    </DashboardCard>
  );
};

export default DuesSummary;
