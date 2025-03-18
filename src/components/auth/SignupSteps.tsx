
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { baseSchema, activeSchema, SignupFormData } from './signupSchemas';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const SignupSteps = () => {
  const [step, setStep] = useState(1);
  const [validationError, setValidationError] = useState<string | null>(null);
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
    setValidationError(null);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setValidationError(null);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const validateActiveRequiredFields = () => {
    if (form.getValues('memberType') !== 'active') return true;
    
    // Validate required fields for active members
    const requiredFields = {
      firstName: form.getValues('firstName'),
      lastName: form.getValues('lastName'),
      email: form.getValues('email'),
      phoneNumber: form.getValues('phoneNumber'),
      initiationSemester: form.getValues('initiationSemester'),
      initiationYear: form.getValues('initiationYear'),
      memberId: form.getValues('memberId'),
      address: form.getValues('address'),
      city: form.getValues('city'),
      state: form.getValues('state'),
      zipCode: form.getValues('zipCode'),
      birthDate: form.getValues('birthDate'),
    };
    
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);
    
    if (missingFields.length > 0) {
      setValidationError("Please fill out all required fields before proceeding");
      return false;
    }
    
    return true;
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      // For active members, validate all required fields
      if (data.memberType === 'active' && !validateActiveRequiredFields()) {
        return;
      }
      
      // Ensure all required fields are present
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
      
      {validationError && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}
      
      {renderStep()}
      
      {/* Back/Next Navigation Buttons */}
      {step > 1 && step < totalSteps && (
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={prevStep}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          
          {/* Next button is handled by individual step components */}
        </div>
      )}
    </div>
  );
};
