import React, { useState } from 'react';
import { 
  Calendar, 
  DollarSign, 
  Filter, 
  PlusCircle, 
  Search, 
  Users, 
  LineChart,
  MoreHorizontal, 
  Clock,
  Share2,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { toast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import CreateFundraiserDialog from '@/components/fundraisers/CreateFundraiserDialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const donors = [
  { id: 1, name: 'Emma', avatar: 'https://i.pravatar.cc/150?img=1', amount: 50, date: '2024-04-01' },
  { id: 2, name: 'Mike', avatar: 'https://i.pravatar.cc/150?img=2', amount: 25, date: '2024-04-02' },
  { id: 3, name: 'John', avatar: 'https://i.pravatar.cc/150?img=3', amount: 100, date: '2024-04-03' },
  { id: 4, name: 'Todd', avatar: 'https://i.pravatar.cc/150?img=4', amount: 75, date: '2024-04-04' },
  { id: 5, name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=5', amount: 40, date: '2024-04-05' },
  { id: 6, name: 'Alex', avatar: 'https://i.pravatar.cc/150?img=6', amount: 30, date: '2024-04-06' },
  { id: 7, name: 'Lisa', avatar: 'https://i.pravatar.cc/150?img=7', amount: 60, date: '2024-04-07' },
  { id: 8, name: 'Diane', avatar: 'https://i.pravatar.cc/150?img=8', amount: 45, date: '2024-04-08' },
  { id: 9, name: 'Jason', avatar: 'https://i.pravatar.cc/150?img=9', amount: 80, date: '2024-04-09' },
  { id: 10, name: 'Rachel', avatar: 'https://i.pravatar.cc/150?img=10', amount: 35, date: '2024-04-10' },
  { id: 11, name: 'David', avatar: 'https://i.pravatar.cc/150?img=11', amount: 90, date: '2024-04-11' },
  { id: 12, name: 'Ashley', avatar: 'https://i.pravatar.cc/150?img=12', amount: 20, date: '2024-04-12' },
  { id: 13, name: 'Kevin', avatar: 'https://i.pravatar.cc/150?img=13', amount: 55, date: '2024-04-13' },
  { id: 14, name: 'Nick', avatar: 'https://i.pravatar.cc/150?img=14', amount: 70, date: '2024-04-14' },
  { id: 15, name: 'Melissa', avatar: 'https://i.pravatar.cc/150?img=15', amount: 65, date: '2024-04-15' },
  { id: 16, name: 'Chris', avatar: 'https://i.pravatar.cc/150?img=16', amount: 120, date: '2024-04-16' },
  { id: 17, name: 'Jessica', avatar: 'https://i.pravatar.cc/150?img=17', amount: 85, date: '2024-04-17' },
  { id: 18, name: 'Brandon', avatar: 'https://i.pravatar.cc/150?img=18', amount: 40, date: '2024-04-18' },
];

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
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    donors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
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
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    donors: [3, 5, 7, 9, 11, 13, 15, 17]
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
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500'
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
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500'
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
    image: 'https://images.unsplash.com/photo-1516763296043-f676c1105999?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500'
  },
  { 
    id: 6, 
    title: 'Valentine\'s Bake Sale', 
    description: 'Selling homemade treats to raise funds for chapter activities.',
    date: 'February 14, 2024',
    goal: 300,
    raised: 350,
    participants: 12,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500'
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
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedFundraiser, setSelectedFundraiser] = useState<typeof fundraisers[0] | null>(null);
  
  const handleShare = (fundraiser: any) => {
    const shareableLink = `${window.location.origin}/external-payment/${fundraiser.id}`;
    
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        toast({
          title: "Link copied to clipboard",
          description: `Share this link to collect donations for "${fundraiser.title}"`,
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy link",
          description: "Please try again or share manually",
          variant: "destructive",
        });
      });
  };

  const handleFundraiserDoubleClick = (fundraiser: typeof fundraisers[0]) => {
    setSelectedFundraiser(fundraiser);
  };

  const getFundraiserDonors = (fundraiserId: number) => {
    const fundraiser = fundraisers.find(f => f.id === fundraiserId);
    if (!fundraiser) return [];
    
    return donors.filter(donor => fundraiser.donors.includes(donor.id));
  };

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
        
        <Button 
          className="gap-2" 
          onClick={() => setCreateDialogOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          <span>Create Fundraiser</span>
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        
        {['active', 'all'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fundraisers
                .filter(f => tab === 'all' || f.status === 'active')
                .map((fundraiser, index) => {
                  const progress = Math.min(Math.round((fundraiser.raised / fundraiser.goal) * 100), 100);
                  
                  const statusColor = {
                    active: "bg-green-100 text-green-700",
                    upcoming: "bg-blue-100 text-blue-700",
                    completed: "bg-gray-100 text-gray-700"
                  };
                  
                  const fundraiserDonors = getFundraiserDonors(fundraiser.id);
                  const visibleDonors = fundraiserDonors.slice(0, 3);
                  const remainingDonors = fundraiserDonors.length > 3 ? 
                    fundraiserDonors.slice(3, 6).map(d => d.name) : [];
                  const otherDonorsCount = fundraiserDonors.length > 6 ? 
                    fundraiserDonors.length - 6 : 0;
                  
                  return (
                    <Card 
                      key={fundraiser.id} 
                      className="overflow-hidden transition-all hover:shadow-subtle animate-scale-in cursor-pointer" 
                      style={{ animationDelay: `${0.1 * index}s` }}
                      onDoubleClick={() => handleFundraiserDoubleClick(fundraiser)}
                    >
                      <div className="overflow-hidden">
                        <AspectRatio ratio={16 / 9}>
                          <img 
                            src={fundraiser.image} 
                            alt={fundraiser.title}
                            className="object-cover w-full h-full transition-transform hover:scale-105"
                          />
                        </AspectRatio>
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className={statusColor[fundraiser.status as keyof typeof statusColor]}>
                            {fundraiser.status.charAt(0).toUpperCase() + fundraiser.status.slice(1)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {fundraiser.status === 'active' && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => handleShare(fundraiser)}
                                title="Share fundraiser"
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShare(fundraiser)}>Share</DropdownMenuItem>
                                {fundraiser.status === 'active' && (
                                  <DropdownMenuItem>Mark Completed</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
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
                        
                        {fundraiserDonors.length > 0 ? (
                          <div className="flex items-center text-sm">
                            <div className="flex -space-x-2 mr-2">
                              {visibleDonors.map((donor) => (
                                <Avatar key={donor.id} className="border-2 border-background h-8 w-8">
                                  <AvatarImage src={donor.avatar} alt={donor.name} />
                                  <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-muted-foreground">
                              {remainingDonors.length > 0 && (
                                <>+ {remainingDonors.join(', ')}</>
                              )}
                              {otherDonorsCount > 0 && (
                                <> + {otherDonorsCount} other donor{otherDonorsCount !== 1 ? 's' : ''}</>
                              )}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>No donors yet</span>
                          </div>
                        )}
                        
                        {fundraiser.status === 'active' && (
                          <div className="flex gap-2">
                            <Button className="flex-1">Contribute</Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleShare(fundraiser)}
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
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
      
      <CreateFundraiserDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />

      <Dialog open={!!selectedFundraiser} onOpenChange={(open) => !open && setSelectedFundraiser(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedFundraiser && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{selectedFundraiser.title}</DialogTitle>
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogClose>
                </div>
                <DialogDescription>
                  {selectedFundraiser.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                <div className="md:col-span-2">
                  <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden">
                    <img 
                      src={selectedFundraiser.image} 
                      alt={selectedFundraiser.title}
                      className="h-full w-full object-cover"
                    />
                  </AspectRatio>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Fundraiser Details</h3>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className={
                        selectedFundraiser.status === 'active' ? "bg-green-100 text-green-700" : 
                        selectedFundraiser.status === 'upcoming' ? "bg-blue-100 text-blue-700" : 
                        "bg-gray-100 text-gray-700"
                      }>
                        {selectedFundraiser.status.charAt(0).toUpperCase() + selectedFundraiser.status.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span>{selectedFundraiser.date}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goal</span>
                      <span>${selectedFundraiser.goal}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Raised</span>
                      <span>${selectedFundraiser.raised}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span>
                          {Math.min(Math.round((selectedFundraiser.raised / selectedFundraiser.goal) * 100), 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(Math.round((selectedFundraiser.raised / selectedFundraiser.goal) * 100), 100)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                  
                  {selectedFundraiser.status === 'active' && (
                    <Button className="w-full">Contribute Now</Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Donor List</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFundraiserDonors(selectedFundraiser.id).map((donor) => (
                      <TableRow key={donor.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={donor.avatar} alt={donor.name} />
                              <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{donor.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>${donor.amount}</TableCell>
                        <TableCell>{donor.date}</TableCell>
                      </TableRow>
                    ))}
                    {getFundraiserDonors(selectedFundraiser.id).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                          No donors yet for this fundraiser
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Fundraisers;
