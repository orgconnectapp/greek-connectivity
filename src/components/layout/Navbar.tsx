
import React from 'react';
import { Bell, ChevronDown, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

// Define main navigation items
const navItems = [
  { label: 'Message Board', path: '/message-board' },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Members', path: '/members' },
  { label: 'Dues', path: '/dues' },
  { label: 'Fundraisers', path: '/fundraisers' },
  { label: 'Messages', path: '/messages' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Check if a navigation item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavigateToSettings = () => {
    navigate('/profile?tab=settings');
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-display text-xl font-bold text-primary transition-colors">
            OrgConnect
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <NavigationMenuLink asChild>
                    <Link 
                      to={item.path} 
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        isActive(item.path)
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
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
                <DropdownMenuItem onClick={handleNavigateToSettings}>Settings</DropdownMenuItem>
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
