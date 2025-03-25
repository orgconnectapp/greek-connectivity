
import React from 'react';
import { Shield, Settings, Info, AlertTriangle, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { systemSettings } from './mockData';

const SettingsTab = () => {
  const updateSystemSetting = (category: string, setting: string) => {
    toast.success(`${setting} setting in ${category} category updated successfully`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure global system settings for the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {systemSettings.map((category) => (
            <div key={category.category} className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                {category.category === 'Security' && <Shield className="h-5 w-5 text-primary" />}
                {category.category === 'Email' && <Mail className="h-5 w-5 text-primary" />}
                {category.category === 'Features' && <Settings className="h-5 w-5 text-primary" />}
                {category.category === 'System Health' && <Info className="h-5 w-5 text-primary" />}
                {category.category}
              </h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Setting</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.settings.map((setting) => (
                      <TableRow key={setting.name}>
                        <TableCell className="font-medium">{setting.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {setting.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{setting.description}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateSystemSetting(category.category, setting.name)}
                          >
                            Configure
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}

          <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-4 mt-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h4 className="font-semibold text-amber-700">System Maintenance</h4>
            </div>
            <p className="text-amber-600 mt-1">Scheduled database maintenance on May 30, 2024 from 2:00 AM to 4:00 AM UTC. The system will be in read-only mode during this period.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsTab;
