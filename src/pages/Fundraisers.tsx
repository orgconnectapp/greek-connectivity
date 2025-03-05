
import React from 'react';
import { 
  Calendar, 
  DollarSign, 
  Filter, 
  PlusCircle, 
  Search, 
  Users, 
  LineChart,
  MoreHorizontal, 
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data
const fundraisers = [
  { 
    id: 1, 
    title: 'Spring Charity Gala', 
    description: 'Annual formal fundraising event supporting local children\'s hospital.',
    date: 'April 20, 2024',
    goal: 2000,
    raised: 1250,
    participants: 18,
    status: 'active',
  },
  { 
    id: 2, 
    title: 'Campus Clean-Up', 
    description: 'Community service event to clean up and beautify our campus.',
    date: 'May 5, 2024',
    goal: 500,
    raised: 450,
    participants: 24,
    status: 'active',
  },
  { 
    id: 3, 
    title: 'Alumni Networking Event', 
    description: 'Connect current members with alumni for mentorship and career opportunities.',
    date: 'May 15, 2024',
    goal: 1500,
    raised: 0,
    participants: 5,
    status: 'upcoming',
  },
  { 
    id: 4, 
    title: 'Fall Semester Kickoff', 
    description: 'Welcome event for new and returning members.',
    date: 'September 10, 2024',
    goal: 1000,
    raised: 0,
    participants: 0,
    status: 'upcoming',
  },
  { 
    id: 5, 
    title: 'Winter Clothing Drive', 
    description: 'Collection of warm clothing for local homeless shelter.',
    date: 'November 15, 2024',
    goal: 800,
    raised: 0,
    participants: 0,
    status: 'upcoming',
  },
  { 
    id: 6, 
    title: 'Valentine's Bake Sale', 
    description: 'Selling homemade treats to raise funds for chapter activities.',
    date: 'February 14, 2024',
    goal: 300,
    raised: 350,
    participants: 12,
    status: 'completed',
  },
];

const stats = [
  { 
    title: 'Total Fundraised',
    value: '$2,050',
    icon: DollarSign,
    change: '+15% from last semester',
    up: true
  },
  { 
    title: 'Active Fundraisers',
    value: '2',
    icon: LineChart,
    change: 'Spring Charity Gala, Campus Clean-Up',
    up: null
  },
  { 
    title: 'Member Participation',
    value: '85%',
    icon: Users,
    change: '+10% from last semester',
    up: true
  },
];

const Fundraisers = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fundraisers</h1>
        <p className="text-muted-foreground">
          Create and manage fundraising events for your organization.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className="animate-fade-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="rounded-full bg-primary/10 p-2">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 text-sm">
                <span className={stat.up === true ? 'text-green-500' : stat.up === false ? 'text-red-500' : 'text-muted-foreground'}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search fundraisers..."
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Create Fundraiser</span>
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        
        {['active', 'upcoming', 'completed', 'all'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fundraisers
                .filter(f => tab === 'all' || f.status === tab)
                .map((fundraiser, index) => {
                  const progress = Math.min(Math.round((fundraiser.raised / fundraiser.goal) * 100), 100);
                  
                  const statusColor = {
                    active: "bg-green-100 text-green-700",
                    upcoming: "bg-blue-100 text-blue-700",
                    completed: "bg-gray-100 text-gray-700"
                  };
                  
                  return (
                    <Card key={fundraiser.id} className="overflow-hidden transition-all hover:shadow-subtle animate-scale-in" style={{ animationDelay: `${0.1 * index}s` }}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className={statusColor[fundraiser.status as keyof typeof statusColor]}>
                            {fundraiser.status.charAt(0).toUpperCase() + fundraiser.status.slice(1)}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              {fundraiser.status === 'active' && (
                                <DropdownMenuItem>Mark Completed</DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-lg font-medium">{fundraiser.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {fundraiser.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{fundraiser.date}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">${fundraiser.raised} of ${fundraiser.goal}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{fundraiser.participants} participants</span>
                          </div>
                          
                          {fundraiser.status === 'upcoming' && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Coming Soon</span>
                            </div>
                          )}
                        </div>
                        
                        {fundraiser.status === 'active' && (
                          <Button className="w-full">Contribute</Button>
                        )}
                        
                        {fundraiser.status === 'upcoming' && (
                          <Button variant="outline" className="w-full">Get Notified</Button>
                        )}
                        
                        {fundraiser.status === 'completed' && (
                          <Button variant="outline" className="w-full">View Results</Button>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Fundraisers;
