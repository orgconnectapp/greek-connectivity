
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight, UserCircle, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
      <div>
        <Label className="text-base">Select your membership type</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Choose whether you're a current student member or an alumnus
        </p>
      </div>

      <RadioGroup
        defaultValue={form.getValues('memberType')}
        onValueChange={(value) => handleTypeSelection(value as 'active' | 'alumni')}
        className="grid gap-4"
      >
        <div className={`flex items-start space-x-3 space-y-0 rounded-md border p-4 
          ${form.getValues('memberType') === 'active' ? 'bg-primary/5 border-primary' : ''}`}
        >
          <RadioGroupItem value="active" id="active" className="mt-1" />
          <div className="flex flex-col gap-1">
            <Label htmlFor="active" className="font-medium flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              Active Member
            </Label>
            <p className="text-sm text-muted-foreground">
              Current student member of Lambda Chi Alpha
            </p>
          </div>
        </div>

        <div className={`flex items-start space-x-3 space-y-0 rounded-md border p-4 
          ${form.getValues('memberType') === 'alumni' ? 'bg-primary/5 border-primary' : ''}`}
        >
          <RadioGroupItem value="alumni" id="alumni" className="mt-1" />
          <div className="flex flex-col gap-1">
            <Label htmlFor="alumni" className="font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Alumni
            </Label>
            <p className="text-sm text-muted-foreground">
              Former member who has graduated
            </p>
          </div>
        </div>
      </RadioGroup>

      <Button className="w-full mt-4" onClick={onNextStep}>
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
