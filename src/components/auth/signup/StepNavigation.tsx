
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface StepNavigationProps {
  showBackButton: boolean;
  onPrevStep: () => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({ 
  showBackButton,
  onPrevStep
}) => {
  if (!showBackButton) return null;
  
  return (
    <div className="flex justify-between mt-6">
      <Button 
        variant="outline" 
        onClick={onPrevStep}
        className="flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      {/* Next button is handled by individual step components */}
    </div>
  );
};
