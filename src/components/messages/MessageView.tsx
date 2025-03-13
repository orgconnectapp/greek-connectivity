
import React from 'react';
import { MoreVertical, Send, Paperclip, Smile, Pencil } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Conversation } from './types';
import { initialMessages } from './data';

interface MessageViewProps {
  selectedConversation: Conversation;
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  onRenameGroup: () => void;
}

const MessageView = ({
  selectedConversation,
  newMessage,
  setNewMessage,
  handleSendMessage,
  onRenameGroup
}: MessageViewProps) => {
  const messages = initialMessages; // This would be dynamic in a real application
  
  const canRenameGroup = selectedConversation?.isGroup && 
    selectedConversation?.members && 
    selectedConversation.members.length >= 3;
  
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
            <AvatarFallback>
              {selectedConversation.isGroup 
                ? 'GR' 
                : selectedConversation.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <div className="font-medium">{selectedConversation.name}</div>
            {canRenameGroup && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={onRenameGroup}
              >
                <Pencil className="h-3 w-3" />
              </Button>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {selectedConversation.online 
                ? <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Online
                  </span> 
                : 'Offline'}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
              <DropdownMenuItem>Search Messages</DropdownMenuItem>
              <DropdownMenuItem>Block</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              Today
            </Badge>
          </div>
          
          {messages.map((message) => {
            const isUserMessage = message.senderId === 1;
            
            return (
              <div 
                key={message.id}
                className={cn(
                  "flex gap-2",
                  isUserMessage ? "justify-end" : "justify-start"
                )}
              >
                {!isUserMessage && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                    <AvatarFallback>
                      {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div 
                  className={cn(
                    "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                    isUserMessage 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}
                >
                  {message.content}
                  <div 
                    className={cn(
                      "mt-1 text-right text-xs",
                      isUserMessage 
                        ? "text-primary-foreground/80" 
                        : "text-muted-foreground"
                    )}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input 
            placeholder="Type a message..." 
            className="flex-1"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Smile className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            className="h-8 w-8" 
            disabled={!newMessage}
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
