
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus } from "lucide-react";

interface ProfileFormData {
  email: string;
  phoneNumber: string;
  address: string;
  major: string;
  gradYear: string;
  memberId: string;
  showEmail: boolean;
  showPhone: boolean;
  profilePicture?: string;
}

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: {
    email: string;
    phoneNumber: string;
    address: string;
    major: string;
    gradYear: string;
    memberId: string;
    showEmail: boolean;
    showPhone: boolean;
    profilePicture?: string;
  };
  onSave: (data: ProfileFormData) => void;
}

export function EditProfileDialog({ 
  open, 
  onOpenChange,
  initialData,
  onSave
}: EditProfileDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProfileFormData>(initialData);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialData.profilePicture);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        setFormData((prev) => ({ ...prev, profilePicture: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your contact and academic information. Changes will be visible to other members based on your privacy settings.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center space-y-4 my-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary/10">
                <AvatarImage src={previewUrl || "/placeholder.svg"} alt="Profile picture" />
                <AvatarFallback className="text-2xl">JS</AvatarFallback>
              </Avatar>
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
            <p className="text-sm text-muted-foreground">Click the icon to change your profile picture</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-sm">Contact Information</h3>
            
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="showEmail" className="text-xs text-muted-foreground">Visible to members</Label>
                  <Switch 
                    id="showEmail" 
                    checked={formData.showEmail}
                    onCheckedChange={(checked) => handleSwitchChange('showEmail', checked)}
                  />
                </div>
              </div>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="showPhone" className="text-xs text-muted-foreground">Visible to members</Label>
                  <Switch 
                    id="showPhone" 
                    checked={formData.showPhone}
                    onCheckedChange={(checked) => handleSwitchChange('showPhone', checked)}
                  />
                </div>
              </div>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-sm">Academic & Membership Information</h3>
            
            <div className="grid gap-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                name="major"
                value={formData.major}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gradYear">Graduation Year</Label>
                <Input
                  id="gradYear"
                  name="gradYear"
                  value={formData.gradYear}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="memberId">Member ID</Label>
                <Input
                  id="memberId"
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleChange}
                  placeholder="Enter your member ID"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
