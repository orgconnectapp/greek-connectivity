
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Calendar, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import { Member } from './types';
import { useToast } from '@/hooks/use-toast';

interface MemberProfileProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
}

export const MemberProfile: React.FC<MemberProfileProps> = ({ 
  isOpen, 
  onOpenChange, 
  member 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMessageMember = (member: Member) => {
    onOpenChange(false);
    toast({
      title: `Messaging ${member.name}`,
      description: "Opening conversation...",
    });
    navigate('/messages', { 
      state: { 
        openConversation: {
          id: member.id,
          name: member.name
        } 
      } 
    });
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Member Profile</DialogTitle>
          <DialogDescription>
            View detailed information about this member
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt={member.name} />
              <AvatarFallback className="text-lg">
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <Badge variant="secondary">
                  {member.role}
                </Badge>
                <Badge variant={member.status === 'active' ? 'default' : 'outline'}>
                  {member.status === 'active' ? 'Active Member' : 'Alumni'}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Contact Information</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{member.phone}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Academic Information</p>
              <div className="space-y-2">
                {member.major && (
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <span>{member.major}</span>
                  </div>
                )}
                {member.graduationYear && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Class of {member.graduationYear}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button onClick={() => handleMessageMember(member)}>
              <Mail className="mr-2 h-4 w-4" />
              Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
