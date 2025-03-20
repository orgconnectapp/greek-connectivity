
import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SignupFormData } from '../signupSchemas';

export const useStepLabels = (
  step: number, 
  form: UseFormReturn<SignupFormData>
) => {
  const isAlumni = form.getValues('memberType') === 'alumni';
  
  // Initialize member type if not set
  useEffect(() => {
    if (!form.getValues('memberType')) {
      form.setValue('memberType', 'active');
    }
  }, [form]);
  
  const stepLabel = useMemo(() => {
    if (isAlumni) {
      switch (step) {
        case 1: return "Personal Information";
        case 2: return "Member Type";
        case 3: return "Contact Information";
        case 4: return "Create Password";
        case 5: return "University & Organization";
        default: return "";
      }
    } else {
      switch (step) {
        case 1: return "Personal Information";
        case 2: return "Member Type";
        case 3: return "Contact Information";
        case 4: return "Membership Information";
        case 5: return "Personal Details";
        case 6: return "Profile Completion";
        default: return "";
      }
    }
  }, [step, isAlumni]);

  // Calculate the total number of steps based on member type
  const totalSteps = isAlumni ? 5 : 6;
  
  return { stepLabel, totalSteps };
};
