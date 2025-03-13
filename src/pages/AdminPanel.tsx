import React, { useState } from 'react';
import { 
  Shield, 
  UserCog, 
  Settings, 
  Key, 
  Users,
  Upload,
  Download,
  Bell,
  CreditCard,
  DollarSign,
  Percent,
  Check,
  X,
  Flag,
  Calendar
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
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import DashboardCard from '@/components/dashboard/DashboardCard';
import CreateDueChargeModal from '@/components/admin/CreateDueChargeModal';
import EventApprovalSection from '@/components/admin/EventApprovalSection';

const pendingFundraisers = [
  {
    id: 1,
    title: "Fall Semester Book Drive",
    creator: "Sophia Garcia",
    goal: 2500,
    description: "Help us collect books for underprivileged children in our community.",
    createdAt: "1 day ago",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=1287&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    title: "Charity Run for Cancer Research",
    creator: "Michael Brown",
    goal: 5000,
    description: "Supporting local cancer research initiatives with a 5K run on campus.",
    createdAt: "2 days ago",
    image: "https://images.unsplash.com/photo-1509099652299-30938b0aeb63?auto=format&fit=crop&q=80&w=1256&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    title: "Chapter House Renovation",
    creator: "Alex Williams",
    goal: 10000,
    description: "Help us update our chapter house with new furniture and appliances.",
    createdAt: "3 days ago",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1267&ixlib=rb-4.0.3"
  }
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [fundraisers, setFundraisers] = useState(pendingFundraisers);
  
  const handleFundraiserApproval = (id: number, approved: boolean) => {
    setFundraisers(prevFundraisers => 
      prevFundraisers.filter(fundraiser => fundraiser.id !== id)
    );
    
    toast({
      title: approved ? "Fundraiser approved" : "Fundraiser denied",
      description: `The fundraiser has been ${approved ? 'approved and is now live' : 'denied and removed from the system'}.`,
    });
  };
  
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
          <div className="grid gap-4 md:grid-cols-2">
            <DashboardCard
              title="Total Organization Members"
              description="Active members in your organization"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">24</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </DashboardCard>
            
            <DashboardCard
              title="Pending Member Approvals"
              description="Members awaiting verification"
            >
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">3</div>
                <UserCog className="h-4 w-4 text-muted-foreground" />
              </div>
            </DashboardCard>
          </div>
          
          <EventApprovalSection />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-primary" />
                Fundraiser Approvals
              </CardTitle>
              <CardDescription>
                Review and approve fundraisers created by members
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fundraisers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No pending fundraisers to approve
                </div>
              ) : (
                <div className="space-y-4">
                  {fundraisers.map((fundraiser) => (
                    <div key={fundraiser.id} className="flex flex-col md:flex-row gap-4 border rounded-lg p-4">
                      <div className="w-full md:w-1/4">
                        <img 
                          src={fundraiser.image} 
                          alt={fundraiser.title}
                          className="rounded-md object-cover w-full h-[140px]"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">{fundraiser.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            Submitted {fundraiser.createdAt}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Created by: {fundraiser.creator}</p>
                        <p className="text-sm">Goal: ${fundraiser.goal}</p>
                        <p className="text-sm">{fundraiser.description}</p>
                        <div className="flex gap-2 pt-2">
                          <Button 
                            onClick={() => handleFundraiserApproval(fundraiser.id, true)}
                            className="bg-green-600 hover:bg-green-700"
                            size="sm"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            onClick={() => handleFundraiserApproval(fundraiser.id, false)}
                            variant="destructive"
                            size="sm"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Deny
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-1">
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
                    <TableHead>Payment Status</TableHead>
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
                      collected: 2250,
                      total: 3600,
                      members: 24,
                      paidMembers: 15
                    },
                    { 
                      title: 'Leadership Conference Fee', 
                      amount: '$35.00', 
                      type: 'Event Fee',
                      dueDate: 'Mar 30, 2024',
                      created: 'Mar 5, 2024',
                      status: 'Active',
                      collected: 560,
                      total: 840,
                      members: 24,
                      paidMembers: 16
                    },
                    { 
                      title: 'Late Payment Fee', 
                      amount: '$25.00', 
                      type: 'Late Fee',
                      dueDate: 'May 1, 2024',
                      created: 'Mar 15, 2024',
                      status: 'Pending',
                      collected: 0,
                      total: 200,
                      members: 8,
                      paidMembers: 0
                    },
                  ].map((dues, index) => {
                    const percentPaid = Math.round((dues.collected / dues.total) * 100);
                    const percentMembers = Math.round((dues.paidMembers / dues.members) * 100);
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{dues.title}</TableCell>
                        <TableCell>{dues.amount}</TableCell>
                        <TableCell>{dues.type}</TableCell>
                        <TableCell>{dues.dueDate}</TableCell>
                        <TableCell>{dues.created}</TableCell>
                        <TableCell className="w-[250px]">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3.5 w-3.5 text-primary" />
                                <span>Amount Collected:</span>
                              </div>
                              <div className="font-medium">${dues.collected} of ${dues.total}</div>
                            </div>
                            <Progress value={percentPaid} className="h-2" />
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-1">
                                <Users className="h-3.5 w-3.5 text-primary" />
                                <span>Members Paid:</span>
                              </div>
                              <div className="font-medium">{dues.paidMembers} of {dues.members}</div>
                            </div>
                            <Progress value={percentMembers} className="h-2" />
                            
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              {percentPaid === 100 ? (
                                <Check className="h-3.5 w-3.5 text-green-500" />
                              ) : (
                                <Percent className="h-3.5 w-3.5" />
                              )}
                              <span>{percentPaid}% collected</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
