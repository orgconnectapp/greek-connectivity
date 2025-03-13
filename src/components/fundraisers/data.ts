
import { DollarSign, LineChart, Users } from 'lucide-react';

export type DonorType = {
  id: number;
  name: string;
  avatar: string;
  amount: number;
  date: string;
};

export type FundraiserType = {
  id: number;
  title: string;
  description: string;
  date: string;
  goal: number;
  raised: number;
  participants: number;
  status: 'active' | 'upcoming' | 'completed';
  image: string;
  donors: number[];
};

export const donors: DonorType[] = [
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

export const fundraisers: FundraiserType[] = [
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
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    donors: []
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
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    donors: []
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
    image: 'https://images.unsplash.com/photo-1516763296043-f676c1105999?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    donors: []
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
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=500',
    donors: []
  },
];

export const stats = [
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
