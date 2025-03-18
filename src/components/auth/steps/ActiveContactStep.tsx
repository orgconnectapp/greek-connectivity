
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignupFormData } from '../signupSchemas';

interface ActiveContactStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const ActiveContactStep = ({ form, onNextStep }: ActiveContactStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Contact Information</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Please provide your contact details
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="schoolEmail">School Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="schoolEmail"
            type="email"
            {...form.register("schoolEmail")}
            placeholder="you@university.edu"
            className="pl-10"
          />
        </div>
        {form.formState.errors.schoolEmail && (
          <p className="text-sm text-red-500">{form.formState.errors.schoolEmail.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="personalEmail">Personal Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="personalEmail"
            type="email"
            {...form.register("personalEmail")}
            placeholder="you@example.com"
            className="pl-10"
          />
        </div>
        {form.formState.errors.personalEmail && (
          <p className="text-sm text-red-500">{form.formState.errors.personalEmail.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="phoneNumber"
            {...form.register("phoneNumber")}
            placeholder="(555) 555-5555"
            className="pl-10"
          />
        </div>
        {form.formState.errors.phoneNumber && (
          <p className="text-sm text-red-500">{form.formState.errors.phoneNumber.message}</p>
        )}
      </div>

      <Button 
        className="w-full mt-4" 
        onClick={() => {
          if (form.getValues('schoolEmail') && form.getValues('phoneNumber')) {
            form.setValue('email', form.getValues('schoolEmail') || '');
            onNextStep();
          } else {
            form.trigger(['schoolEmail', 'phoneNumber']);
          }
        }}
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
