import React, { useState } from 'react';
import { Shield, Users, Building, CreditCard, Settings, Search, User, Wallet, FileText, Calendar, Info, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Mock organization data
const organizations = [
  {
    id: '1',
    name: 'Lambda Chi Alpha',
    chapter: 'Phi Alpha Zeta',
    members: 45,
    activeStatus: 'active',
    billingStatus: 'current',
    lastPayment: '2024-03-15',
    subscription: 'Professional',
    createdAt: '2022-05-10',
  },
  {
    id: '2',
    name: 'Alpha Phi Omega',
    chapter: 'Nu Gamma',
    members: 38,
    activeStatus: 'active',
    billingStatus: 'current',
    lastPayment: '2024-03-02',
    subscription: 'Basic',
    createdAt: '2023-01-15',
  },
  {
    id: '3',
    name: 'Delta Sigma Phi',
    chapter: 'Alpha Beta',
    members: 52,
    activeStatus: 'active',
    billingStatus: 'overdue',
    lastPayment: '2023-12-10',
    subscription: 'Professional',
    createdAt: '2021-09-22',
  },
  {
    id: '4',
    name: 'Kappa Alpha Theta',
    chapter: 'Beta Lambda',
    members: 61,
    activeStatus: 'suspended',
    billingStatus: 'overdue',
    lastPayment: '2023-11-05',
    subscription: 'Enterprise',
    createdAt: '2022-02-18',
  },
  {
    id: '5',
    name: 'Sigma Chi',
    chapter: 'Gamma Epsilon',
    members: 47,
    activeStatus: 'active',
    billingStatus: 'current',
    lastPayment: '2024-02-28',
    subscription: 'Enterprise',
    createdAt: '2021-08-30',
  }
];

// Mock global users data
const globalUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Admin',
    organization: 'Lambda Chi Alpha',
    lastLogin: '2024-05-10T14:30:00',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Admin',
    organization: 'Alpha Phi Omega',
    lastLogin: '2024-05-09T10:15:00',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Robert Miller',
    email: 'robert.miller@example.com',
    role: 'Admin',
    organization: 'Delta Sigma Phi',
    lastLogin: '2024-05-08T16:45:00',
    status: 'suspended',
    joinDate: '2022-11-05',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    role: 'Member',
    organization: 'Kappa Alpha Theta',
    lastLogin: '2024-05-07T09:20:00',
    status: 'active',
    joinDate: '2023-03-10',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'Member',
    organization: 'Sigma Chi',
    lastLogin: '2024-05-06T11:30:00',
    status: 'active',
    joinDate: '2023-04-25',
  }
];

// Mock billing data
const billingData = [
  {
    id: '1',
    organization: 'Lambda Chi Alpha',
    plan: 'Professional',
    amount: '$149.99/month',
    lastPayment: '2024-05-15',
    nextPayment: '2024-06-15',
    status: 'current',
    paymentMethod: 'Visa ending in 4242',
  },
  {
    id: '2',
    organization: 'Alpha Phi Omega',
    plan: 'Basic',
    amount: '$89.99/month',
    lastPayment: '2024-05-02',
    nextPayment: '2024-06-02',
    status: 'current',
    paymentMethod: 'Mastercard ending in 8888',
  },
  {
    id: '3',
    organization: 'Delta Sigma Phi',
    plan: 'Professional',
    amount: '$149.99/month',
    lastPayment: '2023-12-10',
    nextPayment: '2024-01-10',
    status: 'overdue',
    paymentMethod: 'American Express ending in 1234',
  },
  {
    id: '4',
    organization: 'Kappa Alpha Theta',
    plan: 'Enterprise',
    amount: '$299.99/month',
    lastPayment: '2023-11-05',
    nextPayment: '2023-12-05',
    status: 'overdue',
    paymentMethod: 'Discover ending in 5678',
  },
  {
    id: '5',
    organization: 'Sigma Chi',
    plan: 'Enterprise',
    amount: '$299.99/month',
    lastPayment: '2024-04-28',
    nextPayment: '2024-05-28',
    status: 'current',
    paymentMethod: 'Visa ending in 9876',
  }
];

// System settings data
const systemSettings = [
  {
    category: 'Security',
    settings: [
      { name: 'Two-Factor Authentication', status: 'Enabled', description: 'Require 2FA for all admin users' },
      { name: 'Password Policy', status: 'Strict', description: 'Minimum 12 characters with special characters' },
      { name: 'Session Timeout', status: '30 minutes', description: 'Auto-logout after inactivity period' }
    ]
  },
  {
    category: 'Email',
    settings: [
      { name: 'SMTP Configuration', status: 'Configured', description: 'Using SendGrid API' },
      { name: 'Email Templates', status: '12 Active', description: 'Notification and onboarding templates' },
      { name: 'Daily Email Limit', status: '10,000', description: 'Maximum emails per day' }
    ]
  },
  {
    category: 'Features',
    settings: [
      { name: 'Payment Processing', status: 'Enabled', description: 'Stripe integration active' },
      { name: 'Calendar Integration', status: 'Enabled', description: 'Google Calendar sync available' },
      { name: 'File Storage', status: 'Enabled', description: '5GB per organization limit' }
    ]
  },
  {
    category: 'System Health',
    settings: [
      { name: 'Database Backups', status: 'Daily', description: 'Automatic backups at 2:00 AM UTC' },
      { name: 'Performance Monitoring', status: 'Active', description: 'New Relic integration' },
      { name: 'Error Logging', status: 'Enabled', description: 'Sentry.io integration' }
    ]
  }
];

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('organizations');
  const [searchTerm, setSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter organizations based on search term
  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    org.chapter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter users based on search term
  const filteredUsers = globalUsers.filter(user => 
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const resetOrgPassword = (orgId: string) => {
    toast.success(`Password reset email sent to organization ID: ${orgId}`);
  };

  const suspendOrg = (orgId: string) => {
    toast.success(`Organization ID: ${orgId} has been suspended`);
  };

  const activateOrg = (orgId: string) => {
    toast.success(`Organization ID: ${orgId} has been activated`);
  };

  const resetUserPassword = (userId: string) => {
    toast.success(`Password reset email sent to user ID: ${userId}`);
  };

  const suspendUser = (userId: string) => {
    toast.success(`User ID: ${userId} has been suspended`);
  };

  const activateUser = (userId: string) => {
    toast.success(`User ID: ${userId} has been activated`);
  };

  const sendPaymentReminder = (billingId: string) => {
    toast.success(`Payment reminder sent for billing ID: ${billingId}`);
  };

  const updateSystemSetting = (category: string, setting: string) => {
    toast.success(`${setting} setting in ${category} category updated successfully`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage all organizations, users, and system settings.
          </p>
        </div>
        <Badge variant="destructive" className="gap-1">
          <Shield className="h-3.5 w-3.5" />
          Super Admin Access
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
          <TabsTrigger value="users">Global Users</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="organizations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Management</CardTitle>
              <CardDescription>View and manage all organizations on the platform.</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search organizations..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organization</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrganizations.map((org) => (
                      <TableRow key={org.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{org.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{org.name}</p>
                              <p className="text-sm text-muted-foreground">{org.chapter}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{org.members}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={org.activeStatus === 'active' ? 'outline' : 'destructive'}
                            className={org.activeStatus === 'active' ? 'bg-green-500/10 text-green-500' : ''}
                          >
                            {org.activeStatus === 'active' ? 'Active' : 'Suspended'}
                          </Badge>
                        </TableCell>
                        <TableCell>{org.subscription}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/super-admin/org/${org.id}`)}
                            >
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => resetOrgPassword(org.id)}
                            >
                              Reset Password
                            </Button>
                            {org.activeStatus === 'active' ? (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => suspendOrg(org.id)}
                              >
                                Suspend
                              </Button>
                            ) : (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => activateOrg(org.id)}
                              >
                                Activate
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global User Management</CardTitle>
              <CardDescription>Manage all users across all organizations.</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.organization}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === 'active' ? 'outline' : 'destructive'}
                            className={user.status === 'active' ? 'bg-green-500/10 text-green-500' : ''}
                          >
                            {user.status === 'active' ? 'Active' : 'Suspended'}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => resetUserPassword(user.id)}
                            >
                              Reset Password
                            </Button>
                            {user.status === 'active' ? (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => suspendUser(user.id)}
                              >
                                Suspend
                              </Button>
                            ) : (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => activateUser(user.id)}
                              >
                                Activate
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing Management</CardTitle>
              <CardDescription>View and manage billing for all organizations.</CardDescription>
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
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure global system settings for the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {systemSettings.map((category) => (
                  <div key={category.category} className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      {category.category === 'Security' && <Shield className="h-5 w-5 text-primary" />}
                      {category.category === 'Email' && <Mail className="h-5 w-5 text-primary" />}
                      {category.category === 'Features' && <Settings className="h-5 w-5 text-primary" />}
                      {category.category === 'System Health' && <Info className="h-5 w-5 text-primary" />}
                      {category.category}
                    </h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Setting</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {category.settings.map((setting) => (
                            <TableRow key={setting.name}>
                              <TableCell className="font-medium">{setting.name}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {setting.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{setting.description}</TableCell>
                              <TableCell className="text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateSystemSetting(category.category, setting.name)}
                                >
                                  Configure
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))}

                <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-4 mt-6">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <h4 className="font-semibold text-amber-700">System Maintenance</h4>
                  </div>
                  <p className="text-amber-600 mt-1">Scheduled database maintenance on May 30, 2024 from 2:00 AM to 4:00 AM UTC. The system will be in read-only mode during this period.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdmin;
