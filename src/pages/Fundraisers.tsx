
import React, { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import CreateFundraiserDialog from '@/components/fundraisers/CreateFundraiserDialog';
import FundraisersSearch from '@/components/fundraisers/FundraisersSearch';
import FundraisersList from '@/components/fundraisers/FundraisersList';
import FundraiserDetailsDialog from '@/components/fundraisers/FundraiserDetailsDialog';
import DonationDialog from '@/components/fundraisers/DonationDialog';
import ShareFundraiserDialog from '@/components/fundraisers/ShareFundraiserDialog';
import StatsList from '@/components/fundraisers/StatsList';
import FundraiserDateRangeFilter, { DateRangeType } from '@/components/fundraisers/FundraiserDateRangeFilter';
import { donors, fundraisers, stats, FundraiserType, DonorType } from '@/components/fundraisers/data';

const Fundraisers = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedFundraiser, setSelectedFundraiser] = useState<FundraiserType | null>(null);
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [donatingFundraiser, setDonatingFundraiser] = useState<FundraiserType | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [sharingFundraiser, setSharingFundraiser] = useState<FundraiserType | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeType>('all-time');
  const [customStartDate, setCustomStartDate] = useState<Date | undefined>(undefined);
  const [customEndDate, setCustomEndDate] = useState<Date | undefined>(undefined);
  
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

  const handleDateRangeChange = (range: DateRangeType) => {
    setDateRange(range);
    
    // Reset custom dates if not using custom range
    if (range !== 'custom') {
      setCustomStartDate(undefined);
      setCustomEndDate(undefined);
    }
    
    // Show toast to confirm the change
    const rangeText = {
      'this-semester': 'This Semester',
      'last-semester': 'Last Semester',
      'all-time': 'All Time',
      'custom': 'Custom Date Range'
    }[range];
    
    toast({
      title: "Date Range Updated",
      description: `Showing fundraising totals for: ${rangeText}`,
    });
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
      
      <FundraiserDateRangeFilter
        dateRange={dateRange}
        setDateRange={handleDateRangeChange}
        customStartDate={customStartDate}
        customEndDate={customEndDate}
        setCustomStartDate={setCustomStartDate}
        setCustomEndDate={setCustomEndDate}
      />
      
      <FundraisersList 
        fundraisers={fundraisers}
        handleShare={handleShare}
        handleFundraiserDoubleClick={handleFundraiserDoubleClick}
        handleContribute={handleContribute}
        getFundraiserDonors={getFundraiserDonors}
        dateRange={dateRange}
        customStartDate={customStartDate}
        customEndDate={customEndDate}
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
