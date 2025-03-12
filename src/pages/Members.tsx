
import React, { useState } from 'react';
import { 
  Search, 
  UserPlus,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Graduation,
  Instagram,
  Linkedin,
  Twitter,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Member } from '@/components/calendar/types';

// Enhanced mock data with more profile details
const members: Member[] = [
  { 
    id: "1", 
    name: 'Jason Smith', 
    role: 'President',
    email: 'jason@greeksync.com',
    phone: '(555) 123-4567',
    joinedDate: 'Sept 2021',
    status: 'active',
    major: 'Business Administration',
    graduationYear: '2025',
    bio: 'Passionate about leadership and community building. Leading our chapter toward excellence and innovation.',
    socialLinks: {
      instagram: 'jasonsmith',
      linkedin: 'jason-smith-123',
      twitter: 'jsmith'
    }
  },
  { 
    id: "2", 
    name: 'Emma Johnson', 
    role: 'Vice President',
    email: 'emma@greeksync.com',
    phone: '(555) 987-6543',
    joinedDate: 'Jan 2022',
    status: 'active',
    major: 'Marketing',
    graduationYear: '2025',
    bio: 'Marketing enthusiast with a passion for event planning and chapter growth strategies.',
    socialLinks: {
      instagram: 'emmaj',
      linkedin: 'emma-johnson',
    }
  },
  { 
    id: "3", 
    name: 'Michael Brown', 
    role: 'Treasurer',
    email: 'michael@greeksync.com',
    phone: '(555) 456-7890',
    joinedDate: 'Sept 2022',
    status: 'active',
    major: 'Finance',
    graduationYear: '2024',
    bio: 'Detail-oriented finance major managing our chapter funds and budgeting initiatives.',
    socialLinks: {
      linkedin: 'michael-brown-finance',
    }
  },
  { 
    id: "4", 
    name: 'Sophia Garcia', 
    role: 'Secretary',
    email: 'sophia@greeksync.com',
    phone: '(555) 234-5678',
    joinedDate: 'Jan 2023',
    status: 'active',
    major: 'Communications',
    graduationYear: '2026',
    bio: 'Organized and efficient communications major handling our chapter documentation and correspondence.',
    socialLinks: {
      instagram: 'sophiag',
      twitter: 'sophiagarcia',
    }
  },
  { 
    id: "5", 
    name: 'Alex Williams', 
    role: 'Event Coordinator',
    email: 'alex@greeksync.com',
    phone: '(555) 876-5432',
    joinedDate: 'Sept 2023',
    status: 'active',
    major: 'Event Management',
    graduationYear: '2025',
    bio: 'Creative event planner with experience in organizing successful campus and community activities.',
    socialLinks: {
      instagram: 'alexw',
      linkedin: 'alex-williams-events',
    }
  },
  { 
    id: "6", 
    name: 'Maya Patel', 
    role: 'Member',
    email: 'maya@greeksync.com',
    phone: '(555) 345-6789',
    joinedDate: 'Jan 2024',
    status: 'active',
    major: 'Psychology',
    graduationYear: '2027',
    bio: 'First-year psychology student interested in mental health awareness and community outreach.',
  },
  { 
    id: "7", 
    name: 'Chloe Lee', 
    role: 'Member',
    email: 'chloe@greeksync.com',
    phone: '(555) 765-4321',
    joinedDate: 'Jan 2024',
    status: 'active',
    major: 'Computer Science',
    graduationYear: '2026',
    bio: 'Tech enthusiast focusing on website management and digital initiatives for our chapter.',
    socialLinks: {
      linkedin: 'chloe-lee-tech',
      github: 'chloelee'
    }
  },
  { 
    id: "8", 
    name: 'Ethan Rodriguez', 
    role: 'Member',
    email: 'ethan@greeksync.com',
    phone: '(555) 543-2109',
    joinedDate: 'Jan 2022',
    status: 'alumni',
    major: 'Engineering',
    graduationYear: '2023',
    bio: 'Recent graduate currently working at Tesla. Passionate about mentoring current members.',
    socialLinks: {
      linkedin: 'ethan-rodriguez-eng',
    }
  },
  { 
    id: "9", 
    name: 'Olivia Wilson', 
    role: 'Chapter Advisor',
    email: 'olivia@greeksync.com',
    phone: '(555) 111-2222',
    joinedDate: 'Sept 2018',
    status: 'alumni',
    major: 'Education',
    graduationYear: '2020',
    bio: 'Former chapter president now serving as an advisor while teaching at the university.',
    socialLinks: {
      linkedin: 'olivia-wilson-edu',
    }
  },
];

const Members = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  const filteredMembers = members.filter(member => {
    // Apply search filter
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      member.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleOpenProfile = (member: Member) => {
    setSelectedMember(member);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Members</h1>
        <p className="text-muted-foreground">
          Manage your organization's members and their roles.
        </p>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search members..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select 
            defaultValue="all"
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Members</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="alumni">Alumni</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-md border p-1">
            <Button
              variant={viewType === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewType('grid')}
            >
              <span className="sr-only">Grid view</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
            </Button>
            <Button
              variant={viewType === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setViewType('list')}
            >
              <span className="sr-only">List view</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Invite Member</span>
          </Button>
        </div>
      </div>
      
      {viewType === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden transition-all hover:shadow-subtle animate-scale-in">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenProfile(member)}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-base mt-2">
                  <button 
                    className="hover:underline text-left" 
                    onClick={() => handleOpenProfile(member)}
                  >
                    {member.name}
                  </button>
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-normal">
                    {member.role}
                  </Badge>
                  {member.status === 'alumni' && (
                    <Badge variant="outline" className="font-normal text-muted-foreground">
                      Alumni
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {member.joinedDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-md border">
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] p-4 font-medium bg-muted/50">
            <div>Name</div>
            <div>Contact</div>
            <div>Joined</div>
            <div></div>
          </div>
          <div className="divide-y">
            {filteredMembers.map((member) => (
              <div key={member.id} className="grid grid-cols-[1fr_1fr_1fr_auto] p-4 items-center animate-fade-up">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      <button 
                        className="hover:underline text-left" 
                        onClick={() => handleOpenProfile(member)}
                      >
                        {member.name}
                      </button>
                    </p>
                    <Badge variant="secondary" className="mt-1 font-normal text-xs">
                      {member.role}
                    </Badge>
                    {member.status === 'alumni' && (
                      <Badge variant="outline" className="ml-1 mt-1 font-normal text-xs">
                        Alumni
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{member.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{member.joinedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenProfile(member)}>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Send Message</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Member Profile Dialog */}
      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Member Profile</DialogTitle>
            <DialogDescription>
              View detailed information about this member
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" alt={selectedMember.name} />
                  <AvatarFallback className="text-lg">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedMember.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="secondary">
                      {selectedMember.role}
                    </Badge>
                    <Badge variant={selectedMember.status === 'active' ? 'default' : 'outline'}>
                      {selectedMember.status === 'active' ? 'Active Member' : 'Alumni'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>{selectedMember.email}</span>
                    </div>
                    {selectedMember.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>{selectedMember.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Academic Information</p>
                  <div className="space-y-2">
                    {selectedMember.major && (
                      <div className="flex items-center gap-2 text-sm">
                        <Graduation className="h-4 w-4 text-primary" />
                        <span>{selectedMember.major}</span>
                      </div>
                    )}
                    {selectedMember.graduationYear && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Class of {selectedMember.graduationYear}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedMember.bio && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Bio</p>
                  <p className="text-sm">{selectedMember.bio}</p>
                </div>
              )}
              
              {selectedMember.socialLinks && Object.values(selectedMember.socialLinks).some(Boolean) && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Social Media</p>
                  <div className="flex gap-2">
                    {selectedMember.socialLinks.instagram && (
                      <a href={`https://instagram.com/${selectedMember.socialLinks.instagram}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-muted/80"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                    {selectedMember.socialLinks.linkedin && (
                      <a href={`https://linkedin.com/in/${selectedMember.socialLinks.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-muted/80"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {selectedMember.socialLinks.twitter && (
                      <a href={`https://twitter.com/${selectedMember.socialLinks.twitter}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-muted/80"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Members;
