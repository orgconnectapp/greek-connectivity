
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Member } from '@/components/members/types';
import { MemberFilters } from '@/components/members/MemberFilters';
import { MembersViewToggle } from '@/components/members/MembersViewToggle';
import { MembersList } from '@/components/members/MembersList';
import { MemberProfile } from '@/components/members/MemberProfile';
import InviteMemberDialog from '@/components/members/InviteMemberDialog';

// Sample member data (in a real app, this would come from an API)
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
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
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
        <MemberFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        <div className="flex items-center gap-2">
          <MembersViewToggle 
            viewType={viewType} 
            setViewType={setViewType} 
          />
          <Button className="gap-2" onClick={() => setInviteDialogOpen(true)}>
            <UserPlus className="h-4 w-4" />
            <span>Invite Member</span>
          </Button>
        </div>
      </div>
      
      <MembersList 
        members={filteredMembers}
        viewType={viewType}
        onOpenProfile={handleOpenProfile}
      />
      
      <MemberProfile
        isOpen={!!selectedMember}
        onOpenChange={(open) => !open && setSelectedMember(null)}
        member={selectedMember}
      />
      
      <InviteMemberDialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen} />
    </div>
  );
};

export default Members;
