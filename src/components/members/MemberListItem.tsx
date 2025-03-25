
import React from 'react';
import { Mail, Phone, Calendar, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Member } from './types';

interface MemberListItemProps {
  member: Member;
  onOpenProfile: (member: Member) => void;
}

export const MemberListItem: React.FC<MemberListItemProps> = ({ 
  member, 
  onOpenProfile 
}) => {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_auto] p-4 items-center animate-fade-up">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt={member.name} />
          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">
            <button 
              className="hover:underline text-left" 
              onClick={() => onOpenProfile(member)}
            >
              {member.name}
            </button>
          </p>
          <Badge variant="secondary" className="mt-1 font-normal text-xs">
            {member.role}
          </Badge>
          {member.status === 'alumni' && (
            <Badge variant="outline" className="ml-1 mt-1 font-normal text-xs">
              Alumni
            </Badge>
          )}
        </div>
      </div>
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-3 w-3" />
          <span>{member.email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-3 w-3" />
          <span>{member.phone}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>{member.joinedDate}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Mail className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onOpenProfile(member)}>View Profile</DropdownMenuItem>
            <DropdownMenuItem>Send Message</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
