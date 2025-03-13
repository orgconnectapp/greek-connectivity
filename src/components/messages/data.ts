
import { Conversation } from './types';
import { Member } from './NewDirectMessageDialog';

export const initialConversations: Conversation[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    role: 'Vice President',
    lastMessage: 'Can we discuss the budget for the Spring Gala?',
    timestamp: '2:30 PM',
    unread: 2,
    online: true,
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Michael Brown',
    role: 'Treasurer',
    lastMessage: 'I just sent you the financial report for this month.',
    timestamp: '11:15 AM',
    unread: 0,
    online: true,
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Sophia Garcia',
    role: 'Secretary',
    lastMessage: 'Meeting minutes have been uploaded to the drive.',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
    avatar: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Alex Williams',
    role: 'Event Coordinator',
    lastMessage: 'We need to finalize the venue by tomorrow.',
    timestamp: 'Yesterday',
    unread: 1,
    online: false,
    avatar: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Events Committee',
    role: 'Group • 8 members',
    lastMessage: 'Maya: Let\'s meet at 5pm tomorrow.',
    timestamp: 'Monday',
    unread: 0,
    online: false,
    avatar: '/placeholder.svg',
    isGroup: true
  }
];

export const initialMessages = [
  {
    id: 1,
    senderId: 2,
    content: "Hi Jason, can we discuss the budget for the Spring Gala?",
    timestamp: "2:30 PM",
    read: true
  },
  {
    id: 2,
    senderId: 1,
    content: "Sure, what do you want to discuss specifically?",
    timestamp: "2:32 PM",
    read: true
  },
  {
    id: 3,
    senderId: 2,
    content: "I think we need to increase the budget for decorations. The venue is larger than last year's.",
    timestamp: "2:33 PM",
    read: true
  },
  {
    id: 4,
    senderId: 1,
    content: "How much more do you think we need?",
    timestamp: "2:35 PM",
    read: true
  },
  {
    id: 5,
    senderId: 2,
    content: "I was thinking an additional $500 would be sufficient. That would bring our total decoration budget to $1,500.",
    timestamp: "2:36 PM",
    read: false
  },
  {
    id: 6,
    senderId: 2,
    content: "I've created a detailed breakdown of how we'd use those funds if you want to see it.",
    timestamp: "2:36 PM",
    read: false
  }
];

export const availableMembers: Member[] = [
  {
    id: 1,
    name: 'Emma Johnson',
    role: 'Vice President',
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Michael Brown',
    role: 'Treasurer',
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Sophia Garcia',
    role: 'Secretary',
    avatar: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Alex Williams',
    role: 'Event Coordinator',
    avatar: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Maya Rodriguez',
    role: 'Member',
    avatar: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'Member',
    avatar: '/placeholder.svg'
  }
];
