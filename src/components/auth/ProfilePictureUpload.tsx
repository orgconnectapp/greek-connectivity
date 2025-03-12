
import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';

interface ProfilePictureUploadProps {
  previewUrl: string;
  onChange: (base64: string) => void;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({ previewUrl, onChange }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-primary overflow-hidden">
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
    </div>
  );
};

export default ProfilePictureUpload;
