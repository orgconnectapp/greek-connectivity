
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, CreditCard, Building, Users, Shield } from "lucide-react";
import { toast } from 'sonner';

// Mock organization data (expanded from the list in SuperAdmin.tsx)
const organizationsData = {
  '1': {
    id: '1',
    name: 'Lambda Chi Alpha',
    chapter: 'Phi Alpha Zeta',
    members: 45,
    activeStatus: 'active',
    billingStatus: 'current',
    lastPayment: '2024-03-15',
    subscription: 'Professional',
    createdAt: '2022-05-10',
    contact: {
      name: 'John Smith',
      email: 'john.smith@lambdachi.org',
      phone: '(555) 123-4567',
      role: 'Chapter President'
    },
    address: '123 Greek Row, University Park, CA 90007',
    university: 'University of Southern California',
    billing: {
      plan: 'Professional',
      amount: '$149.99/month',
      nextBilling: '2024-04-15',
      paymentMethod: 'Visa ending in 4242'
    },
    admins: [
      { name: 'John Smith', role: 'Chapter President', email: 'john.smith@example.com' },
      { name: 'Emma Johnson', role: 'Treasurer', email: 'emma.johnson@example.com' },
      { name: 'Michael Brown', role: 'Secretary', email: 'michael.brown@example.com' }
    ],
    recentActivity: [
      { action: 'Member added', timestamp: '2024-03-18 14:30', user: 'John Smith' },
      { action: 'Dues payment processed', timestamp: '2024-03-15 10:15', user: 'Emma Johnson' },
      { action: 'Settings updated', timestamp: '2024-03-10 16:45', user: 'Michael Brown' },
      { action: 'Event created', timestamp: '2024-03-05 09:20', user: 'John Smith' },
    ]
  },
  '2': {
    id: '2',
    name: 'Alpha Phi Omega',
    chapter: 'Nu Gamma',
    members: 38,
    activeStatus: 'active',
    billingStatus: 'current',
    lastPayment: '2024-03-02',
    subscription: 'Basic',
    createdAt: '2023-01-15',
    contact: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@alphaphiomega.org',
      phone: '(555) 234-5678',
      role: 'Chapter President'
    },
    address: '456 Campus Drive, Berkeley, CA 94720',
    university: 'University of California, Berkeley',
    billing: {
      plan: 'Basic',
      amount: '$89.99/month',
      nextBilling: '2024-04-02',
      paymentMethod: 'Mastercard ending in 8888'
    },
    admins: [
      { name: 'Sarah Johnson', role: 'Chapter President', email: 'sarah.johnson@example.com' },
      { name: 'David Wilson', role: 'Treasurer', email: 'david.wilson@example.com' },
      { name: 'Lisa Chen', role: 'Secretary', email: 'lisa.chen@example.com' }
    ],
    recentActivity: [
      { action: 'Subscription upgraded', timestamp: '2024-03-10 11:20', user: 'Sarah Johnson' },
      { action: 'Dues payment processed', timestamp: '2024-03-02 15:45', user: 'David Wilson' },
      { action: 'Event canceled', timestamp: '2024-02-28 09:30', user: 'Lisa Chen' },
      { action: 'New member onboarded', timestamp: '2024-02-25 14:15', user: 'Sarah Johnson' },
    ]
  },
  '3': {
    id: '3',
    name: 'Delta Sigma Phi',
    chapter: 'Alpha Beta',
    members: 52,
    activeStatus: 'active',
    billingStatus: 'overdue',
    lastPayment: '2023-12-10',
    subscription: 'Professional',
    createdAt: '2021-09-22',
    contact: {
      name: 'Robert Miller',
      email: 'robert.miller@deltasigmaphi.org',
      phone: '(555) 345-6789',
      role: 'Chapter President'
    },
    address: '789 Fraternity Circle, Ann Arbor, MI 48109',
    university: 'University of Michigan',
    billing: {
      plan: 'Professional',
      amount: '$149.99/month',
      nextBilling: 'Overdue since 2024-01-10',
      paymentMethod: 'American Express ending in 1234'
    },
    admins: [
      { name: 'Robert Miller', role: 'Chapter President', email: 'robert.miller@example.com' },
      { name: 'Thomas Lee', role: 'Treasurer', email: 'thomas.lee@example.com' },
      { name: 'Jennifer Garcia', role: 'Secretary', email: 'jennifer.garcia@example.com' }
    ],
    recentActivity: [
      { action: 'Payment reminder sent', timestamp: '2024-03-15 08:30', user: 'System' },
      { action: 'Payment reminder sent', timestamp: '2024-02-15 08:30', user: 'System' },
      { action: 'Payment reminder sent', timestamp: '2024-01-15 08:30', user: 'System' },
      { action: 'Dues payment processed', timestamp: '2023-12-10 13:45', user: 'Thomas Lee' },
    ]
  }
};

const OrganizationProfile = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('overview');
  
  if (!orgId || !organizationsData[orgId]) {
    return (
      <div className="container max-w-5xl mx-auto space-y-8 p-8">
        <Button variant="outline" onClick={() => navigate('/super-admin')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Organizations
        </Button>
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Building className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">Organization Not Found</h2>
            <p className="text-muted-foreground mt-2">The requested organization could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const org = organizationsData[orgId];

  const handleSendPaymentReminder = () => {
    toast.success("Payment reminder sent to organization administrators");
  };

  const handleExtendTrial = () => {
    toast.success("Trial period extended by 30 days");
  };

  const handleResetPassword = () => {
    toast.success("Password reset instructions sent to primary contact");
  };

  const handleToggleStatus = () => {
    const newStatus = org.activeStatus === 'active' ? 'suspended' : 'active';
    const message = newStatus === 'active' ? 'Organization activated successfully' : 'Organization suspended successfully';
    toast.success(message);
  };

  return (
    <div className="container max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate('/super-admin')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Organizations
        </Button>
        <Badge variant="destructive" className="gap-1">
          <Shield className="h-3.5 w-3.5" />
          Super Admin Access
        </Badge>
      </div>

      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{org.name}</h1>
        <p className="text-muted-foreground">
          {org.chapter} - {org.university}
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary/10">
                <AvatarFallback className="text-2xl">
                  {org.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{org.name}</CardTitle>
                <CardDescription>Member since {new Date(org.createdAt).toLocaleDateString()}</CardDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge 
                    variant={org.activeStatus === 'active' ? 'outline' : 'destructive'}
                    className={org.activeStatus === 'active' ? 'bg-green-500/10 text-green-500' : ''}
                  >
                    {org.activeStatus === 'active' ? 'Active' : 'Suspended'}
                  </Badge>
                  <Badge 
                    variant={org.billingStatus === 'current' ? 'outline' : 'destructive'}
                    className={org.billingStatus === 'current' ? 'bg-blue-500/10 text-blue-500' : ''}
                  >
                    {org.billingStatus === 'current' ? 'Billing Current' : 'Billing Overdue'}
                  </Badge>
                  <Badge variant="secondary">{org.subscription} Plan</Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              {org.billingStatus === 'overdue' && (
                <Button onClick={handleSendPaymentReminder}>Send Payment Reminder</Button>
              )}
              <Button variant="outline" onClick={handleResetPassword}>Reset Password</Button>
              <Button 
                variant={org.activeStatus === 'active' ? 'destructive' : 'default'}
                onClick={handleToggleStatus}
              >
                {org.activeStatus === 'active' ? 'Suspend' : 'Activate'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Primary contact for this organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{org.contact.name} - {org.contact.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{org.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{org.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{org.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Subscription and payment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>{org.billing.plan} Plan - {org.billing.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Next billing: {org.billing.nextBilling}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>Members: {org.members}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Payment method: {org.billing.paymentMethod}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Administrators</CardTitle>
              <CardDescription>Users with administrative access</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {org.admins.map((admin, index) => (
                    <TableRow key={index}>
                      <TableCell>{admin.name}</TableCell>
                      <TableCell>{admin.role}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="members" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Members</CardTitle>
              <CardDescription>All members of {org.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-8 flex flex-col items-center justify-center text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Member Management</h3>
                <p className="text-muted-foreground mt-2 mb-4">View and manage all members of this organization.</p>
                <Button disabled>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activity for this organization</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {org.recentActivity.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.timestamp}</TableCell>
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

export default OrganizationProfile;
