
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Clock, Edit } from "lucide-react";

const Profile = () => {
  return (
    <div className="container max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information and membership details
        </p>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Personal Info</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
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
                <Button variant="outline" size="sm" className="gap-2">
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
                        <span>jason.smith@example.com</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>(555) 123-4567</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>123 University Ave, Campus Housing</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Academic Information</h3>
                    <p>Computer Science, Class of 2024</p>
                    <p>GPA: 3.8</p>
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
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Service Hours: 45 (This Semester)</span>
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
                Your recent actions and participation in the organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="font-medium">Beach Cleanup Event</p>
                  <p className="text-sm text-muted-foreground">Participated 2 weeks ago</p>
                  <p className="mt-1">Contributed 4 service hours</p>
                </div>
                <div className="border-b pb-4">
                  <p className="font-medium">Chapter Meeting</p>
                  <p className="text-sm text-muted-foreground">Attended 1 week ago</p>
                  <p className="mt-1">Presented new fundraising initiative</p>
                </div>
                <div className="pb-4">
                  <p className="font-medium">Dues Payment</p>
                  <p className="text-sm text-muted-foreground">2 weeks ago</p>
                  <p className="mt-1">Paid $150 for semester dues</p>
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
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Email Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage what types of emails you receive</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="notify-events" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="notify-events">Event announcements</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="notify-dues" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="notify-dues">Dues reminders</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="notify-messages" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="notify-messages">New message board posts</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="notify-newsletter" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="notify-newsletter">Weekly newsletter</label>
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
    </div>
  );
};

export default Profile;
