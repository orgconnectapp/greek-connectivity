
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FundraiserCard from './FundraiserCard';
import { DonorType, FundraiserType } from './data';

interface FundraisersListProps {
  fundraisers: FundraiserType[];
  handleShare: (fundraiser: FundraiserType) => void;
  handleFundraiserDoubleClick: (fundraiser: FundraiserType) => void;
  handleContribute: (fundraiser: FundraiserType) => void;
  getFundraiserDonors: (fundraiserId: number) => DonorType[];
}

const FundraisersList = ({ 
  fundraisers, 
  handleShare, 
  handleFundraiserDoubleClick,
  handleContribute,
  getFundraiserDonors
}: FundraisersListProps) => {
  return (
    <Tabs defaultValue="active" className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>
      
      {['active', 'all'].map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fundraisers
              .filter(f => tab === 'all' || f.status === 'active')
              .map((fundraiser) => {
                const fundraiserDonors = getFundraiserDonors(fundraiser.id);
                const visibleDonors = fundraiserDonors.slice(0, 3);
                const remainingDonors = fundraiserDonors.length > 3 ? 
                  fundraiserDonors.slice(3, 6).map(d => d.name) : [];
                const otherDonorsCount = fundraiserDonors.length > 6 ? 
                  fundraiserDonors.length - 6 : 0;
                
                return (
                  <FundraiserCard
                    key={fundraiser.id}
                    fundraiser={fundraiser}
                    visibleDonors={visibleDonors}
                    remainingDonorNames={remainingDonors}
                    otherDonorsCount={otherDonorsCount}
                    onShare={handleShare}
                    onDoubleClick={() => handleFundraiserDoubleClick(fundraiser)}
                    onContribute={() => handleContribute(fundraiser)}
                  />
                );
              })}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default FundraisersList;
