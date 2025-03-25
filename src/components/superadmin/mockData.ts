
// Mock organization data
export const organizations = [
  {
    id: '1',
    name: 'Lambda Chi Alpha',
    chapter: 'Phi Alpha Zeta',
    members: 45,
    activeStatus: 'active',
    billingStatus: 'current',
    lastPayment: '2024-03-15',
    subscription: 'Professional',
    createdAt: '2022-05-10',
  },
  {
    id: '2',
    name: 'Alpha Phi Omega',
    chapter: 'Nu Gamma',
    members: 38,
    activeStatus: 'active',
    billingStatus: 'current',
    lastPayment: '2024-03-02',
    subscription: 'Basic',
    createdAt: '2023-01-15',
  },
  {
    id: '3',
    name: 'Delta Sigma Phi',
    chapter: 'Alpha Beta',
    members: 52,
    activeStatus: 'active',
    billingStatus: 'overdue',
    lastPayment: '2023-12-10',
    subscription: 'Professional',
    createdAt: '2021-09-22',
  },
  {
    id: '4',
    name: 'Kappa Alpha Theta',
    chapter: 'Beta Lambda',
    members: 61,
    activeStatus: 'suspended',
    billingStatus: 'overdue',
    lastPayment: '2023-11-05',
    subscription: 'Enterprise',
    createdAt: '2022-02-18',
  },
  {
    id: '5',
    name: 'Sigma Chi',
    chapter: 'Gamma Epsilon',
    members: 47,
    activeStatus: 'active',
    billingStatus: 'current',
    lastPayment: '2024-02-28',
    subscription: 'Enterprise',
    createdAt: '2021-08-30',
  }
];

// Mock global users data
export const globalUsers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Admin',
    organization: 'Lambda Chi Alpha',
    lastLogin: '2024-05-10T14:30:00',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Admin',
    organization: 'Alpha Phi Omega',
    lastLogin: '2024-05-09T10:15:00',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Robert Miller',
    email: 'robert.miller@example.com',
    role: 'Admin',
    organization: 'Delta Sigma Phi',
    lastLogin: '2024-05-08T16:45:00',
    status: 'suspended',
    joinDate: '2022-11-05',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    role: 'Member',
    organization: 'Kappa Alpha Theta',
    lastLogin: '2024-05-07T09:20:00',
    status: 'active',
    joinDate: '2023-03-10',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'Member',
    organization: 'Sigma Chi',
    lastLogin: '2024-05-06T11:30:00',
    status: 'active',
    joinDate: '2023-04-25',
  }
];

// Mock billing data
export const billingData = [
  {
    id: '1',
    organization: 'Lambda Chi Alpha',
    plan: 'Professional',
    amount: '$149.99/month',
    lastPayment: '2024-05-15',
    nextPayment: '2024-06-15',
    status: 'current',
    paymentMethod: 'Visa ending in 4242',
  },
  {
    id: '2',
    organization: 'Alpha Phi Omega',
    plan: 'Basic',
    amount: '$89.99/month',
    lastPayment: '2024-05-02',
    nextPayment: '2024-06-02',
    status: 'current',
    paymentMethod: 'Mastercard ending in 8888',
  },
  {
    id: '3',
    organization: 'Delta Sigma Phi',
    plan: 'Professional',
    amount: '$149.99/month',
    lastPayment: '2023-12-10',
    nextPayment: '2024-01-10',
    status: 'overdue',
    paymentMethod: 'American Express ending in 1234',
  },
  {
    id: '4',
    organization: 'Kappa Alpha Theta',
    plan: 'Enterprise',
    amount: '$299.99/month',
    lastPayment: '2023-11-05',
    nextPayment: '2023-12-05',
    status: 'overdue',
    paymentMethod: 'Discover ending in 5678',
  },
  {
    id: '5',
    organization: 'Sigma Chi',
    plan: 'Enterprise',
    amount: '$299.99/month',
    lastPayment: '2024-04-28',
    nextPayment: '2024-05-28',
    status: 'current',
    paymentMethod: 'Visa ending in 9876',
  }
];

// System settings data
export const systemSettings = [
  {
    category: 'Security',
    settings: [
      { name: 'Two-Factor Authentication', status: 'Enabled', description: 'Require 2FA for all admin users' },
      { name: 'Password Policy', status: 'Strict', description: 'Minimum 12 characters with special characters' },
      { name: 'Session Timeout', status: '30 minutes', description: 'Auto-logout after inactivity period' }
    ]
  },
  {
    category: 'Email',
    settings: [
      { name: 'SMTP Configuration', status: 'Configured', description: 'Using SendGrid API' },
      { name: 'Email Templates', status: '12 Active', description: 'Notification and onboarding templates' },
      { name: 'Daily Email Limit', status: '10,000', description: 'Maximum emails per day' }
    ]
  },
  {
    category: 'Features',
    settings: [
      { name: 'Payment Processing', status: 'Enabled', description: 'Stripe integration active' },
      { name: 'Calendar Integration', status: 'Enabled', description: 'Google Calendar sync available' },
      { name: 'File Storage', status: 'Enabled', description: '5GB per organization limit' }
    ]
  },
  {
    category: 'System Health',
    settings: [
      { name: 'Database Backups', status: 'Daily', description: 'Automatic backups at 2:00 AM UTC' },
      { name: 'Performance Monitoring', status: 'Active', description: 'New Relic integration' },
      { name: 'Error Logging', status: 'Enabled', description: 'Sentry.io integration' }
    ]
  }
];
