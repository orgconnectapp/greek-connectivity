
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";

// Define the permission type
interface Permission {
  feature: string;
  description: string;
  enabled: boolean;
}

// Define roles and their initial permissions
interface RolePermissions {
  [key: string]: Permission[];
}

const PermissionsSettings = () => {
  const initialPermissions: RolePermissions = {
    'president': [
      { feature: 'Admin Access', description: 'Full administrative access', enabled: true },
      { feature: 'Overview', description: 'View organization overview', enabled: true },
      { feature: 'Member Management', description: 'Add, edit, or remove members', enabled: true },
      { feature: 'Dues Management', description: 'Manage dues and expenses', enabled: true },
      { feature: 'Settings', description: 'Manage organization settings', enabled: true },
    ],
    'vice-president': [
      { feature: 'Admin Access', description: 'Full administrative access', enabled: true },
      { feature: 'Overview', description: 'View organization overview', enabled: true },
      { feature: 'Member Management', description: 'Add, edit, or remove members', enabled: true },
      { feature: 'Dues Management', description: 'Manage dues and expenses', enabled: true },
      { feature: 'Settings', description: 'Manage organization settings', enabled: true },
    ],
    'treasurer': [
      { feature: 'Admin Access', description: 'Full administrative access', enabled: false },
      { feature: 'Overview', description: 'View organization overview', enabled: true },
      { feature: 'Member Management', description: 'Add, edit, or remove members', enabled: false },
      { feature: 'Dues Management', description: 'Manage dues and expenses', enabled: true },
      { feature: 'Settings', description: 'Manage organization settings', enabled: false },
    ],
    'secretary': [
      { feature: 'Admin Access', description: 'Full administrative access', enabled: false },
      { feature: 'Overview', description: 'View organization overview', enabled: true },
      { feature: 'Member Management', description: 'Add, edit, or remove members', enabled: true },
      { feature: 'Dues Management', description: 'Manage dues and expenses', enabled: false },
      { feature: 'Settings', description: 'Manage organization settings', enabled: false },
    ],
    'member': [
      { feature: 'Admin Access', description: 'Full administrative access', enabled: false },
      { feature: 'Overview', description: 'View organization overview', enabled: true },
      { feature: 'Member Management', description: 'Add, edit, or remove members', enabled: false },
      { feature: 'Dues Management', description: 'Manage dues and expenses', enabled: false },
      { feature: 'Settings', description: 'Manage organization settings', enabled: false },
    ],
  };

  const [permissions, setPermissions] = useState<RolePermissions>(initialPermissions);
  const [currentRole, setCurrentRole] = useState<string>('president');

  const handlePermissionChange = (feature: string, checked: boolean) => {
    // Make a copy of the current permissions
    const updatedPermissions = { ...permissions };
    
    // Update the specific permission
    updatedPermissions[currentRole] = updatedPermissions[currentRole].map(permission => ({
      ...permission,
      enabled: permission.feature === feature ? checked : permission.enabled
    }));
    
    setPermissions(updatedPermissions);
  };

  const handleRoleChange = (role: string) => {
    setCurrentRole(role);
  };

  const handleUpdatePermissions = () => {
    // Here we would implement the API call to update permissions
    toast.success("Permissions updated successfully");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Role Permissions</h2>
      <Tabs defaultValue="president" className="w-full" onValueChange={handleRoleChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="president">President</TabsTrigger>
          <TabsTrigger value="vice-president">Vice President</TabsTrigger>
          <TabsTrigger value="treasurer">Treasurer</TabsTrigger>
          <TabsTrigger value="secretary">Secretary</TabsTrigger>
          <TabsTrigger value="member">Member</TabsTrigger>
        </TabsList>
        <div className="mt-4 space-y-4">
          {permissions[currentRole].map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.feature}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch 
                checked={item.enabled}
                onCheckedChange={(checked) => handlePermissionChange(item.feature, checked)}
              />
            </div>
          ))}
        </div>
      </Tabs>
      <div className="mt-4 flex justify-end">
        <Button onClick={handleUpdatePermissions}>Update Permissions</Button>
      </div>
    </div>
  );
};

export default PermissionsSettings;
