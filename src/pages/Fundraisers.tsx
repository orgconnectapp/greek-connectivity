
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CreateFundraiserDialog from '@/components/fundraisers/CreateFundraiserDialog';
import FundraisersSearch from '@/components/fundraisers/FundraisersSearch';
import FundraisersList from '@/components/fundraisers/FundraisersList';
import FundraiserDetailsDialog from '@/components/fundraisers/FundraiserDetailsDialog';
import StatsList from '@/components/fundraisers/StatsList';
import { donors, fundraisers, stats } from '@/components/fundraisers/data';

const Fundraisers = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedFundraiser, setSelectedFundraiser] = useState<typeof fundraisers[0] | null>(null);
  
  const handleShare = (fundraiser: any) => {
    const shareableLink = `${window.location.origin}/external-payment/${fundraiser.id}`;
    
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast({
          title: "Link copied to clipboard",
          description: `Share this link to collect donations for "${fundraiser.title}"`,
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy link",
          description: "Please try again or share manually",
          variant: "destructive",
        });
      });
  };

  const handleFundraiserDoubleClick = (fundraiser: typeof fundraisers[0]) => {
    setSelectedFundraiser(fundraiser);
  };

  const getFundraiserDonors = (fundraiserId: number) => {
    const fundraiser = fundraisers.find(f => f.id === fundraiserId);
    if (!fundraiser) return [];
    
    return donors.filter(donor => fundraiser.donors.includes(donor.id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fundraisers</h1>
        <p className="text-muted-foreground">
          Create and manage fundraising events for your organization.
        </p>
      </div>
      
      <StatsList stats={stats} />
      
      <FundraisersSearch onCreateClick={() => setCreateDialogOpen(true)} />
      
      <FundraisersList 
        fundraisers={fundraisers}
        handleShare={handleShare}
        handleFundraiserDoubleClick={handleFundraiserDoubleClick}
        getFundraiserDonors={getFundraiserDonors}
      />
      
      <CreateFundraiserDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />

      <FundraiserDetailsDialog
        fundraiser={selectedFundraiser}
        open={!!selectedFundraiser}
        onOpenChange={(open) => !open && setSelectedFundraiser(null)}
        donors={selectedFundraiser ? getFundraiserDonors(selectedFundraiser.id) : []}
      />
    </div>
  );
};

export default Fundraisers;
