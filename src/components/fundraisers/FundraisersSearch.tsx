
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FundraisersSearchProps {
  onCreateClick: () => void;
}

const FundraisersSearch = ({ onCreateClick }: FundraisersSearchProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search fundraisers..."
            className="pl-8"
          />
        </div>
      </div>
      
      <Button 
        className="gap-2" 
        onClick={onCreateClick}
      >
        <span>Create Fundraiser</span>
      </Button>
    </div>
  );
};

export default FundraisersSearch;
