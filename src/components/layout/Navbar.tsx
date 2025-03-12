
import React from 'react';
import { Bell, ChevronDown, Search, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/auth');
  };

  const getInitials = () => {
    if (!user) return 'GU';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  const getUserDisplayName = () => {
    if (!user) return 'Guest User';
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-display text-xl font-bold text-primary transition-colors">
            OrgConnect
          </Link>
          <div className="hidden md:flex md:items-center md:gap-4">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link to="/members" className="text-sm font-medium transition-colors hover:text-primary">
              Members
            </Link>
            <Link to="/dues" className="text-sm font-medium transition-colors hover:text-primary">
              Dues
            </Link>
            <Link to="/fundraisers" className="text-sm font-medium transition-colors hover:text-primary">
              Fundraisers
            </Link>
            <Link to="/messages" className="text-sm font-medium transition-colors hover:text-primary">
              Messages
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden w-full max-w-sm md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-background pl-8 md:w-[240px] lg:w-[320px]"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 p-1" aria-label="Account menu">
                <Avatar className="h-8 w-8">
                  {user?.profilePicture ? (
                    <AvatarImage src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
                  ) : (
                    <AvatarFallback>{getInitials()}</AvatarFallback>
                  )}
                </Avatar>
                <span className="hidden text-sm font-medium md:inline-block">{getUserDisplayName()}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/organizations')}>
                  My Organizations
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
