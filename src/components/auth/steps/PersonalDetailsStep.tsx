
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight, Home, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignupFormData } from '../signupSchemas';

interface PersonalDetailsStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const PersonalDetailsStep = ({ form, onNextStep }: PersonalDetailsStepProps) => {
  const validateAndContinue = () => {
    form.trigger(['address', 'city', 'state', 'zipCode', 'birthDate']).then((isValid) => {
      if (isValid && 
          form.getValues('address') && 
          form.getValues('city') && 
          form.getValues('state') && 
          form.getValues('zipCode') &&
          form.getValues('birthDate')) {
        onNextStep();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Personal Details</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Please provide your address and personal information
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
        <div className="relative">
          <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="address"
            {...form.register("address", { required: "Address is required" })}
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
          <Label htmlFor="city">City <span className="text-red-500">*</span></Label>
          <Input
            id="city"
            {...form.register("city", { required: "City is required" })}
            placeholder="Anytown"
          />
          {form.formState.errors.city && (
            <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State <span className="text-red-500">*</span></Label>
          <Input
            id="state"
            {...form.register("state", { required: "State is required" })}
            placeholder="CA"
          />
          {form.formState.errors.state && (
            <p className="text-sm text-red-500">{form.formState.errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipCode">ZIP Code <span className="text-red-500">*</span></Label>
          <Input
            id="zipCode"
            {...form.register("zipCode", { required: "ZIP code is required" })}
            placeholder="12345"
          />
          {form.formState.errors.zipCode && (
            <p className="text-sm text-red-500">{form.formState.errors.zipCode.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">Birth Date <span className="text-red-500">*</span></Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="birthDate"
              type="date"
              {...form.register("birthDate", { required: "Birth date is required" })}
              className="pl-10"
            />
          </div>
          {form.formState.errors.birthDate && (
            <p className="text-sm text-red-500">{form.formState.errors.birthDate.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={validateAndContinue}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
