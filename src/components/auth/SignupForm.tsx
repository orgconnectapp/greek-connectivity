
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, User, School, Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ProfilePictureUpload from './ProfilePictureUpload';

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").endsWith('.edu', "Please use your school email (.edu)"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
  profilePicture: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
  });

  const handleProfilePictureChange = (base64: string) => {
    setPreviewUrl(base64);
    signupForm.setValue('profilePicture', base64);
  };

  const onSignupSubmit = async (data: SignupFormValues) => {
    try {
      await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        profilePicture: data.profilePicture,
      });
      
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
      navigate("/organizations");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please check your information and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
      <CardContent className="space-y-4">
        <ProfilePictureUpload 
          previewUrl={previewUrl} 
          onChange={handleProfilePictureChange} 
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="firstName" 
                placeholder="John" 
                className="pl-10" 
                {...signupForm.register("firstName")} 
              />
            </div>
            {signupForm.formState.errors.firstName && (
              <p className="text-sm text-destructive">{signupForm.formState.errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="lastName" 
                placeholder="Doe" 
                className="pl-10" 
                {...signupForm.register("lastName")} 
              />
            </div>
            {signupForm.formState.errors.lastName && (
              <p className="text-sm text-destructive">{signupForm.formState.errors.lastName.message}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">School Email</Label>
          <div className="relative">
            <School className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="email" 
              placeholder="you@university.edu" 
              className="pl-10" 
              {...signupForm.register("email")} 
            />
          </div>
          {signupForm.formState.errors.email && (
            <p className="text-sm text-destructive">{signupForm.formState.errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="phoneNumber" 
              placeholder="(555) 555-5555" 
              className="pl-10" 
              {...signupForm.register("phoneNumber")} 
            />
          </div>
          {signupForm.formState.errors.phoneNumber && (
            <p className="text-sm text-destructive">{signupForm.formState.errors.phoneNumber.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="pl-10" 
              {...signupForm.register("password")} 
            />
          </div>
          {signupForm.formState.errors.password && (
            <p className="text-sm text-destructive">{signupForm.formState.errors.password.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="confirmPassword" 
              type="password" 
              placeholder="••••••••" 
              className="pl-10" 
              {...signupForm.register("confirmPassword")} 
            />
          </div>
          {signupForm.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive">{signupForm.formState.errors.confirmPassword.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create Account"} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignupForm;
