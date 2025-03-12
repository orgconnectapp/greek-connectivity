
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { baseSchema, SignupFormData } from './signupSchemas';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { MemberTypeStep } from './steps/MemberTypeStep';
import { ContactAndAcademicStep } from './steps/ContactAndAcademicStep';
import { ProfilePictureStep } from './steps/ProfilePictureStep';
import { OrganizationStep } from './steps/OrganizationStep';

export const SignupSteps = () => {
  const [step, setStep] = useState(1);
  const { signup } = useAuth();
  
  const form = useForm<SignupFormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      memberType: 'active',
      email: '',
      phoneNumber: '',
      major: '',
      currentYear: 'freshman',
      organization: '',
      profilePicture: '',
      password: '',
    },
  });

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Ensure all required fields are present (TypeScript validation only, actual values are validated by Zod)
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        organization: data.organization,
        password: data.password,
        memberType: data.memberType,
        major: data.major || '',
        currentYear: data.currentYear || 'freshman',
        profilePicture: data.profilePicture || '',
      };
      
      await signup(userData);
      toast({
        title: "Request Submitted",
        description: "Your request to join the organization has been submitted. You will receive access once approved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep form={form} onNextStep={nextStep} />;
      case 2:
        return <MemberTypeStep form={form} onNextStep={nextStep} />;
      case 3:
        return <ContactAndAcademicStep form={form} onNextStep={nextStep} />;
      case 4:
        return <ProfilePictureStep form={form} onNextStep={nextStep} />;
      case 5:
        return <OrganizationStep form={form} onSubmit={onSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Create an account</h2>
        <p className="text-sm text-muted-foreground">
          Step {step} of 5: {
            step === 1 ? "Personal Information" :
            step === 2 ? "Member Type" :
            step === 3 ? "Contact & Academic Information" :
            step === 4 ? "Profile Picture" :
            "Organization Selection"
          }
        </p>
      </div>
      {renderStep()}
    </div>
  );
};
