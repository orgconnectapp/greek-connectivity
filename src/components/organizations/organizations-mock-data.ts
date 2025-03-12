
import { Organization } from './OrganizationCard';

export const getMockOrganizations = (): Organization[] => {
  return [
    {
      id: '1',
      name: 'Alpha Beta Gamma',
      logo: '/placeholder.svg',
      description: 'Founded in 1906, Alpha Beta Gamma is committed to academic excellence and community service.',
      type: 'fraternity'
    },
    {
      id: '2',
      name: 'Delta Epsilon Zeta',
      logo: '/placeholder.svg',
      description: 'A progressive fraternity focused on leadership development and social justice advocacy.',
      type: 'fraternity'
    },
    {
      id: '3',
      name: 'Eta Theta Iota',
      logo: '/placeholder.svg',
      description: 'Known for strong alumni connections and professional development opportunities.',
      type: 'fraternity'
    },
    {
      id: '4',
      name: 'Kappa Lambda Mu',
      logo: '/placeholder.svg',
      description: 'A diverse sorority celebrating cultural awareness and women\'s empowerment.',
      type: 'sorority'
    },
    {
      id: '5',
      name: 'AXA Phi Alpha Zeta',
      logo: '/placeholder.svg',
      description: 'Our mission is to develop leaders through academic excellence, service to all, promotion of friendship and justice among members.',
      type: 'fraternity'
    },
    {
      id: '6',
      name: 'Nu Xi Omicron',
      logo: '/placeholder.svg',
      description: 'Focused on philanthropy and community engagement through various service initiatives.',
      type: 'sorority'
    }
  ];
};
