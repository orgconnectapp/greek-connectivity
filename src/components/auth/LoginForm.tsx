
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, AtSign, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email("Invalid email address").endsWith('.edu', "Please use your school email (.edu)"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/organizations");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">School Email</Label>
          <div className="relative">
            <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="email" 
              placeholder="you@university.edu" 
              className="pl-10" 
              {...loginForm.register("email")} 
            />
          </div>
          {loginForm.formState.errors.email && (
            <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
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
              {...loginForm.register("password")} 
            />
          </div>
          {loginForm.formState.errors.password && (
            <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
