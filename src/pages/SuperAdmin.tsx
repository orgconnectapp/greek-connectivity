
import React, { useState } from 'react';
import { Shield, Users, Building, CreditCard, Settings, Search } from 'lucide-react';
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

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('organizations');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter organizations based on search term
  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    org.chapter.toLowerCase().includes(searchTerm.toLowerCase())
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
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-8 flex flex-col items-center justify-center text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Global User Management</h3>
                <p className="text-muted-foreground mt-2 mb-4">View and manage all users across organizations on the platform.</p>
                <Button disabled>Coming Soon</Button>
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
              <div className="rounded-md border p-8 flex flex-col items-center justify-center text-center">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Billing Dashboard</h3>
                <p className="text-muted-foreground mt-2 mb-4">Monitor subscriptions, payments, and billing issues across all organizations.</p>
                <Button disabled>Coming Soon</Button>
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
              <div className="rounded-md border p-8 flex flex-col items-center justify-center text-center">
                <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">System Configuration</h3>
                <p className="text-muted-foreground mt-2 mb-4">Manage global settings, feature flags, and system configurations.</p>
                <Button disabled>Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdmin;
