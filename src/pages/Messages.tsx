import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Paperclip,
  Smile,
  MessageSquarePlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import NewDirectMessageDialog from '@/components/messages/NewDirectMessageDialog';

const conversations = [
  {
    id: 1,
    name: 'Emma Johnson',
    role: 'Vice President',
    lastMessage: 'Can we discuss the budget for the Spring Gala?',
    timestamp: '2:30 PM',
    unread: 2,
    online: true,
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Michael Brown',
    role: 'Treasurer',
    lastMessage: 'I just sent you the financial report for this month.',
    timestamp: '11:15 AM',
    unread: 0,
    online: true,
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Sophia Garcia',
    role: 'Secretary',
    lastMessage: 'Meeting minutes have been uploaded to the drive.',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
    avatar: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Alex Williams',
    role: 'Event Coordinator',
    lastMessage: 'We need to finalize the venue by tomorrow.',
    timestamp: 'Yesterday',
    unread: 1,
    online: false,
    avatar: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Events Committee',
    role: 'Group • 8 members',
    lastMessage: 'Maya: Let\'s meet at 5pm tomorrow.',
    timestamp: 'Monday',
    unread: 0,
    online: false,
    avatar: '/placeholder.svg',
    isGroup: true
  }
];

const messages = [
  {
    id: 1,
    senderId: 2,
    content: "Hi Jason, can we discuss the budget for the Spring Gala?",
    timestamp: "2:30 PM",
    read: true
  },
  {
    id: 2,
    senderId: 1,
    content: "Sure, what do you want to discuss specifically?",
    timestamp: "2:32 PM",
    read: true
  },
  {
    id: 3,
    senderId: 2,
    content: "I think we need to increase the budget for decorations. The venue is larger than last year's.",
    timestamp: "2:33 PM",
    read: true
  },
  {
    id: 4,
    senderId: 1,
    content: "How much more do you think we need?",
    timestamp: "2:35 PM",
    read: true
  },
  {
    id: 5,
    senderId: 2,
    content: "I was thinking an additional $500 would be sufficient. That would bring our total decoration budget to $1,500.",
    timestamp: "2:36 PM",
    read: false
  },
  {
    id: 6,
    senderId: 2,
    content: "I've created a detailed breakdown of how we'd use those funds if you want to see it.",
    timestamp: "2:36 PM",
    read: false
  }
];

const members = [
  {
    id: 1,
    name: 'Emma Johnson',
    role: 'Vice President',
    avatar: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Michael Brown',
    role: 'Treasurer',
    avatar: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Sophia Garcia',
    role: 'Secretary',
    avatar: '/placeholder.svg'
  },
  {
    id: 4,
    name: 'Alex Williams',
    role: 'Event Coordinator',
    avatar: '/placeholder.svg'
  },
  {
    id: 5,
    name: 'Maya Rodriguez',
    role: 'Member',
    avatar: '/placeholder.svg'
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'Member',
    avatar: '/placeholder.svg'
  }
];

const Messages = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [allConversations, setAllConversations] = useState(conversations);
  const [newDirectMessageOpen, setNewDirectMessageOpen] = useState(false);
  
  useEffect(() => {
    if (location.state?.openConversation) {
      const { id, name } = location.state.openConversation;
      
      let conversation = allConversations.find(c => 
        c.name.toLowerCase() === name.toLowerCase()
      );
      
      if (conversation) {
        setSelectedConversation(conversation);
        toast({
          title: `Conversation with ${name}`,
          description: "Ready to chat!",
        });
      } else {
        const newConversation = {
          id: allConversations.length + 1,
          name: name,
          role: 'Member',
          lastMessage: '',
          timestamp: 'Just now',
          unread: 0,
          online: false,
          avatar: '/placeholder.svg'
        };
        
        setAllConversations(prev => [newConversation, ...prev]);
        setSelectedConversation(newConversation);
        
        toast({
          title: `New conversation with ${name}`,
          description: "Start chatting now!",
        });
      }
    }
  }, [location.state, allConversations]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      senderId: 1,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    };
    
    const updatedConversations = allConversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: 'Just now'
        };
      }
      return conv;
    });
    
    setAllConversations(updatedConversations);
    setNewMessage('');
    
    toast({
      title: `Message sent`,
      description: "Your message has been sent successfully.",
    });
  };
  
  const handleCreateNewDirectMessage = (selectedMembers) => {
    const isGroup = selectedMembers.length > 1;
    
    let name = '';
    if (isGroup) {
      if (selectedMembers.length <= 2) {
        name = selectedMembers.map(m => m.name).join(' & ');
      } else {
        name = `${selectedMembers[0].name}, ${selectedMembers[1].name} & ${selectedMembers.length - 2} others`;
      }
    } else {
      name = selectedMembers[0].name;
    }
    
    const newConversation = {
      id: Date.now(),
      name: name,
      role: isGroup ? `Group • ${selectedMembers.length} members` : selectedMembers[0].role,
      lastMessage: '',
      timestamp: 'Just now',
      unread: 0,
      online: false,
      avatar: isGroup ? '/placeholder.svg' : selectedMembers[0].avatar,
      isGroup: isGroup,
      members: selectedMembers
    };
    
    setAllConversations(prev => [newConversation, ...prev]);
    setSelectedConversation(newConversation);
    
    toast({
      title: isGroup ? "Group chat created" : "Conversation started",
      description: `You can now send messages to ${isGroup ? 'the group' : name}.`,
    });
    
    setNewDirectMessageOpen(false);
  };
  
  return (
    <div className="h-[calc(100vh-10rem)] overflow-hidden rounded-lg border bg-background shadow-sm animate-fade-in">
      <div className="flex h-full">
        <div className="w-full max-w-xs border-r">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <h2 className="font-medium">Messages</h2>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setNewDirectMessageOpen(true)}>
              <MessageSquarePlus className="h-4 w-4" />
              New Direct Message
            </Button>
          </div>
          
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search conversations..." 
                className="pl-8" 
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-13rem)]">
            <div className="space-y-1 p-2">
              {allConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className={cn(
                    "w-full rounded-lg p-2 text-left transition-colors",
                    selectedConversation.id === conversation.id
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
                          {conversation.role}
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
        
        <div className="flex flex-1 flex-col">
          {selectedConversation ? (
            <>
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
                  <div>
                    <div className="font-medium">{selectedConversation.name}</div>
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
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <NewDirectMessageDialog 
        open={newDirectMessageOpen}
        onOpenChange={setNewDirectMessageOpen}
        members={members}
        onCreateConversation={handleCreateNewDirectMessage}
      />
    </div>
  );
};

export default Messages;
