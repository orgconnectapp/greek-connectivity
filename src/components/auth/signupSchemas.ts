
import { z } from 'zod';

export const baseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  memberType: z.enum(['active', 'alumni']),
  schoolEmail: z.string().email("Invalid email").endsWith('.edu', "Must use a school email").optional(),
  personalEmail: z.string().email("Invalid email").optional(),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  initiationSemester: z.enum(['fall', 'spring']).optional(),
  initiationYear: z.string().optional(),
  memberId: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  birthDate: z.string().optional(),
  major: z.string().optional(),
  currentYear: z.enum(['freshman', 'sophomore', 'junior', 'senior', 'graduate']).optional(),
  email: z.string().email("Invalid email").endsWith('.edu', "Must use a school email"),
  organization: z.string().min(1, "Organization is required"),
  profilePicture: z.string().optional(),
  linkedIn: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  university: z.string().optional(),
});

export type SignupFormData = z.infer<typeof baseSchema>;

// Mock data for organizations (in a real app, this would come from an API)
export const MOCK_ORGANIZATIONS = [
  'Alpha Phi Alpha',
  'Delta Sigma Theta',
  'Kappa Alpha Psi',
  'Omega Psi Phi',
  'Phi Beta Sigma',
  'Zeta Phi Beta',
  'Sigma Gamma Rho',
  'Iota Phi Theta'
];

// Mock universities
export const MOCK_UNIVERSITIES = [
  'Howard University',
  'Spelman College',
  'Morehouse College',
  'Hampton University',
  'Florida A&M University',
  'North Carolina A&T State University',
  'Xavier University of Louisiana',
  'Tuskegee University'
];

// Mock function to get organizations by university
export const getOrganizationsByUniversity = (university: string): string[] => {
  // In a real app, this would fetch from an API based on the university
  // For now, we'll just return the mock organizations
  return MOCK_ORGANIZATIONS;
};
