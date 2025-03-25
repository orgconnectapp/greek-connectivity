
import React, { useState } from 'react';
import { Building, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { organizations } from './mockData';

const OrganizationsTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter organizations based on search term
  const filteredOrganizations = organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    org.chapter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetOrgPassword = (orgId: string) => {
    toast.success(`Password reset email sent to organization ID: ${orgId}`);
  };

  const suspendOrg = (orgId: string) => {
    toast.success(`Organization ID: ${orgId} has been suspended`);
  };

  const activateOrg = (orgId: string) => {
    toast.success(`Organization ID: ${orgId} has been activated`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization Management</CardTitle>
        <CardDescription>View and manage all organizations on the platform.</CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search organizations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{org.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{org.name}</p>
                        <p className="text-sm text-muted-foreground">{org.chapter}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{org.members}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={org.activeStatus === 'active' ? 'outline' : 'destructive'}
                      className={org.activeStatus === 'active' ? 'bg-green-500/10 text-green-500' : ''}
                    >
                      {org.activeStatus === 'active' ? 'Active' : 'Suspended'}
                    </Badge>
                  </TableCell>
                  <TableCell>{org.subscription}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/super-admin/org/${org.id}`)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => resetOrgPassword(org.id)}
                      >
                        Reset Password
                      </Button>
                      {org.activeStatus === 'active' ? (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => suspendOrg(org.id)}
                        >
                          Suspend
                        </Button>
                      ) : (
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => activateOrg(org.id)}
                        >
                          Activate
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationsTab;
