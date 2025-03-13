import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Users } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface NewDirectMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: Member[];
  onCreateConversation: (selectedMembers: Member[], initialMessage: string, groupName?: string) => void;
}

const NewDirectMessageDialog = ({
  open,
  onOpenChange,
  members,
  onCreateConversation
}: NewDirectMessageDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [initialMessage, setInitialMessage] = useState('');
  const [groupName, setGroupName] = useState('');
  
  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleToggleMember = (member: Member) => {
    setSelectedMembers(prev => {
      // Check if member is already selected
      const isSelected = prev.some(m => m.id === member.id);
      
      if (isSelected) {
        // Remove from selection
        return prev.filter(m => m.id !== member.id);
      } else {
        // Add to selection
        return [...prev, member];
      }
    });
  };
  
  const handleRemoveSelected = (memberId: number) => {
    setSelectedMembers(prev => prev.filter(m => m.id !== memberId));
  };
  
  const handleCreateConversation = () => {
    if (selectedMembers.length > 0 && initialMessage.trim() !== '') {
      onCreateConversation(
        selectedMembers, 
        initialMessage,
        selectedMembers.length > 1 ? groupName : undefined
      );
      
      // Reset state
      setSelectedMembers([]);
      setSearchQuery('');
      setInitialMessage('');
      setGroupName('');
    }
  };

  const isGroupChat = selectedMembers.length > 1;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Direct Message</DialogTitle>
          <DialogDescription>
            Select members to start a conversation with. You can select multiple members to create a group chat.
          </DialogDescription>
        </DialogHeader>
        
        {/* Selected members */}
        {selectedMembers.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedMembers.map(member => (
              <Badge 
                key={member.id} 
                variant="secondary"
                className="flex items-center gap-2 py-1 pl-1 pr-2"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
                <button 
                  className="ml-1 text-muted-foreground hover:text-foreground" 
                  onClick={() => handleRemoveSelected(member.id)}
                >
                  ✕
                </button>
              </Badge>
            ))}
          </div>
        )}
        
        {/* Search input */}
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search members..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Members list */}
        <ScrollArea className="h-[200px] border rounded-md p-2">
          {filteredMembers.length > 0 ? (
            filteredMembers.map(member => (
              <div 
                key={member.id}
                className="flex items-center gap-3 p-2 hover:bg-accent rounded-md cursor-pointer"
                onClick={() => handleToggleMember(member)}
              >
                <Checkbox 
                  id={`member-${member.id}`}
                  checked={selectedMembers.some(m => m.id === member.id)}
                  onCheckedChange={() => handleToggleMember(member)}
                />
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full text-muted-foreground">
              No members found
            </div>
          )}
        </ScrollArea>
        
        {/* Group name input (now for 2+ members) */}
        {isGroupChat && (
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="group-name" className="text-sm font-medium">
                Group Chat Name (optional)
              </Label>
            </div>
            <Input
              id="group-name"
              placeholder="Enter a name for this group chat"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        )}
        
        {/* Initial message input - required */}
        <div className="space-y-2 mt-4">
          <Label htmlFor="initial-message" className="text-sm font-medium">
            Initial message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="initial-message"
            placeholder="Type your first message..."
            value={initialMessage}
            onChange={(e) => setInitialMessage(e.target.value)}
            className="min-h-[80px]"
          />
          {selectedMembers.length > 0 && initialMessage.trim() === '' && (
            <p className="text-xs text-destructive">An initial message is required</p>
          )}
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateConversation} 
            disabled={selectedMembers.length === 0 || initialMessage.trim() === ''}
          >
            Start Conversation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewDirectMessageDialog;
