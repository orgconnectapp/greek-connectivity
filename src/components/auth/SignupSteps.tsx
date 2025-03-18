
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { baseSchema, SignupFormData } from './signupSchemas';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { MemberTypeStep } from './steps/MemberTypeStep';
import { ActiveContactStep } from './steps/ActiveContactStep';
import { MembershipInfoStep } from './steps/MembershipInfoStep';
import { PersonalDetailsStep } from './steps/PersonalDetailsStep';
import { ProfileCompletionStep } from './steps/ProfileCompletionStep';
import { AlumniContactStep } from './steps/AlumniContactStep';
import { AlumniPasswordStep } from './steps/AlumniPasswordStep';
import { AlumniUniversityStep } from './steps/AlumniUniversityStep';
import { useNavigate } from 'react-router-dom';

export const SignupSteps = () => {
  const [step, setStep] = useState(1);
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<SignupFormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      memberType: 'active',
      email: '',
      schoolEmail: '',
      personalEmail: '',
      phoneNumber: '',
      initiationSemester: 'fall',
      initiationYear: '',
      memberId: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      birthDate: '',
      major: '',
      currentYear: 'freshman',
      organization: '',
      profilePicture: '',
      linkedIn: '',
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
        title: "Account Created",
        description: "Your account has been created successfully.",
      });
      
      // Redirect to message board after successful signup
      navigate("/message-board");
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
          : <ActiveContactStep form={form} onNextStep={nextStep} />;
      case 4:
        return isAlumni 
          ? <AlumniPasswordStep form={form} onNextStep={nextStep} />
          : <MembershipInfoStep form={form} onNextStep={nextStep} />;
      case 5:
        return isAlumni 
          ? <AlumniUniversityStep form={form} onSubmit={onSubmit} />
          : <PersonalDetailsStep form={form} onNextStep={nextStep} />;
      case 6:
        return isAlumni 
          ? null // Alumni process ends at step 5
          : <ProfileCompletionStep form={form} onSubmit={onSubmit} />;
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
        case 3: return "Contact Information";
        case 4: return "Membership Information";
        case 5: return "Personal Details";
        case 6: return "Profile Completion";
        default: return "";
      }
    }
  };

  // Calculate the total number of steps based on member type
  const totalSteps = isAlumni ? 5 : 6;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Create an account</h2>
        <p className="text-sm text-muted-foreground">
          Step {step} of {totalSteps}: {getStepLabel()}
        </p>
      </div>
      {renderStep()}
    </div>
  );
};
