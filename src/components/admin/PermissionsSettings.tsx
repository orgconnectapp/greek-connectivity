
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PermissionsSettings = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Role Permissions</h2>
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
    </div>
  );
};

export default PermissionsSettings;
