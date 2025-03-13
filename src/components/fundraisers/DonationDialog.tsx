
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, CreditCard, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { FundraiserType } from './data';

interface DonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fundraiser: FundraiserType | null;
}

type DonationStep = 'amount' | 'payment' | 'confirmation';

const paymentSchema = z.object({
  cardName: z.string().min(1, 'Name is required'),
  cardNumber: z.string().min(16, 'Card number must be at least 16 digits'),
  expiryDate: z.string().min(5, 'Expiry date required'),
  cvv: z.string().min(3, 'CVV must be at least 3 digits'),
});

const DonationDialog = ({ open, onOpenChange, fundraiser }: DonationDialogProps) => {
  const [step, setStep] = useState<DonationStep>('amount');
  const [selectedAmount, setSelectedAmount] = useState<string>('25');
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const resetDialog = () => {
    setStep('amount');
    setSelectedAmount('25');
    setCustomAmount('');
    form.reset();
  };

  const handleClose = () => {
    onOpenChange(false);
    resetDialog();
  };

  const handleAmountContinue = () => {
    setStep('payment');
  };

  const handleSubmitPayment = (values: z.infer<typeof paymentSchema>) => {
    console.log('Payment details:', values);
    console.log('Donation amount:', customAmount || selectedAmount);
    
    // In a real app, this would send the payment to a payment processor
    setTimeout(() => {
      setStep('confirmation');
      toast({
        title: "Thank you for your donation!",
        description: `Your donation of $${customAmount || selectedAmount} to "${fundraiser?.title}" has been processed.`,
      });
    }, 1000);
  };

  const getActualAmount = () => {
    return customAmount ? `$${customAmount}` : `$${selectedAmount}`;
  };

  const handleBack = () => {
    if (step === 'payment') {
      setStep('amount');
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimals
    if (value === '' || /^\d+(\.\d{0,2})?$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount('custom');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === 'amount' && (
          <>
            <DialogHeader>
              <DialogTitle>Make a Donation</DialogTitle>
              <DialogDescription>
                {fundraiser?.title ? `Support "${fundraiser.title}"` : 'Choose an amount to donate'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <RadioGroup 
                value={selectedAmount} 
                onValueChange={setSelectedAmount}
                className="grid grid-cols-3 gap-4"
              >
                {['10', '25', '50', '100', '250', '500'].map((amount) => (
                  <div key={amount} className="flex items-center space-x-2">
                    <RadioGroupItem value={amount} id={`amount-${amount}`} className="sr-only" />
                    <Label
                      htmlFor={`amount-${amount}`}
                      className={`flex flex-col items-center justify-center w-full h-20 border rounded-md transition-colors cursor-pointer ${
                        selectedAmount === amount
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card hover:bg-accent'
                      }`}
                    >
                      <DollarSign className="h-4 w-4 mb-1" />
                      <span>${amount}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="pt-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value="custom" 
                    id="amount-custom" 
                    checked={selectedAmount === 'custom'}
                    onClick={() => setSelectedAmount('custom')}
                    className="sr-only" 
                  />
                  <Label
                    htmlFor="amount-custom"
                    className={`flex items-center space-x-2 w-full h-14 border rounded-md px-3 transition-colors cursor-pointer ${
                      selectedAmount === 'custom'
                        ? 'bg-primary/10 border-primary'
                        : 'bg-card hover:bg-accent'
                    }`}
                  >
                    <div className="flex items-center w-full">
                      <span className="text-muted-foreground">$</span>
                      <Input
                        type="text"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        onClick={() => setSelectedAmount('custom')}
                        placeholder="Other amount"
                        className="border-none shadow-none focus-visible:ring-0 pl-0"
                      />
                    </div>
                  </Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleAmountContinue}>
                Continue
              </Button>
            </DialogFooter>
          </>
        )}
        
        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
              <DialogDescription>
                You're donating {getActualAmount()} to "{fundraiser?.title}"
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitPayment)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name on Card</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="4242 4242 4242 4242" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" />
                    Send Donation
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
        
        {step === 'confirmation' && (
          <>
            <DialogHeader>
              <DialogTitle>Thank You!</DialogTitle>
              <DialogDescription>
                Your donation has been processed successfully.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium">
                  {getActualAmount()} Donated
                </p>
                <p className="text-muted-foreground">
                  to {fundraiser?.title}
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button onClick={handleClose}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
