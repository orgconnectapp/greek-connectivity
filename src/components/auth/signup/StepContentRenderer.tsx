
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SignupFormData } from '../signupSchemas';
import { PersonalInfoStep } from '../steps/PersonalInfoStep';
import { MemberTypeStep } from '../steps/MemberTypeStep';
import { ActiveContactStep } from '../steps/ActiveContactStep';
import { MembershipInfoStep } from '../steps/MembershipInfoStep';
import { PersonalDetailsStep } from '../steps/PersonalDetailsStep';
import { ProfileCompletionStep } from '../steps/ProfileCompletionStep';
import { AlumniContactStep } from '../steps/AlumniContactStep';
import { AlumniPasswordStep } from '../steps/AlumniPasswordStep';
import { AlumniUniversityStep } from '../steps/AlumniUniversityStep';

interface StepContentRendererProps {
  step: number;
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
  onSubmit: (data: SignupFormData) => Promise<void>;
}

export const StepContentRenderer: React.FC<StepContentRendererProps> = ({
  step,
  form,
  onNextStep,
  onSubmit
}) => {
  const isAlumni = form.getValues('memberType') === 'alumni';

  switch (step) {
    case 1:
      return <PersonalInfoStep form={form} onNextStep={onNextStep} />;
    case 2:
      return <MemberTypeStep form={form} onNextStep={onNextStep} />;
    case 3:
      return isAlumni 
        ? <AlumniContactStep form={form} onNextStep={onNextStep} />
        : <ActiveContactStep form={form} onNextStep={onNextStep} />;
    case 4:
      return isAlumni 
        ? <AlumniPasswordStep form={form} onNextStep={onNextStep} />
        : <MembershipInfoStep form={form} onNextStep={onNextStep} />;
    case 5:
      return isAlumni 
        ? <AlumniUniversityStep form={form} onSubmit={onSubmit} />
        : <PersonalDetailsStep form={form} onNextStep={onNextStep} />;
    case 6:
      return isAlumni 
        ? null // Alumni process ends at step 5
        : <ProfileCompletionStep form={form} onSubmit={onSubmit} />;
    default:
      return null;
  }
};
