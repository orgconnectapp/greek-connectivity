
import { UseFormReturn } from 'react-hook-form';
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
import { SignupFormData, MOCK_ORGANIZATIONS } from '../signupSchemas';

interface OrganizationStepProps {
  form: UseFormReturn<SignupFormData>;
  onSubmit: (data: SignupFormData) => Promise<void>;
}

export const OrganizationStep = ({ form, onSubmit }: OrganizationStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="organization">Organization</Label>
        <Select
          onValueChange={(value) => form.setValue('organization', value)}
          defaultValue={form.getValues('organization')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an organization" />
          </SelectTrigger>
          <SelectContent>
            {MOCK_ORGANIZATIONS.map((org) => (
              <SelectItem key={org} value={org}>
                {org}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.organization && (
          <p className="text-sm text-red-500">{form.formState.errors.organization.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...form.register("password")}
          placeholder="Create a password"
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
        )}
      </div>
      <Button 
        className="w-full"
        onClick={form.handleSubmit(onSubmit)}
      >
        Request Access
      </Button>
    </div>
  );
};
