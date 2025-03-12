
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
import { AlumniContactStep } from './steps/AlumniContactStep';
import { AlumniPasswordStep } from './steps/AlumniPasswordStep';
import { AlumniUniversityStep } from './steps/AlumniUniversityStep';

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
      university: '',
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
        university: data.university || '',
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

  const isAlumni = form.getValues('memberType') === 'alumni';

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfoStep form={form} onNextStep={nextStep} />;
      case 2:
        return <MemberTypeStep form={form} onNextStep={nextStep} />;
      case 3:
        return isAlumni 
          ? <AlumniContactStep form={form} onNextStep={nextStep} />
          : <ContactAndAcademicStep form={form} onNextStep={nextStep} />;
      case 4:
        return isAlumni 
          ? <AlumniPasswordStep form={form} onNextStep={nextStep} />
          : <ProfilePictureStep form={form} onNextStep={nextStep} />;
      case 5:
        return isAlumni 
          ? <AlumniUniversityStep form={form} onSubmit={onSubmit} />
          : <OrganizationStep form={form} onSubmit={onSubmit} />;
      default:
        return null;
    }
  };

  const getStepLabel = () => {
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
        case 3: return "Contact & Academic Information";
        case 4: return "Profile Picture";
        case 5: return "Organization Selection";
        default: return "";
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Create an account</h2>
        <p className="text-sm text-muted-foreground">
          Step {step} of 5: {getStepLabel()}
        </p>
      </div>
      {renderStep()}
    </div>
  );
};
