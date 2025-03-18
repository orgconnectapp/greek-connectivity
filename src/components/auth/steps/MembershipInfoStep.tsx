
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight, Calendar, Hash, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignupFormData } from '../signupSchemas';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MembershipInfoStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const MembershipInfoStep = ({ form, onNextStep }: MembershipInfoStepProps) => {
  const validateAndContinue = () => {
    form.trigger(['initiationSemester', 'initiationYear', 'memberId']).then((isValid) => {
      if (isValid &&
          form.getValues('initiationSemester') &&
          form.getValues('initiationYear') &&
          form.getValues('memberId')) {
        onNextStep();
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Membership Information</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Please provide your Lambda Chi Alpha membership details
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="initiationSemester">Initiation Semester <span className="text-red-500">*</span></Label>
        <Select
          defaultValue={form.getValues("initiationSemester") || "fall"}
          onValueChange={(value) => form.setValue("initiationSemester", value as "fall" | "spring")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fall">Fall</SelectItem>
            <SelectItem value="spring">Spring</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="initiationYear">Initiation Year <span className="text-red-500">*</span></Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="initiationYear"
            type="text"
            {...form.register("initiationYear", { required: "Initiation year is required" })}
            placeholder="2022"
            className="pl-10"
          />
        </div>
        {form.formState.errors.initiationYear && (
          <p className="text-sm text-red-500">{form.formState.errors.initiationYear.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="memberId">Member ID <span className="text-red-500">*</span></Label>
        <div className="relative">
          <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="memberId"
            {...form.register("memberId", { required: "Member ID is required" })}
            placeholder="Enter your member ID"
            className="pl-10"
          />
        </div>
        {form.formState.errors.memberId && (
          <p className="text-sm text-red-500">{form.formState.errors.memberId.message}</p>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" type="button" onClick={() => form.setValue('memberType', form.getValues('memberType'))}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={validateAndContinue}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
