
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SignupFormData } from '../signupSchemas';

interface PersonalInfoStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const PersonalInfoStep = ({ form, onNextStep }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          {...form.register("firstName")}
          placeholder="Enter your first name"
        />
        {form.formState.errors.firstName && (
          <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          {...form.register("lastName")}
          placeholder="Enter your last name"
        />
        {form.formState.errors.lastName && (
          <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
        )}
      </div>
      <Button 
        className="w-full" 
        onClick={() => {
          if (form.getValues('firstName') && form.getValues('lastName')) {
            onNextStep();
          } else {
            form.trigger(['firstName', 'lastName']);
          }
        }}
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
