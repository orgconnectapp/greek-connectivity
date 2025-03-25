
import React from 'react';
import { Wallet, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { billingData } from './mockData';

const BillingTab = () => {
  const navigate = useNavigate();

  const sendPaymentReminder = (billingId: string) => {
    toast.success(`Payment reminder sent for billing ID: ${billingId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Last Payment</TableHead>
              <TableHead>Next Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billingData.map((billing) => (
              <TableRow key={billing.id}>
                <TableCell>{billing.organization}</TableCell>
                <TableCell>{billing.plan}</TableCell>
                <TableCell>{billing.amount}</TableCell>
                <TableCell>{billing.lastPayment}</TableCell>
                <TableCell>{billing.nextPayment}</TableCell>
                <TableCell>
                  <Badge 
                    variant={billing.status === 'current' ? 'outline' : 'destructive'}
                    className={billing.status === 'current' ? 'bg-green-500/10 text-green-500' : ''}
                  >
                    {billing.status === 'current' ? 'Current' : 'Overdue'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/billing')}
                    >
                      View Details
                    </Button>
                    {billing.status === 'overdue' && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => sendPaymentReminder(billing.id)}
                      >
                        Send Reminder
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">$5,249.99</p>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Pending Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p>
              <p className="text-sm text-muted-foreground">$2,099.92 total value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Next Billing Cycle
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Jun 1</p>
              <p className="text-sm text-muted-foreground">15 organizations</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingTab;
