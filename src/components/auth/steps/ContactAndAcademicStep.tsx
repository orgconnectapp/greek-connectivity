
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SignupFormData } from '../signupSchemas';

interface ContactAndAcademicStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const ContactAndAcademicStep = ({ form, onNextStep }: ContactAndAcademicStepProps) => {
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
      <div className="space-y-2">
        <Label htmlFor="major">Major</Label>
        <Input
          id="major"
          {...form.register("major")}
          placeholder="Enter your major"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currentYear">Current Year</Label>
        <Select
          onValueChange={(value) => form.setValue('currentYear', value as SignupFormData['currentYear'])}
          defaultValue={form.getValues('currentYear')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="freshman">Freshman</SelectItem>
            <SelectItem value="sophomore">Sophomore</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
            <SelectItem value="graduate">Graduate Student</SelectItem>
          </SelectContent>
        </Select>
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
