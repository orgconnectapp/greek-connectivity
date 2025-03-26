
import React from 'react';
import { Building, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const OrganizationInfo = () => {
  // This would typically come from an API or context
  const organizationInfo = {
    name: "Lambda Chi Alpha",
    chapterName: "Phi Alpha Zeta",
    description: "Lambda Chi Alpha is a national co-educational service fraternity founded on the principles of leadership, friendship, and service.",
    founded: 1977,
    memberCount: 87
  };

  return (
    <Card className="mb-8 overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="col-span-2">
            <h2 className="text-xl font-bold mb-2">{organizationInfo.name} - {organizationInfo.chapterName}</h2>
            <p className="text-muted-foreground mb-4">{organizationInfo.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  <span className="font-medium">Founded:</span> {organizationInfo.founded}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  <span className="font-medium">Active Members:</span> {organizationInfo.memberCount}
                </span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center justify-center">
            <div className="rounded-full bg-primary/10 p-8 flex items-center justify-center">
              <Building className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationInfo;
