
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SignupFormData } from '../signupSchemas';
import { useEffect } from 'react';

interface MemberTypeStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const MemberTypeStep = ({ form, onNextStep }: MemberTypeStepProps) => {
  // Ensure memberType has a value when component mounts
  useEffect(() => {
    if (!form.getValues('memberType')) {
      form.setValue('memberType', 'active');
    }
  }, [form]);

  const handleTypeSelection = (type: 'active' | 'alumni') => {
    form.setValue('memberType', type);
    console.log('Member type selected:', type);
  };

  return (
    <div className="space-y-4">
      <Label>Member Type</Label>
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant={form.getValues('memberType') === 'active' ? 'default' : 'outline'}
          onClick={() => handleTypeSelection('active')}
          className="w-full"
        >
          Active Member
        </Button>
        <Button
          type="button"
          variant={form.getValues('memberType') === 'alumni' ? 'default' : 'outline'}
          onClick={() => handleTypeSelection('alumni')}
          className="w-full"
        >
          Alumni
        </Button>
      </div>
      <Button className="w-full" onClick={onNextStep}>
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
