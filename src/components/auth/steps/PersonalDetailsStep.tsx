
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight, Home, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignupFormData } from '../signupSchemas';

interface PersonalDetailsStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const PersonalDetailsStep = ({ form, onNextStep }: PersonalDetailsStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Personal Details</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Please provide your address and personal information
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            {...form.register("address")}
            placeholder="123 Main St"
            className="pl-10"
          />
        </div>
        {form.formState.errors.address && (
          <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            {...form.register("city")}
            placeholder="Anytown"
          />
          {form.formState.errors.city && (
            <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            {...form.register("state")}
            placeholder="CA"
          />
          {form.formState.errors.state && (
            <p className="text-sm text-red-500">{form.formState.errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code</Label>
          <Input
            id="zipCode"
            {...form.register("zipCode")}
            placeholder="12345"
          />
          {form.formState.errors.zipCode && (
            <p className="text-sm text-red-500">{form.formState.errors.zipCode.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="birthDate"
              type="date"
              {...form.register("birthDate")}
              className="pl-10"
            />
          </div>
          {form.formState.errors.birthDate && (
            <p className="text-sm text-red-500">{form.formState.errors.birthDate.message}</p>
          )}
        </div>
      </div>

      <Button 
        className="w-full mt-4" 
        onClick={() => {
          if (form.getValues('address') && form.getValues('city') && 
              form.getValues('state') && form.getValues('zipCode')) {
            onNextStep();
          } else {
            form.trigger(['address', 'city', 'state', 'zipCode']);
          }
        }}
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
