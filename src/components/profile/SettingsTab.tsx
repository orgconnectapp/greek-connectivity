
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SettingsTabProps {
  showEmail: boolean;
  showPhone: boolean;
  onPrivacyChange: (setting: 'email' | 'phone', value: boolean) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  showEmail,
  showPhone,
  onPrivacyChange
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Privacy Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">Control what information is visible to other members</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-email">Show Email Address</Label>
                    <p className="text-sm text-muted-foreground">Allow other members to see your email address</p>
                  </div>
                  <Switch 
                    id="show-email" 
                    checked={showEmail}
                    onCheckedChange={(checked) => onPrivacyChange('email', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-phone">Show Phone Number</Label>
                    <p className="text-sm text-muted-foreground">Allow other members to see your phone number</p>
                  </div>
                  <Switch 
                    id="show-phone" 
                    checked={showPhone}
                    onCheckedChange={(checked) => onPrivacyChange('phone', checked)}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Email Notifications</h3>
              <p className="text-sm text-muted-foreground mb-4">Manage what types of emails you receive</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="notify-fundraisers" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="notify-fundraisers">New Fundraisers</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="notify-messages" className="rounded border-gray-300" defaultChecked />
                  <label htmlFor="notify-messages">New message board posts</label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
