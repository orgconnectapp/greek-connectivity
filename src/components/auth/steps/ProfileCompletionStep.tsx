
import { UseFormReturn } from 'react-hook-form';
import { Check, ImagePlus, Linkedin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignupFormData } from '../signupSchemas';
import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProfileCompletionStepProps {
  form: UseFormReturn<SignupFormData>;
  onSubmit: (data: SignupFormData) => Promise<void>;
}

export const ProfileCompletionStep = ({ form, onSubmit }: ProfileCompletionStepProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        form.setValue('profilePicture', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateAllRequiredFields = () => {
    // For active members, we need to validate all required fields
    if (form.getValues('memberType') === 'active') {
      const requiredFields = {
        firstName: form.getValues('firstName'),
        lastName: form.getValues('lastName'),
        email: form.getValues('email'),
        phoneNumber: form.getValues('phoneNumber'),
        initiationSemester: form.getValues('initiationSemester'),
        initiationYear: form.getValues('initiationYear'),
        memberId: form.getValues('memberId'),
        address: form.getValues('address'),
        city: form.getValues('city'),
        state: form.getValues('state'),
        zipCode: form.getValues('zipCode'),
        birthDate: form.getValues('birthDate'),
      };
      
      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
      
      if (missingFields.length > 0) {
        setValidationError("Please fill out all required fields before completing registration");
        return false;
      }
    }
    
    return true;
  };

  const handleComplete = async () => {
    if (!validateAllRequiredFields()) {
      return;
    }
    
    setValidationError(null);
    setIsSubmitting(true);
    try {
      await form.handleSubmit(onSubmit)();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base">Complete Your Profile</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Add a profile picture and connect your LinkedIn account
        </p>
      </div>

      {validationError && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col items-center space-y-4 my-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-2 border-primary overflow-hidden">
            {previewUrl ? (
              <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="profile-picture"
          />
          <label
            htmlFor="profile-picture"
            className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <ImagePlus className="h-4 w-4" />
          </label>
        </div>
        <p className="text-sm text-muted-foreground">Add a profile picture (optional)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedIn">LinkedIn Profile</Label>
        <div className="relative">
          <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="linkedIn"
            {...form.register("linkedIn")}
            placeholder="https://linkedin.com/in/yourprofile"
            className="pl-10"
          />
        </div>
        <p className="text-xs text-muted-foreground">Connect your LinkedIn profile (optional)</p>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" type="button" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          onClick={handleComplete}
          disabled={isSubmitting}
          className="px-6"
        >
          {isSubmitting ? (
            "Creating your account..."
          ) : (
            <>Complete <Check className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
};
