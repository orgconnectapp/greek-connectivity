
import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

// Import refactored components
import MemberManagement from '@/components/admin/MemberManagement';
import DuesManagement from '@/components/admin/DuesManagement';
import OrganizationSettings from '@/components/admin/OrganizationSettings';
import SecuritySettings from '@/components/admin/SecuritySettings';
import PermissionsSettings from '@/components/admin/PermissionsSettings';
import OverviewSection from '@/components/admin/OverviewSection';

// Mock data for charges details
const chargesDetails = {
  "Spring 2024 Membership Dues": {
    paidMembers: [
      { name: "Jason Smith", role: "President", email: "jason@greeksync.com", paid: true, amount: 150, date: "Mar 16, 2024" },
      { name: "Emma Johnson", role: "Vice President", email: "emma@greeksync.com", paid: true, amount: 150, date: "Mar 10, 2024" },
      { name: "Michael Brown", role: "Treasurer", email: "michael@greeksync.com", paid: true, amount: 150, date: "Mar 5, 2024" },
      { name: "Sophia Garcia", role: "Secretary", email: "sophia@greeksync.com", paid: true, amount: 150, date: "Mar 12, 2024" },
      { name: "Alex Williams", role: "Event Coordinator", email: "alex@greeksync.com", paid: false },
      // More members...
    ]
  },
  "Leadership Conference Fee": {
    paidMembers: [
      { name: "Jason Smith", role: "President", email: "jason@greeksync.com", paid: true, amount: 35, date: "Mar 20, 2024" },
      { name: "Emma Johnson", role: "Vice President", email: "emma@greeksync.com", paid: true, amount: 35, date: "Mar 15, 2024" },
      { name: "Michael Brown", role: "Treasurer", email: "michael@greeksync.com", paid: true, amount: 35, date: "Mar 18, 2024" },
      { name: "Sophia Garcia", role: "Secretary", email: "sophia@greeksync.com", paid: false },
      { name: "Alex Williams", role: "Event Coordinator", email: "alex@greeksync.com", paid: false },
      // More members...
    ]
  },
  "Late Payment Fee": {
    paidMembers: [
      { name: "Jason Smith", role: "President", email: "jason@greeksync.com", paid: false },
      { name: "Emma Johnson", role: "Vice President", email: "emma@greeksync.com", paid: false },
      { name: "Michael Brown", role: "Treasurer", email: "michael@greeksync.com", paid: false },
      { name: "Sophia Garcia", role: "Secretary", email: "sophia@greeksync.com", paid: false },
      { name: "Alex Williams", role: "Event Coordinator", email: "alex@greeksync.com", paid: false },
      // More members...
    ]
  }
};

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
          <TabsTrigger value="users">Member Management</TabsTrigger>
          <TabsTrigger value="dues">Dues Management</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <OverviewSection />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <MemberManagement />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="dues" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <DuesManagement chargesDetails={chargesDetails} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <OrganizationSettings />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <PermissionsSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
