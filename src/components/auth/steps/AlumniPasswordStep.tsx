
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SignupFormData } from '../signupSchemas';

interface AlumniPasswordStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const AlumniPasswordStep = ({ form, onNextStep }: AlumniPasswordStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Create Password</Label>
        <Input
          id="password"
          type="password"
          {...form.register("password")}
          placeholder="••••••••"
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
        )}
      </div>
      <Button 
        className="w-full" 
        onClick={() => {
          if (form.getValues('password')) {
            onNextStep();
          } else {
            form.trigger(['password']);
          }
        }}
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
