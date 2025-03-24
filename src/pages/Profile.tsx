
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Edit, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";

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
    gpa: "3.8",
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
      gpa: formData.gpa,
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
        
        <TabsContent value="info" className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Avatar className="h-20 w-20 border-2 border-primary/10">
                    <AvatarImage src="/placeholder.svg" alt="Jason Smith" />
                    <AvatarFallback className="text-2xl">JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">Jason Smith</CardTitle>
                    <CardDescription>Active Member since 2022</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="bg-primary/5">President</Badge>
                      <Badge variant="outline" className="bg-secondary/5">Chapter Executive</Badge>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setEditDialogOpen(true)}
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.email}</span>
                        {showEmail ? (
                          <Badge variant="outline" className="ml-auto text-xs bg-green-100 text-green-800">
                            <Eye className="h-3 w-3 mr-1" /> Visible
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="ml-auto text-xs bg-yellow-100 text-yellow-800">
                            <EyeOff className="h-3 w-3 mr-1" /> Hidden
                          </Badge>
                        )}
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.phoneNumber}</span>
                        {showPhone ? (
                          <Badge variant="outline" className="ml-auto text-xs bg-green-100 text-green-800">
                            <Eye className="h-3 w-3 mr-1" /> Visible
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="ml-auto text-xs bg-yellow-100 text-yellow-800">
                            <EyeOff className="h-3 w-3 mr-1" /> Hidden
                          </Badge>
                        )}
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.address}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Academic Information</h3>
                    <p>{profileData.major}, {profileData.gradYear}</p>
                    <p>GPA: {profileData.gpa}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Chapter Information</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Initiated: Spring 2022</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Privacy Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">Control what information is visible to other members</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-email">Show Email Address</Label>
                        <p className="text-sm text-muted-foreground">Allow other members to see your email address</p>
                      </div>
                      <Switch 
                        id="show-email" 
                        checked={showEmail}
                        onCheckedChange={(checked) => handlePrivacyChange('email', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="show-phone">Show Phone Number</Label>
                        <p className="text-sm text-muted-foreground">Allow other members to see your phone number</p>
                      </div>
                      <Switch 
                        id="show-phone" 
                        checked={showPhone}
                        onCheckedChange={(checked) => handlePrivacyChange('phone', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage what types of emails you receive</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="notify-fundraisers" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="notify-fundraisers">New Fundraisers</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="notify-messages" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="notify-messages">New message board posts</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
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
          gpa: profileData.gpa,
          showEmail: showEmail,
          showPhone: showPhone,
        }}
        onSave={handleProfileSave}
      />
    </div>
  );
};

export default Profile;
