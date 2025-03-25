import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";

// Mock user data
const userProfiles = {
  'emma-johnson': {
    name: 'Emma Johnson',
    role: 'Vice President',
    avatar: '/placeholder.svg',
    joinDate: 'Spring 2021',
    major: 'Business Administration',
    graduation: 'Class of 2023',
    gpa: '3.9',
    email: 'emma.johnson@example.com',
    phone: '(555) 234-5678',
    address: '456 University Blvd, Campus Housing',
    serviceHours: 38,
    recentActivity: [
      { 
        title: 'Chapter Meeting', 
        description: 'Presented fundraising results', 
        timestamp: '3 days ago' 
      },
      { 
        title: 'Campus Outreach Event', 
        description: 'Coordinated volunteer schedule', 
        timestamp: '1 week ago' 
      }
    ]
  },
  'michael-brown': {
    name: 'Michael Brown',
    role: 'Treasurer',
    avatar: '/placeholder.svg',
    joinDate: 'Fall 2021',
    major: 'Finance',
    graduation: 'Class of 2024',
    gpa: '3.7',
    email: 'michael.brown@example.com',
    phone: '(555) 345-6789',
    address: '789 College Ave, Fraternity House',
    serviceHours: 25,
    recentActivity: [
      { 
        title: 'Budget Meeting', 
        description: 'Presented quarterly financial report', 
        timestamp: '1 week ago' 
      },
      { 
        title: 'Fundraiser Planning', 
        description: 'Managed expense approvals', 
        timestamp: '2 weeks ago' 
      }
    ]
  },
  'sophia-garcia': {
    name: 'Sophia Garcia',
    role: 'Service Chair',
    avatar: '/placeholder.svg',
    joinDate: 'Spring 2022',
    major: 'Environmental Science',
    graduation: 'Class of 2025',
    gpa: '4.0',
    email: 'sophia.garcia@example.com',
    phone: '(555) 456-7890',
    address: '101 Green St, Off-campus Apartment',
    serviceHours: 52,
    recentActivity: [
      { 
        title: 'Beach Cleanup', 
        description: 'Organized 25 volunteers', 
        timestamp: '3 days ago' 
      },
      { 
        title: 'Community Garden Project', 
        description: 'Secured donation of supplies', 
        timestamp: '2 weeks ago' 
      }
    ]
  },
  'jason-smith': {
    name: 'Jason Smith',
    role: 'President',
    avatar: '/placeholder.svg',
    joinDate: 'Spring 2022',
    major: 'Computer Science',
    graduation: 'Class of 2024',
    gpa: '3.8',
    email: 'jason.smith@example.com',
    phone: '(555) 123-4567',
    address: '123 University Ave, Campus Housing',
    serviceHours: 45,
    recentActivity: [
      { 
        title: 'Beach Cleanup Event', 
        description: 'Contributed 4 service hours', 
        timestamp: '2 weeks ago' 
      },
      { 
        title: 'Chapter Meeting', 
        description: 'Presented new fundraising initiative', 
        timestamp: '1 week ago' 
      }
    ]
  }
};

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Check if coming from message board to determine what info to show
  const isFromMessageBoard = location.state?.from === 'messageBoard';

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      if (username && userProfiles[username]) {
        setUserProfile(userProfiles[username]);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    }, 300);
  }, [username]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading profile...</p></div>
  }

  if (error || !userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-center">User profile not found</h2>
            <p className="text-center text-muted-foreground mt-2">The requested profile could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">{userProfile.name}'s Profile</h1>
        <p className="text-muted-foreground">
          Member information
        </p>
      </div>

      {isFromMessageBoard ? (
        // Simplified view for message board navigation (only personal info, no activity tab)
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary/10">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback className="text-2xl">
                    {userProfile.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                  <CardDescription>Active Member since {userProfile.joinDate}</CardDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-primary/5">{userProfile.role}</Badge>
                  </div>
                </div>
              </div>
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
                      <span>{userProfile.email}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.phone}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.address}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Academic Information</h3>
                  <p>{userProfile.major}, {userProfile.graduation}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Chapter Information</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Initiated: {userProfile.joinDate}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Original full view for other navigation paths
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Personal Info</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Avatar className="h-20 w-20 border-2 border-primary/10">
                      <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                      <AvatarFallback className="text-2xl">
                        {userProfile.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
                      <CardDescription>Active Member since {userProfile.joinDate}</CardDescription>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="bg-primary/5">{userProfile.role}</Badge>
                      </div>
                    </div>
                  </div>
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
                          <span>{userProfile.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{userProfile.phone}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{userProfile.address}</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Academic Information</h3>
                      <p>{userProfile.major}, {userProfile.graduation}</p>
                      <p>GPA: {userProfile.gpa}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Chapter Information</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Initiated: {userProfile.joinDate}</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Service Hours: {userProfile.serviceHours} (This Semester)</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Payment Status</h3>
                      <Badge className="bg-green-500">Dues Paid</Badge>
                      <p className="mt-2 text-sm">Last payment: September 15, 2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Recent actions and participation in the organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile.recentActivity.map((activity: any, index: number) => (
                    <div key={index} className={index < userProfile.recentActivity.length - 1 ? "border-b pb-4" : "pb-4"}>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                      <p className="mt-1">{activity.description}</p>
                    </div>
                  ))}
                  <div className="pb-4">
                    <p className="font-medium">Dues Payment</p>
                    <p className="text-sm text-muted-foreground">4 weeks ago</p>
                    <p className="mt-1">Paid $150 for semester dues</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default UserProfile;
