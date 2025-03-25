
import React from 'react';
import { Button } from '@/components/ui/button';
import { ViewType } from './types';

interface MembersViewToggleProps {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
}

export const MembersViewToggle: React.FC<MembersViewToggleProps> = ({ 
  viewType, 
  setViewType 
}) => {
  return (
    <div className="flex items-center rounded-md border p-1">
      <Button
        variant={viewType === 'grid' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => setViewType('grid')}
      >
        <span className="sr-only">Grid view</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      </Button>
      <Button
        variant={viewType === 'list' ? 'default' : 'ghost'}
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => setViewType('list')}
      >
        <span className="sr-only">List view</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <line x1="8" x2="21" y1="6" y2="6" />
          <line x1="8" x2="21" y1="12" y2="12" />
          <line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" />
          <line x1="3" x2="3.01" y1="12" y2="12" />
          <line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
      </Button>
    </div>
  );
};
