
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, CheckCircle2, Clock, RefreshCcw, PlusCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Mock organization type
type Organization = {
  id: string;
  name: string;
  logo: string;
  description: string;
  type: 'fraternity' | 'sorority' | 'other';
};

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

        // Mock data
        const mockOrganizations: Organization[] = [
          {
            id: '1',
            name: 'Alpha Beta Gamma',
            logo: '/placeholder.svg',
            description: 'Founded in 1906, Alpha Beta Gamma is committed to academic excellence and community service.',
            type: 'fraternity'
          },
          {
            id: '2',
            name: 'Delta Epsilon Zeta',
            logo: '/placeholder.svg',
            description: 'A progressive fraternity focused on leadership development and social justice advocacy.',
            type: 'fraternity'
          },
          {
            id: '3',
            name: 'Eta Theta Iota',
            logo: '/placeholder.svg',
            description: 'Known for strong alumni connections and professional development opportunities.',
            type: 'fraternity'
          },
          {
            id: '4',
            name: 'Kappa Lambda Mu',
            logo: '/placeholder.svg',
            description: 'A diverse sorority celebrating cultural awareness and women\'s empowerment.',
            type: 'sorority'
          },
          {
            id: '5',
            name: 'AXA Phi Alpha Zeta',
            logo: '/placeholder.svg',
            description: 'Our mission is to develop leaders through academic excellence, service to all, promotion of friendship and justice among members.',
            type: 'fraternity'
          },
          {
            id: '6',
            name: 'Nu Xi Omicron',
            logo: '/placeholder.svg',
            description: 'Focused on philanthropy and community engagement through various service initiatives.',
            type: 'sorority'
          }
        ];

        setOrganizations(mockOrganizations);
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Card key={org.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10" />
              <div className="absolute top-2 right-2 z-20">
                <Badge variant={org.type === 'fraternity' ? 'default' : 'secondary'}>
                  {org.type === 'fraternity' ? 'Fraternity' : 'Sorority'}
                </Badge>
              </div>
              <img 
                src={org.logo} 
                alt={`${org.name} logo`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 z-20">
                <h3 className="text-white font-bold text-xl drop-shadow-md">{org.name}</h3>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-muted-foreground">{org.description}</p>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 p-4">
              {requestedOrgs.includes(org.id) ? (
                <div className="w-full flex items-center justify-center text-primary">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Request Pending</span>
                </div>
              ) : (
                <Button 
                  onClick={() => handleRequestJoin(org)} 
                  variant="outline" 
                  className="w-full"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Request to Join
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Join Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to request to join {selectedOrg?.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmDialogOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmJoinRequest}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Confirm Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Organizations;
