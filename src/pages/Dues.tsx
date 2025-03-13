
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { duesData } from '@/components/dashboard/DuesSummary';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CreditCard, Share, Calendar, AlertCircle, Receipt, FileText } from 'lucide-react';
import PaymentModal from '@/components/dues/PaymentModal';
import SharePaymentModal from '@/components/dues/SharePaymentModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Dues = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPaymentPlanModalOpen, setIsPaymentPlanModalOpen] = useState(false);

  const { paidAmount, totalAmount, remainingAmount, dueDate, progressPercentage, chargeBreakdown } = duesData;

  return (
    <div className="container mx-auto py-6 space-y-8">
      <h1 className="text-3xl font-bold">My Dues</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Payment Actions */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow sm:col-span-1">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Make a Payment</h3>
            <p className="text-sm text-muted-foreground mb-4">Pay your outstanding dues quickly and easily</p>
            <Button onClick={() => setIsPaymentModalOpen(true)} className="w-full">
              Pay Now
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow sm:col-span-1">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Share className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Share Payment</h3>
            <p className="text-sm text-muted-foreground mb-4">Send payment link to parents or others</p>
            <Button variant="outline" onClick={() => setIsShareModalOpen(true)} className="w-full">
              Share Link
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow sm:col-span-1">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Payment Plan</h3>
            <p className="text-sm text-muted-foreground mb-4">Set up a manageable payment schedule</p>
            <Button variant="outline" onClick={() => setIsPaymentPlanModalOpen(true)} className="w-full">
              Set Up Plan
            </Button>
          </div>
        </div>
        
        {/* Dues Status Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="space-y-4">
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
              
              <Button 
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full mt-2"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </TabsContent>
            
            <TabsContent value="breakdown">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Charge Breakdown</h3>
                  <div className="text-sm text-muted-foreground flex items-center space-x-1">
                    <Receipt className="h-4 w-4" />
                    <span>Total: ${totalAmount}</span>
                  </div>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chargeBreakdown.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="flex items-center space-x-1 text-sm font-medium">
                                <span>{item.name}</span>
                                {item.description && (
                                  <FileText className="h-3 w-3 text-muted-foreground" />
                                )}
                              </TooltipTrigger>
                              {item.description && (
                                <TooltipContent>
                                  <p>{item.description}</p>
                                </TooltipContent>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-right">${item.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="rounded-md bg-muted p-3 mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">Amount Paid</span>
                    <span className="text-green-600 font-medium">${paidAmount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Amount Remaining</span>
                    <span className="text-destructive font-medium">${remainingAmount}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full mt-2"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay Now
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Payment History Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-left py-3 px-4">Amount</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Mar 1, 2024</td>
                <td className="py-3 px-4">Chapter Dues Payment</td>
                <td className="py-3 px-4">$125.00</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Feb 1, 2024</td>
                <td className="py-3 px-4">Chapter Dues Payment</td>
                <td className="py-3 px-4">$125.00</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modals */}
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
      
      <PaymentPlanModal
        open={isPaymentPlanModalOpen}
        onOpenChange={setIsPaymentPlanModalOpen}
        outstandingAmount={remainingAmount}
        dueDate={dueDate}
      />
    </div>
  );
};

// Payment Plan Modal component
interface PaymentPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  outstandingAmount: number;
  dueDate: string;
}

const PaymentPlanModal = ({ open, onOpenChange, outstandingAmount, dueDate }: PaymentPlanModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'biweekly'>('monthly');
  
  const plans = {
    monthly: {
      payments: 4,
      amount: Math.ceil(outstandingAmount / 4)
    },
    biweekly: {
      payments: 8,
      amount: Math.ceil(outstandingAmount / 8)
    }
  };
  
  const handleSetupPlan = () => {
    // Here would be the logic to set up the payment plan
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Up Payment Plan</DialogTitle>
          <DialogDescription>
            Choose a payment schedule that works for you.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Outstanding Amount</h3>
            <div className="rounded-md bg-muted p-3">
              <div className="flex items-center justify-between">
                <span>Total Due</span>
                <span className="font-semibold">${outstandingAmount}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Due by {dueDate}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Select Payment Schedule</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${selectedPlan === 'monthly' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                onClick={() => setSelectedPlan('monthly')}
              >
                <h4 className="font-medium">Monthly</h4>
                <p className="text-sm text-muted-foreground">4 payments</p>
                <p className="text-lg font-semibold mt-2">${plans.monthly.amount}/mo</p>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${selectedPlan === 'biweekly' ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'}`}
                onClick={() => setSelectedPlan('biweekly')}
              >
                <h4 className="font-medium">Bi-weekly</h4>
                <p className="text-sm text-muted-foreground">8 payments</p>
                <p className="text-lg font-semibold mt-2">${plans.biweekly.amount}/2wk</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-3">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  First payment will be processed immediately. You can cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSetupPlan}>Setup Plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Export the Dues component as the default export
export default Dues;
