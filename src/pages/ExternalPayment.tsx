
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// In a real app, this would fetch data from an API based on the payment ID
const getPaymentDetails = (id: string) => {
  // This is just mock data
  const mockPayments = [
    { 
      id: "1", 
      description: "Fall Semester Dues", 
      amount: 250,
      studentName: "Alex Johnson",
      organization: "Alpha Phi Omega"
    },
    { 
      id: "2", 
      description: "Winter Activity Fee", 
      amount: 75,
      studentName: "Alex Johnson",
      organization: "Alpha Phi Omega"
    },
    { 
      id: "3", 
      description: "Spring Semester Dues", 
      amount: 250,
      studentName: "Alex Johnson",
      organization: "Alpha Phi Omega"
    },
  ];
  
  return mockPayments.find(p => p.id === id) || null;
};

const ExternalPayment = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    if (paymentId) {
      const paymentData = getPaymentDetails(paymentId);
      setPayment(paymentData);
      setLoading(false);
    }
  }, [paymentId]);
  
  const handlePayment = () => {
    // In a real app, this would open a payment processor like Stripe
    toast({
      title: "Payment Processing",
      description: "This would connect to a payment processor in a real application."
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-36 bg-gray-200 rounded-md mx-auto"></div>
          <div className="h-64 w-full max-w-md bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  }
  
  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl text-center text-red-600">Payment Not Found</CardTitle>
            <CardDescription className="text-center">
              This payment link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{payment.organization}</CardTitle>
          <CardDescription>External Payment Portal</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Payment Details</h3>
            <div className="rounded-md bg-muted p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Student Name:</span>
                <span className="font-medium">{payment.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Description:</span>
                <span className="font-medium">{payment.description}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Due:</span>
                <span className="font-bold text-primary">${payment.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <div className="grid gap-3">
              <div className="flex items-center space-x-3 rounded-md border p-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Credit or Debit Card</p>
                  <p className="text-xs text-muted-foreground">Pay securely with your card</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button className="w-full" onClick={handlePayment}>
            Pay ${payment.amount.toFixed(2)}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExternalPayment;
