
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ImagePlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock data for organizations (in a real app, this would come from an API)
const MOCK_ORGANIZATIONS = [
  'Alpha Phi Alpha',
  'Delta Sigma Theta',
  'Kappa Alpha Psi',
  'Omega Psi Phi',
  'Phi Beta Sigma',
  'Zeta Phi Beta',
  'Sigma Gamma Rho',
  'Iota Phi Theta'
];

const baseSchema = z.object({
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

type SignupFormData = z.infer<typeof baseSchema>;

export const SignupSteps = () => {
  const [step, setStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const { signup } = useAuth();
  
  const form = useForm<SignupFormData>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      memberType: 'active',
      email: '',
      phoneNumber: '',
      major: '',
      currentYear: 'freshman',
      organization: '',
      profilePicture: '',
      password: '',
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        form.setValue('profilePicture', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Ensure all required fields are present (TypeScript validation only, actual values are validated by Zod)
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        organization: data.organization,
        password: data.password,
        memberType: data.memberType,
        major: data.major || '',
        currentYear: data.currentYear || 'freshman',
        profilePicture: data.profilePicture || '',
      };
      
      await signup(userData);
      toast({
        title: "Request Submitted",
        description: "Your request to join the organization has been submitted. You will receive access once approved.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...form.register("firstName")}
                placeholder="Enter your first name"
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...form.register("lastName")}
                placeholder="Enter your last name"
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
              )}
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                if (form.getValues('firstName') && form.getValues('lastName')) {
                  nextStep();
                } else {
                  form.trigger(['firstName', 'lastName']);
                }
              }}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <Label>Member Type</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant={form.getValues('memberType') === 'active' ? 'default' : 'outline'}
                onClick={() => form.setValue('memberType', 'active')}
                className="w-full"
              >
                Active
              </Button>
              <Button
                type="button"
                variant={form.getValues('memberType') === 'alumni' ? 'default' : 'outline'}
                onClick={() => form.setValue('memberType', 'alumni')}
                className="w-full"
              >
                Alumni
              </Button>
            </div>
            <Button className="w-full" onClick={nextStep}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">School Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="you@university.edu"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                {...form.register("phoneNumber")}
                placeholder="(555) 555-5555"
              />
              {form.formState.errors.phoneNumber && (
                <p className="text-sm text-red-500">{form.formState.errors.phoneNumber.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                {...form.register("major")}
                placeholder="Enter your major"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentYear">Current Year</Label>
              <Select
                onValueChange={(value) => form.setValue('currentYear', value as SignupFormData['currentYear'])}
                defaultValue={form.getValues('currentYear')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="freshman">Freshman</SelectItem>
                  <SelectItem value="sophomore">Sophomore</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="graduate">Graduate Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                if (form.getValues('email') && form.getValues('phoneNumber')) {
                  nextStep();
                } else {
                  form.trigger(['email', 'phoneNumber']);
                }
              }}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-2 border-primary overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <ImagePlus className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-picture"
                />
                <label
                  htmlFor="profile-picture"
                  className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <ImagePlus className="h-4 w-4" />
                </label>
              </div>
              <p className="text-sm text-muted-foreground">Add a profile picture (optional)</p>
            </div>
            <Button className="w-full" onClick={nextStep}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Select
                onValueChange={(value) => form.setValue('organization', value)}
                defaultValue={form.getValues('organization')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an organization" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_ORGANIZATIONS.map((org) => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.organization && (
                <p className="text-sm text-red-500">{form.formState.errors.organization.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password")}
                placeholder="Create a password"
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>
            <Button 
              className="w-full"
              onClick={form.handleSubmit(onSubmit)}
            >
              Request Access
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Create an account</h2>
        <p className="text-sm text-muted-foreground">
          Step {step} of 5: {
            step === 1 ? "Personal Information" :
            step === 2 ? "Member Type" :
            step === 3 ? "Contact & Academic Information" :
            step === 4 ? "Profile Picture" :
            "Organization Selection"
          }
        </p>
      </div>
      {renderStep()}
    </div>
  );
};
