
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquarePlus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Conversation } from './types';

interface ConversationsListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation) => void;
  onNewDirectMessage: () => void;
}

const ConversationsList = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
  onNewDirectMessage
}: ConversationsListProps) => {
  return (
    <div className="w-full max-w-xs border-r">
      <div className="flex h-14 items-center justify-between border-b px-4">
        <h2 className="font-medium">Messages</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={onNewDirectMessage}
        >
          <MessageSquarePlus className="h-4 w-4" />
          New Direct Message
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-1 p-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              className={cn(
                "w-full rounded-lg p-2 text-left transition-colors",
                selectedConversation?.id === conversation.id
                  ? "bg-accent"
                  : "hover:bg-muted"
              )}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>
                      {conversation.isGroup 
                        ? 'GR' 
                        : conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                  )}
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{conversation.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm text-muted-foreground">
                      {conversation.lastMessage || conversation.role}
                    </span>
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="ml-auto h-5 w-5 justify-center rounded-full p-0">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationsList;
