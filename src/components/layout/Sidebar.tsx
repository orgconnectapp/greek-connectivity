
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  CreditCard, 
  LineChart, 
  MessageSquare, 
  LayoutDashboard, 
  ChevronLeft, 
  ChevronRight,
  Shield,
  Megaphone,
  Calendar,
  Share2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarNavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  isCollapsed: boolean;
}

const SidebarNavItem = ({ icon: Icon, label, href, isCollapsed }: SidebarNavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon className={cn(
        "h-5 w-5",
        isActive ? "text-primary" : "text-muted-foreground",
      )} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // This would typically come from an auth context
  // For now, we'll just check for admin access directly
  const hasAdminAccess = true; // This would be determined by the user's admin status
  
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };
  
  return (
    <aside className={cn(
      "group relative flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
      isCollapsed ? "w-[72px]" : "w-[240px]"
    )}>
      <div className="flex h-16 items-center border-b px-4">
        {!isCollapsed && (
          <Link to="/" className="font-display text-xl font-bold text-primary">
            OrgConnect
          </Link>
        )}
      </div>
      
      <div className="flex flex-col gap-1 p-2">
        <SidebarNavItem 
          icon={Megaphone} 
          label="Message Board" 
          href="/message-board" 
          isCollapsed={isCollapsed} 
        />
        <SidebarNavItem 
          icon={LayoutDashboard} 
          label="Dashboard" 
          href="/dashboard" 
          isCollapsed={isCollapsed} 
        />
        <SidebarNavItem 
          icon={Calendar} 
          label="Calendar" 
          href="/calendar" 
          isCollapsed={isCollapsed} 
        />
        <SidebarNavItem 
          icon={Users} 
          label="Members" 
          href="/members" 
          isCollapsed={isCollapsed} 
        />
        <SidebarNavItem 
          icon={CreditCard} 
          label="Dues" 
          href="/dues" 
          isCollapsed={isCollapsed} 
        />
        <SidebarNavItem 
          icon={LineChart} 
          label="Fundraisers" 
          href="/fundraisers" 
          isCollapsed={isCollapsed} 
        />
        <SidebarNavItem 
          icon={MessageSquare} 
          label="Messages" 
          href="/messages" 
          isCollapsed={isCollapsed} 
        />
        
        {hasAdminAccess && (
          <SidebarNavItem 
            icon={Shield} 
            label="Admin" 
            href="/admin" 
            isCollapsed={isCollapsed} 
          />
        )}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
      
      <div className="mt-auto p-4">
        {!isCollapsed && (
          <div className="rounded-lg bg-secondary p-4 text-xs text-muted-foreground">
            <p className="font-medium">Alpha Phi Omega</p>
            <p className="mt-1">Spring 2024</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
