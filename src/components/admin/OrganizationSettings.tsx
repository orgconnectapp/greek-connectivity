
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

const OrganizationSettings = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Organization Settings</h2>
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
    </div>
  );
};

export default OrganizationSettings;
