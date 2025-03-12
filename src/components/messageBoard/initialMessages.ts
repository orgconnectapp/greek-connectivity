
export const initialMessages = [
  {
    id: 1,
    author: 'Emma Johnson',
    role: 'Vice President',
    avatar: '/placeholder.svg',
    content: 'The chapter meeting this week will be held in Room 202 instead of our usual location. Please arrive 10 minutes early as we have a guest speaker from the national organization.',
    timestamp: '2 hours ago',
    likes: 12,
    comments: [
      {
        id: 1,
        author: 'Michael Brown',
        avatar: '/placeholder.svg',
        content: 'Will the meeting be recorded for those who cannot attend?',
        timestamp: '1 hour ago'
      },
      {
        id: 2,
        author: 'Sophia Garcia',
        avatar: '/placeholder.svg',
        content: 'Thanks for the heads up! Looking forward to the guest speaker.',
        timestamp: '30 minutes ago'
      }
    ],
    category: 'Announcements',
    isPinned: true
  },
  {
    id: 2,
    author: 'Michael Brown',
    role: 'Treasurer',
    avatar: '/placeholder.svg',
    content: 'A reminder that dues for this semester must be paid by next Friday. Please see me if you need to make arrangements for a payment plan.',
    timestamp: '5 hours ago',
    likes: 8,
    comments: [
      {
        id: 1,
        author: 'Jason Smith',
        avatar: '/placeholder.svg',
        content: 'Is there a way to check our current payment status online?',
        timestamp: '4 hours ago'
      },
      {
        id: 2,
        author: 'Emma Johnson',
        avatar: '/placeholder.svg',
        content: 'I'll be in the chapter room from 3-5pm tomorrow if anyone needs help.',
        timestamp: '3 hours ago'
      }
    ],
    category: 'Announcements',
    isPinned: false
  },
  {
    id: 3,
    author: 'Sophia Garcia',
    role: 'Service Chair',
    avatar: '/placeholder.svg',
    content: 'Our beach cleanup event is scheduled for this Saturday at 9am. Sign-up sheet is on the door of the chapter room. We need at least 15 volunteers!',
    timestamp: '1 day ago',
    likes: 15,
    comments: [
      {
        id: 1,
        author: 'Jason Smith',
        avatar: '/placeholder.svg',
        content: 'What supplies should we bring?',
        timestamp: '20 hours ago'
      },
      {
        id: 2,
        author: 'Michael Brown',
        avatar: '/placeholder.svg',
        content: 'I signed up and am bringing three friends!',
        timestamp: '15 hours ago'
      }
    ],
    category: 'Events',
    isPinned: false
  },
  {
    id: 4,
    author: 'Jason Smith',
    role: 'President',
    avatar: '/placeholder.svg',
    content: 'Congratulations to everyone who helped with the fundraiser last weekend! We raised over $2,000 for our philanthropy partner, exceeding our goal by 25%.',
    timestamp: '2 days ago',
    likes: 24,
    comments: [
      {
        id: 1,
        author: 'Emma Johnson',
        avatar: '/placeholder.svg',
        content: 'Great job everyone! This is a new record for us.',
        timestamp: '1 day ago'
      },
      {
        id: 2,
        author: 'Sophia Garcia',
        avatar: '/placeholder.svg',
        content: 'The social media posts were a huge help in getting donations.',
        timestamp: '1 day ago'
      }
    ],
    category: 'General',
    isPinned: false
  }
];
