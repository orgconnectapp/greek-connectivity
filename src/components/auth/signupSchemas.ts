
import { z } from 'zod';

export const baseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  memberType: z.enum(['active', 'alumni']),
  major: z.string().optional(),
  currentYear: z.enum(['freshman', 'sophomore', 'junior', 'senior', 'graduate']).optional(),
  email: z.string().email("Invalid email").endsWith('.edu', "Must use a school email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  organization: z.string().min(1, "Organization is required"),
  profilePicture: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
