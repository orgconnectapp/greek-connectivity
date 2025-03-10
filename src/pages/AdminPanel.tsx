import React, { useState } from 'react';
import { 
  Shield, 
  UserCog, 
  Settings, 
  Key, 
  Users,
  Database,
  ServerCog,
  Upload,
  Download,
  Bell,
  CreditCard
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import DashboardCard from '@/components/dashboard/DashboardCard';
import CreateDueChargeModal from '@/components/admin/CreateDueChargeModal';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground">
            Manage your organization's settings and permissions.
          </p>
        </div>
        <Badge variant="secondary" className="gap-1">
          <Shield className="h-3.5 w-3.5" />
          Admin Access
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="dues">Dues Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Total Members"
              description="Active members in your organization"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">24</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </DashboardCard>
            
            <DashboardCard
              title="Pending Approvals"
              description="Members awaiting verification"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">3</div>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </div>
            </DashboardCard>
            
            <DashboardCard
              title="System Health"
              description="All systems operational"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-500">100%</div>
                <ServerCog className="h-4 w-4 text-muted-foreground" />
              </div>
            </DashboardCard>
            
            <DashboardCard
              title="Data Storage"
              description="Documents and media"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">1.2GB</div>
                <Database className="h-4 w-4 text-muted-foreground" />
              </div>
            </DashboardCard>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions by admins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { user: 'Jason Smith', action: 'Updated member role', time: '2 hours ago' },
                    { user: 'Emma Johnson', action: 'Approved new member', time: '5 hours ago' },
                    { user: 'Michael Brown', action: 'Created new fundraiser', time: '1 day ago' },
                    { user: 'Sophia Garcia', action: 'Modified dues schedule', time: '2 days ago' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 text-sm">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{item.user}</p>
                        <p className="text-muted-foreground">{item.action}</p>
                      </div>
                      <div className="text-muted-foreground">{item.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used admin tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Button className="justify-start">
                    <Upload className="mr-2 h-4 w-4" />
                    Export Member Data
                  </Button>
                  <Button className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Generate Reports
                  </Button>
                  <Button className="justify-start">
                    <Bell className="mr-2 h-4 w-4" />
                    Send Organization Announcement
                  </Button>
                  <Button className="justify-start">
                    <ServerCog className="mr-2 h-4 w-4" />
                    System Configuration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Member Management</CardTitle>
                <Button size="sm">
                  <UserCog className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </div>
              <CardDescription>
                Manage roles and permissions for organization members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Input placeholder="Search members..." className="max-w-sm" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="president">President</SelectItem>
                    <SelectItem value="treasurer">Treasurer</SelectItem>
                    <SelectItem value="secretary">Secretary</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableCaption>A list of all members with their roles and permissions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Admin Access</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      name: 'Jason Smith', 
                      role: 'President', 
                      email: 'jason@greeksync.com',
                      status: 'Active',
                      admin: true
                    },
                    { 
                      name: 'Emma Johnson', 
                      role: 'Vice President', 
                      email: 'emma@greeksync.com',
                      status: 'Active',
                      admin: true
                    },
                    { 
                      name: 'Michael Brown', 
                      role: 'Treasurer', 
                      email: 'michael@greeksync.com',
                      status: 'Active',
                      admin: true
                    },
                    { 
                      name: 'Sophia Garcia', 
                      role: 'Secretary', 
                      email: 'sophia@greeksync.com',
                      status: 'Active',
                      admin: false
                    },
                    { 
                      name: 'Alex Williams', 
                      role: 'Event Coordinator', 
                      email: 'alex@greeksync.com',
                      status: 'Active',
                      admin: false
                    },
                  ].map((member, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>
                        <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch checked={member.admin} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dues" className="space-y-4">
          <Card>
            <CardHeader className="space-y-0 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Dues Management</CardTitle>
                  <CardDescription>
                    Create and manage due charges for your organization
                  </CardDescription>
                </div>
                <CreateDueChargeModal />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Input placeholder="Search due charges..." className="max-w-sm" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="regular">Regular Dues</SelectItem>
                    <SelectItem value="late">Late Fees</SelectItem>
                    <SelectItem value="event">Event Fees</SelectItem>
                    <SelectItem value="other">Other Charges</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Table>
                <TableCaption>A list of all due charges for your organization</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { 
                      title: 'Spring 2024 Membership Dues', 
                      amount: '$150.00', 
                      type: 'Regular Dues',
                      dueDate: 'Apr 15, 2024',
                      created: 'Mar 1, 2024',
                      status: 'Active',
                    },
                    { 
                      title: 'Leadership Conference Fee', 
                      amount: '$35.00', 
                      type: 'Event Fee',
                      dueDate: 'Mar 30, 2024',
                      created: 'Mar 5, 2024',
                      status: 'Active',
                    },
                    { 
                      title: 'Late Payment Fee', 
                      amount: '$25.00', 
                      type: 'Late Fee',
                      dueDate: 'May 1, 2024',
                      created: 'Mar 15, 2024',
                      status: 'Pending',
                    },
                  ].map((dues, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{dues.title}</TableCell>
                      <TableCell>{dues.amount}</TableCell>
                      <TableCell>{dues.type}</TableCell>
                      <TableCell>{dues.dueDate}</TableCell>
                      <TableCell>{dues.created}</TableCell>
                      <TableCell>
                        <Badge variant={dues.status === 'Active' ? 'default' : 'secondary'}>
                          {dues.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>
                Configure your organization's profile and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization Name</label>
                  <Input defaultValue="Alpha Phi Omega" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Chapter Designation</label>
                  <Input defaultValue="Gamma Alpha" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Founded Year</label>
                  <Input defaultValue="1992" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Term Structure</label>
                  <Select defaultValue="semester">
                    <SelectTrigger>
                      <SelectValue placeholder="Select term structure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semester">Semester</SelectItem>
                      <SelectItem value="quarter">Quarter</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Organization Description</label>
                <textarea 
                  className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2"
                  defaultValue="Alpha Phi Omega is a national co-educational service fraternity founded on the principles of leadership, friendship, and service."
                />
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security preferences and data protection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin users
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password Requirements</p>
                  <p className="text-sm text-muted-foreground">
                    Enforce strong password policy
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Session Timeout</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out inactive users
                  </p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="0">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure what each role can access and modify
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="president" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="president">President</TabsTrigger>
                  <TabsTrigger value="vice-president">Vice President</TabsTrigger>
                  <TabsTrigger value="treasurer">Treasurer</TabsTrigger>
                  <TabsTrigger value="secretary">Secretary</TabsTrigger>
                  <TabsTrigger value="member">Member</TabsTrigger>
                </TabsList>
                <div className="mt-4 space-y-4">
                  {[
                    { feature: 'Dashboard Access', description: 'View organization metrics' },
                    { feature: 'Member Management', description: 'Add, edit, or remove members' },
                    { feature: 'Financial Management', description: 'Manage dues and expenses' },
                    { feature: 'Fundraiser Creation', description: 'Create and edit fundraisers' },
                    { feature: 'Admin Panel', description: 'Access admin settings' },
                    { feature: 'Export Data', description: 'Export organization data' },
                    { feature: 'Messaging', description: 'Send organization-wide messages' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{item.feature}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  ))}
                </div>
              </Tabs>
              <div className="mt-4 flex justify-end">
                <Button>Update Permissions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
