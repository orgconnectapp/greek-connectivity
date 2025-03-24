
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { PersonalInfoTab } from "@/components/profile/PersonalInfoTab";
import { SettingsTab } from "@/components/profile/SettingsTab";

const Profile = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  // State for privacy settings
  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  
  // State for user profile information
  const [profileData, setProfileData] = useState({
    email: "jason.smith@example.com",
    phoneNumber: "(555) 123-4567",
    address: "123 University Ave, Campus Housing",
    major: "Computer Science",
    gradYear: "Class of 2024",
    memberId: "A12345678",
    profilePicture: undefined as string | undefined,
  });
  
  // State for edit profile dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handlePrivacyChange = (setting: 'email' | 'phone', value: boolean) => {
    if (setting === 'email') {
      setShowEmail(value);
    } else {
      setShowPhone(value);
    }

    // In a real app, you would save these settings to the backend
    toast({
      title: "Privacy setting updated",
      description: `Your ${setting} is now ${value ? 'visible' : 'hidden'} to other members.`,
    });
  };
  
  const handleProfileSave = (formData: any) => {
    setProfileData({
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      major: formData.major,
      gradYear: formData.gradYear,
      memberId: formData.memberId,
      profilePicture: formData.profilePicture,
    });
    
    setShowEmail(formData.showEmail);
    setShowPhone(formData.showPhone);
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="container max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information and membership details
        </p>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="info">Personal Info</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <PersonalInfoTab 
            profileData={profileData} 
            showEmail={showEmail} 
            showPhone={showPhone} 
            onEditClick={() => setEditDialogOpen(true)} 
          />
        </TabsContent>
        
        <TabsContent value="settings">
          <SettingsTab 
            showEmail={showEmail} 
            showPhone={showPhone} 
            onPrivacyChange={handlePrivacyChange} 
          />
        </TabsContent>
      </Tabs>
      
      {/* Edit Profile Dialog */}
      <EditProfileDialog 
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        initialData={{
          email: profileData.email,
          phoneNumber: profileData.phoneNumber,
          address: profileData.address,
          major: profileData.major,
          gradYear: profileData.gradYear,
          memberId: profileData.memberId,
          showEmail: showEmail,
          showPhone: showPhone,
          profilePicture: profileData.profilePicture,
        }}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default Profile;
