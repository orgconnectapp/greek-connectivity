
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { baseSchema, SignupFormData } from '../signupSchemas';

export const useSignupFlow = () => {
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

  return {
    step,
    form,
    validationError,
    nextStep,
    prevStep,
    validateActiveRequiredFields,
    onSubmit,
    setValidationError
  };
};
