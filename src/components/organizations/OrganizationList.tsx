
import { Organization } from './OrganizationCard';
import OrganizationCard from './OrganizationCard';

interface OrganizationListProps {
  organizations: Organization[];
  requestedOrgs: string[];
  onRequestJoin: (org: Organization) => void;
}

const OrganizationList = ({ 
  organizations, 
  requestedOrgs, 
  onRequestJoin 
}: OrganizationListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {organizations.map((org) => (
        <OrganizationCard
          key={org.id}
          organization={org}
          isRequested={requestedOrgs.includes(org.id)}
          onRequestJoin={onRequestJoin}
        />
      ))}
    </div>
  );
};

export default OrganizationList;
