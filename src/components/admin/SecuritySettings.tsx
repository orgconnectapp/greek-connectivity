
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const SecuritySettings = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Security Settings</h2>
      <div className="space-y-4">
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
      </div>
    </div>
  );
};

export default SecuritySettings;
