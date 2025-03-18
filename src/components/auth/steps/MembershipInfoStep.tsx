
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight, Calendar, Hash } from 'lucide-react';
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
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Membership Information</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Please provide your Lambda Chi Alpha membership details
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="initiationSemester">Initiation Semester</Label>
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
        <Label htmlFor="initiationYear">Initiation Year</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="initiationYear"
            type="text"
            {...form.register("initiationYear")}
            placeholder="2022"
            className="pl-10"
          />
        </div>
        {form.formState.errors.initiationYear && (
          <p className="text-sm text-red-500">{form.formState.errors.initiationYear.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="memberId">Member ID</Label>
        <div className="relative">
          <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="memberId"
            {...form.register("memberId")}
            placeholder="Enter your member ID"
            className="pl-10"
          />
        </div>
        {form.formState.errors.memberId && (
          <p className="text-sm text-red-500">{form.formState.errors.memberId.message}</p>
        )}
      </div>

      <Button 
        className="w-full mt-4" 
        onClick={() => {
          if (form.getValues('initiationSemester') && form.getValues('initiationYear') && form.getValues('memberId')) {
            onNextStep();
          } else {
            form.trigger(['initiationSemester', 'initiationYear', 'memberId']);
          }
        }}
      >
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
