
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Member } from './types';

interface MemberCardProps {
  member: Member;
  onOpenProfile: (member: Member) => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, onOpenProfile }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-subtle animate-scale-in">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" alt={member.name} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
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
        <CardTitle className="text-base mt-2">
          <button 
            className="hover:underline text-left" 
            onClick={() => onOpenProfile(member)}
          >
            {member.name}
          </button>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-normal">
            {member.role}
          </Badge>
          {member.status === 'alumni' && (
            <Badge variant="outline" className="font-normal text-muted-foreground">
              Alumni
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Joined {member.joinedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
