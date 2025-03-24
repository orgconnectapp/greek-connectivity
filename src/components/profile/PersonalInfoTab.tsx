
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Edit, Eye, EyeOff, IdCard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileData {
  email: string;
  phoneNumber: string;
  address: string;
  major: string;
  gradYear: string;
  memberId: string;
  profilePicture?: string;
}

interface PersonalInfoTabProps {
  profileData: ProfileData;
  showEmail: boolean;
  showPhone: boolean;
  onEditClick: () => void;
}

export const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({
  profileData,
  showEmail,
  showPhone,
  onEditClick
}) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-primary/10">
                <AvatarImage src={profileData.profilePicture || "/placeholder.svg"} alt="Jason Smith" />
                <AvatarFallback className="text-2xl">JS</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">Jason Smith</CardTitle>
                <CardDescription>
                  Active Member since 2022
                  {profileData.memberId && (
                    <div className="flex items-center gap-1 mt-1">
                      <IdCard className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">Member ID: {profileData.memberId}</span>
                    </div>
                  )}
                </CardDescription>
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
              onClick={onEditClick}
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
    </div>
  );
};
