
import React, { useState } from 'react';
import { Shield, Users, Building, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OrganizationsTab, UsersTab, BillingTab, SettingsTab } from '@/components/superadmin';

const SuperAdmin = () => {
  const [activeTab, setActiveTab] = useState('organizations');

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
          <OrganizationsTab />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <UsersTab />
        </TabsContent>
        
        <TabsContent value="billing" className="space-y-4">
          <BillingTab />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <SettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdmin;
