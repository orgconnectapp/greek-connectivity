
import React from 'react';
import { useSignupFlow } from './signup/useSignupFlow';
import { StepIndicator } from './signup/StepIndicator';
import { ValidationError } from './signup/ValidationError';
import { StepContentRenderer } from './signup/StepContentRenderer';
import { StepNavigation } from './signup/StepNavigation';
import { useStepLabels } from './signup/useStepLabels';

export const SignupSteps = () => {
  const {
    step,
    form,
    validationError,
    nextStep,
    prevStep,
    onSubmit
  } = useSignupFlow();
  
  const { stepLabel, totalSteps } = useStepLabels(step, form);
  const isAlumni = form.getValues('memberType') === 'alumni';
  
  // Determine if we should show back button (not on first step, not on final step)
  const showBackButton = step > 1 && step < totalSteps;

  return (
    <div className="space-y-6">
      <StepIndicator 
        currentStep={step} 
        totalSteps={totalSteps} 
        stepLabel={stepLabel} 
      />
      
      <ValidationError error={validationError} />
      
      <StepContentRenderer 
        step={step} 
        form={form} 
        onNextStep={nextStep} 
        onSubmit={onSubmit} 
      />
      
      <StepNavigation 
        showBackButton={showBackButton} 
        onPrevStep={prevStep} 
      />
    </div>
  );
};
