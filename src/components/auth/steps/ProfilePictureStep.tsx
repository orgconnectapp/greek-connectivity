
import { UseFormReturn } from 'react-hook-form';
import { ArrowRight, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SignupFormData } from '../signupSchemas';
import { useState } from 'react';

interface ProfilePictureStepProps {
  form: UseFormReturn<SignupFormData>;
  onNextStep: () => void;
}

export const ProfilePictureStep = ({ form, onNextStep }: ProfilePictureStepProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

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

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-4">
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
      <Button className="w-full" onClick={onNextStep}>
        Next <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
