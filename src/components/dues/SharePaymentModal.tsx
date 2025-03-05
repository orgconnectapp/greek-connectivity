
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share, Copy, Check, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SharePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentDetails: {
    id: number;
    description: string;
    amount: number;
    dueDate?: string;
  } | null;
}

const SharePaymentModal = ({ open, onOpenChange, paymentDetails }: SharePaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  
  if (!paymentDetails) return null;
  
  // Generate the payment link (in a real app, this would likely include a unique token)
  const paymentLink = `${window.location.origin}/external-payment/${paymentDetails.id}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Payment link has been copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleEmailShare = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send an email via API
    // For now, we'll just open the mail client
    const subject = encodeURIComponent(`Payment request: ${paymentDetails.description}`);
    const body = encodeURIComponent(
      `Hello,\n\nI'm sharing this payment link for my ${paymentDetails.description} dues. The amount is $${paymentDetails.amount}.\n\nYou can make the payment here: ${paymentLink}\n\nThank you!`
    );
    
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
    
    toast({
      title: "Email opened",
      description: "Your default email client has been opened with the payment details",
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Payment Link</DialogTitle>
          <DialogDescription>
            Share this secure payment link with anyone who needs to make this payment on your behalf.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="payment-details">Payment Details</Label>
            <div id="payment-details" className="rounded-md bg-muted p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{paymentDetails.description}</span>
                <span className="text-primary font-semibold">${paymentDetails.amount}</span>
              </div>
              {paymentDetails.dueDate && (
                <p className="text-xs text-muted-foreground">Due on {paymentDetails.dueDate}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="payment-link">Payment Link</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="payment-link"
                value={paymentLink}
                readOnly
                className="flex-1"
              />
              <Button 
                size="icon" 
                variant="outline" 
                onClick={handleCopyLink}
                title="Copy to clipboard"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This link can be used by anyone to pay this specific due amount on your behalf.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Send via Email</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="email"
                type="email"
                placeholder="parent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleEmailShare}
                title="Send email"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <Button 
            type="button" 
            variant="secondary" 
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SharePaymentModal;
