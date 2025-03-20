
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  stepLabel
}) => {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold tracking-tight">Create an account</h2>
      <p className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}: {stepLabel}
      </p>
    </div>
  );
};
