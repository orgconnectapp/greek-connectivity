
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SignupFormData } from '../signupSchemas';

interface AlumniContactStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const AlumniContactStep = ({ form, onNextStep }: AlumniContactStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">School Email</Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          placeholder="you@university.edu"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          {...form.register("phoneNumber")}
          placeholder="(555) 555-5555"
        />
        {form.formState.errors.phoneNumber && (
          <p className="text-sm text-red-500">{form.formState.errors.phoneNumber.message}</p>
        )}
      </div>
      <Button 
        className="w-full" 
        onClick={() => {
          if (form.getValues('email') && form.getValues('phoneNumber')) {
            onNextStep();
          } else {
            form.trigger(['email', 'phoneNumber']);
          }
        }}
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
