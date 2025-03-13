
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import CreateFundraiserDialog from '@/components/fundraisers/CreateFundraiserDialog';
import FundraisersSearch from '@/components/fundraisers/FundraisersSearch';
import FundraisersList from '@/components/fundraisers/FundraisersList';
import FundraiserDetailsDialog from '@/components/fundraisers/FundraiserDetailsDialog';
import DonationDialog from '@/components/fundraisers/DonationDialog';
import ShareFundraiserDialog from '@/components/fundraisers/ShareFundraiserDialog';
import StatsList from '@/components/fundraisers/StatsList';
import { donors, fundraisers, stats, FundraiserType, DonorType } from '@/components/fundraisers/data';

const Fundraisers = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedFundraiser, setSelectedFundraiser] = useState<FundraiserType | null>(null);
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [donatingFundraiser, setDonatingFundraiser] = useState<FundraiserType | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [sharingFundraiser, setSharingFundraiser] = useState<FundraiserType | null>(null);
  
  // Filter out the Member Participation stat
  const filteredStats = stats.filter(stat => stat.title !== "Member Participation");
  
  const handleShare = (fundraiser: FundraiserType) => {
    setSharingFundraiser(fundraiser);
    setShareDialogOpen(true);
  };

  const handleFundraiserDoubleClick = (fundraiser: FundraiserType) => {
    setSelectedFundraiser(fundraiser);
  };

  const handleContribute = (fundraiser: FundraiserType) => {
    setDonatingFundraiser(fundraiser);
    setDonationDialogOpen(true);
  };

  const getFundraiserDonors = (fundraiserId: number): DonorType[] => {
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
      
      <StatsList stats={filteredStats} />
      
      <FundraisersSearch onCreateClick={() => setCreateDialogOpen(true)} />
      
      <FundraisersList 
        fundraisers={fundraisers}
        handleShare={handleShare}
        handleFundraiserDoubleClick={handleFundraiserDoubleClick}
        handleContribute={handleContribute}
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
        onContribute={handleContribute}
      />

      <DonationDialog
        open={donationDialogOpen}
        onOpenChange={setDonationDialogOpen}
        fundraiser={donatingFundraiser}
      />

      <ShareFundraiserDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        fundraiser={sharingFundraiser}
      />
    </div>
  );
};

export default Fundraisers;
