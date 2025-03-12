
import { Building, Clock, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type Organization = {
  id: string;
  name: string;
  logo: string;
  description: string;
  type: 'fraternity' | 'sorority' | 'other';
};

interface OrganizationCardProps {
  organization: Organization;
  isRequested: boolean;
  onRequestJoin: (org: Organization) => void;
}

const OrganizationCard = ({ organization, isRequested, onRequestJoin }: OrganizationCardProps) => {
  return (
    <Card key={organization.id} className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10" />
        <div className="absolute top-2 right-2 z-20">
          <Badge variant={organization.type === 'fraternity' ? 'default' : 'secondary'}>
            {organization.type === 'fraternity' ? 'Fraternity' : 'Sorority'}
          </Badge>
        </div>
        <img 
          src={organization.logo} 
          alt={`${organization.name} logo`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 left-3 z-20">
          <h3 className="text-white font-bold text-xl drop-shadow-md">{organization.name}</h3>
        </div>
      </div>
      <CardContent className="p-6">
        <p className="text-muted-foreground">{organization.description}</p>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 p-4">
        {isRequested ? (
          <div className="w-full flex items-center justify-center text-primary">
            <Clock className="h-4 w-4 mr-2" />
            <span>Request Pending</span>
          </div>
        ) : (
          <Button 
            onClick={() => onRequestJoin(organization)} 
            variant="outline" 
            className="w-full"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Request to Join
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrganizationCard;
