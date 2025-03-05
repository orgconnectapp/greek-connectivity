
import React from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Check, 
  Clock, 
  CreditCard, 
  Download 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Mock data
const payments = [
  { 
    id: 1, 
    description: 'Fall Semester Dues', 
    amount: 250,
    status: 'paid',
    date: 'Sept 15, 2023',
    method: 'Credit Card'
  },
  { 
    id: 2, 
    description: 'Winter Activity Fee', 
    amount: 75,
    status: 'paid',
    date: 'Dec 5, 2023',
    method: 'PayPal'
  },
  { 
    id: 3, 
    description: 'Spring Semester Dues', 
    amount: 250,
    status: 'pending',
    date: 'Apr 15, 2024',
    method: 'Pending'
  },
];

const upcomingPayments = [
  { 
    id: 1, 
    description: 'Spring Semester Dues', 
    amount: 250,
    dueDate: 'Apr 15, 2024',
  },
  { 
    id: 2, 
    description: 'Summer Event Fee', 
    amount: 100,
    dueDate: 'Jun 1, 2024',
  },
];

const Dues = () => {
  const totalDues = 575;
  const paidDues = 325;
  const dueSoon = 250;
  const progress = Math.round((paidDues / totalDues) * 100);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dues & Payments</h1>
        <p className="text-muted-foreground">
          Manage and track your membership payments.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${totalDues}</div>
              <div className="rounded-full bg-primary/10 p-2">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span>{progress}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid to Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${paidDues}</div>
              <div className="rounded-full bg-green-100 p-2">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Payment</span>
                <span>Dec 5, 2023</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Fall Semester Dues + Winter Activity Fee
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">${dueSoon}</div>
              <div className="rounded-full bg-amber-100 p-2">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Next Due Date</span>
                <span>Apr 15, 2024</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Spring Semester Dues
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="upcoming" className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" />
            Make Payment
          </Button>
        </div>
        
        <TabsContent value="upcoming" className="mt-6">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>
                Payments scheduled for the current semester.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div 
                    key={payment.id} 
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{payment.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        Due {payment.dueDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-semibold">${payment.amount}</p>
                      <Button>
                        Pay Now 
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View all your past and pending payments.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.description}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={payment.status === 'paid' ? 'default' : 'outline'}
                          className={payment.status === 'paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                        >
                          {payment.status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.status === 'paid' && (
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dues;
