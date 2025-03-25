
export interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  joinedDate: string;
  status: 'active' | 'alumni';
  major?: string;
  graduationYear?: string;
  bio?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export type ViewType = 'grid' | 'list';
