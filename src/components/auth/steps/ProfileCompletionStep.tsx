
import { UseFormReturn } from 'react-hook-form';
import { Check, ImagePlus, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SignupFormData } from '../signupSchemas';
import { useState } from 'react';

interface ProfileCompletionStepProps {
  form: UseFormReturn<SignupFormData>;
  onSubmit: (data: SignupFormData) => Promise<void>;
}

export const ProfileCompletionStep = ({ form, onSubmit }: ProfileCompletionStepProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleComplete = async () => {
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

      <Button 
        className="w-full mt-8" 
        onClick={handleComplete}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Creating your account..."
        ) : (
          <>Complete <Check className="ml-2 h-4 w-4" /></>
        )}
      </Button>
    </div>
  );
};
