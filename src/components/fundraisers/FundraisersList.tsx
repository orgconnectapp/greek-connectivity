
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FundraiserCard from './FundraiserCard';
import { DonorType, FundraiserType } from './data';
import { DateRangeType } from './FundraiserDateRangeFilter';

interface FundraisersListProps {
  fundraisers: FundraiserType[];
  handleShare: (fundraiser: FundraiserType) => void;
  handleFundraiserDoubleClick: (fundraiser: FundraiserType) => void;
  handleContribute: (fundraiser: FundraiserType) => void;
  getFundraiserDonors: (fundraiserId: number) => DonorType[];
  dateRange: DateRangeType;
  customStartDate: Date | undefined;
  customEndDate: Date | undefined;
}

const FundraisersList = ({ 
  fundraisers, 
  handleShare, 
  handleFundraiserDoubleClick,
  handleContribute,
  getFundraiserDonors,
  dateRange,
  customStartDate,
  customEndDate
}: FundraisersListProps) => {
  // Helper function to filter fundraisers based on date range
  const getFilteredFundraisers = (status: 'all' | 'active') => {
    const statusFiltered = fundraisers
      .filter(f => status === 'all' || f.status === 'active');
    
    // Apply date range filtering if needed
    return statusFiltered.map(fundraiser => {
      // Create a copy of the fundraiser to modify
      const fundraiserCopy = { ...fundraiser };
      
      // Apply date range filtering
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      let startDate: Date | undefined;
      let endDate: Date | undefined;

      switch (dateRange) {
        case 'this-semester':
          // Assuming spring semester is Jan-May and fall semester is Aug-Dec
          if (currentMonth < 5) {
            // Spring semester
            startDate = new Date(currentYear, 0, 1); // Jan 1
            endDate = new Date(currentYear, 4, 31); // May 31
          } else if (currentMonth > 6) {
            // Fall semester
            startDate = new Date(currentYear, 7, 1); // Aug 1
            endDate = new Date(currentYear, 11, 31); // Dec 31
          }
          break;
        case 'last-semester':
          // Determine previous semester based on current month
          if (currentMonth < 5) {
            // Previous fall semester
            startDate = new Date(currentYear - 1, 7, 1); // Aug 1 last year
            endDate = new Date(currentYear - 1, 11, 31); // Dec 31 last year
          } else if (currentMonth > 6) {
            // Previous spring semester
            startDate = new Date(currentYear, 0, 1); // Jan 1 this year
            endDate = new Date(currentYear, 4, 31); // May 31 this year
          }
          break;
        case 'all-time':
          // No date filtering
          break;
        case 'custom':
          startDate = customStartDate;
          endDate = customEndDate;
          break;
      }

      // Filter donations by date range if applicable
      if (startDate && endDate) {
        const filteredDonors = fundraiser.donors.filter(donorId => {
          const donor = getFundraiserDonors(fundraiser.id).find(d => d.id === donorId);
          if (!donor) return false;
          
          const donationDate = new Date(donor.date);
          return donationDate >= startDate! && donationDate <= endDate!;
        });
        
        // Calculate new raised amount based on filtered donors
        const filteredAmount = getFundraiserDonors(fundraiser.id)
          .filter(donor => filteredDonors.includes(donor.id))
          .reduce((sum, donor) => sum + donor.amount, 0);
        
        fundraiserCopy.raised = filteredAmount;
        fundraiserCopy.donors = filteredDonors;
      }
      
      return fundraiserCopy;
    });
  };

  return (
    <Tabs defaultValue="active" className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>
      
      {['active', 'all'].map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {getFilteredFundraisers(tab as 'all' | 'active')
              .map((fundraiser) => {
                const fundraiserDonors = getFundraiserDonors(fundraiser.id)
                  .filter(donor => fundraiser.donors.includes(donor.id));
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
