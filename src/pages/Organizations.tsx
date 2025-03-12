
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCcw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/hooks/use-toast";

import OrganizationList from '@/components/organizations/OrganizationList';
import ConfirmJoinDialog from '@/components/organizations/ConfirmJoinDialog';
import { Organization } from '@/components/organizations/OrganizationCard';
import { getMockOrganizations } from '@/components/organizations/organizations-mock-data';

const Organizations = () => {
  const { user, requestJoinOrganization, isLoading } = useAuth();
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoadingOrgs, setIsLoadingOrgs] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [requestedOrgs, setRequestedOrgs] = useState<string[]>([]);

  // Fetch organizations based on user's school email domain
  useEffect(() => {
    const fetchOrganizations = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Extract university domain from email
        const emailParts = user.email.split('@');
        const domain = emailParts[1];

        // In a real app, this would be an API call with the domain as a parameter
        // For demo purposes, we'll simulate a delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Get mock data
        setOrganizations(getMockOrganizations());
      } catch (error) {
        toast({
          title: "Error loading organizations",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingOrgs(false);
      }
    };

    fetchOrganizations();
  }, [user, navigate]);

  const handleRequestJoin = (org: Organization) => {
    setSelectedOrg(org);
    setConfirmDialogOpen(true);
  };

  const confirmJoinRequest = async () => {
    if (!selectedOrg) return;
    
    try {
      await requestJoinOrganization(selectedOrg.id);
      setRequestedOrgs([...requestedOrgs, selectedOrg.id]);
      toast({
        title: "Request sent!",
        description: `Your request to join ${selectedOrg.name} has been submitted.`,
      });
    } catch (error) {
      toast({
        title: "Request failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConfirmDialogOpen(false);
    }
  };

  if (isLoadingOrgs) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <RefreshCcw className="h-10 w-10 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-medium">Loading organizations...</h2>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Greek Organizations</h1>
        <p className="text-muted-foreground">
          Select organizations you'd like to join at {user?.email.split('@')[1]}
        </p>
      </div>
      
      <OrganizationList 
        organizations={organizations}
        requestedOrgs={requestedOrgs}
        onRequestJoin={handleRequestJoin}
      />

      <ConfirmJoinDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        selectedOrg={selectedOrg}
        onConfirm={confirmJoinRequest}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Organizations;
