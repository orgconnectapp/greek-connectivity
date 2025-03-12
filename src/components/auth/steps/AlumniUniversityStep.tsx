
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { SignupFormData, MOCK_UNIVERSITIES, getOrganizationsByUniversity } from '../signupSchemas';

interface AlumniUniversityStepProps {
  form: UseFormReturn<SignupFormData>;
  onSubmit: (data: SignupFormData) => Promise<void>;
}

export const AlumniUniversityStep = ({ form, onSubmit }: AlumniUniversityStepProps) => {
  const [organizations, setOrganizations] = useState<string[]>([]);
  const [university, setUniversity] = useState<string>('');

  useEffect(() => {
    if (university) {
      const orgs = getOrganizationsByUniversity(university);
      setOrganizations(orgs);
      // Clear organization when university changes
      form.setValue('organization', '');
    }
  }, [university, form]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="university">University</Label>
        <Select
          onValueChange={(value) => {
            setUniversity(value);
            form.setValue('university', value);
          }}
          defaultValue={form.getValues('university')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your university" />
          </SelectTrigger>
          <SelectContent>
            {MOCK_UNIVERSITIES.map((uni) => (
              <SelectItem key={uni} value={uni}>
                {uni}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="organization">Organization</Label>
        <Select
          onValueChange={(value) => form.setValue('organization', value)}
          defaultValue={form.getValues('organization')}
          disabled={!university}
        >
          <SelectTrigger>
            <SelectValue placeholder={university ? "Select an organization" : "First select a university"} />
          </SelectTrigger>
          <SelectContent>
            {organizations.map((org) => (
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
      
      <Button 
        className="w-full"
        disabled={!form.getValues('organization')}
        onClick={form.handleSubmit(onSubmit)}
      >
        Request Access
      </Button>
    </div>
  );
};
