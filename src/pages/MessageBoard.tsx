
import React, { useState } from 'react';
import { MessageSquare, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

import MessageCard from '@/components/messageBoard/MessageCard';
import CommentsDialog from '@/components/messageBoard/CommentsDialog';
import NewMessageDialog from '@/components/messageBoard/NewMessageDialog';
import { initialMessages } from '@/components/messageBoard/initialMessages';
import { Message } from '@/components/messageBoard/types';

const MessageBoard = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [newMessageCategory, setNewMessageCategory] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newComment, setNewComment] = useState('');

  const filteredMessages = messages.filter(message => {
    return message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
           message.author.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const handlePostMessage = () => {
    if (!newMessageContent.trim()) {
      toast.error('Please enter a message');
      return;
    }

    const newMessage: Message = {
      id: messages.length + 1,
      author: 'Jason Smith', // Current user
      role: 'President',
      avatar: '/placeholder.svg',
      content: newMessageContent,
      timestamp: 'Just now',
      likes: 0,
      comments: [],
      category: newMessageCategory,
      isPinned: false
    };

    setMessages([newMessage, ...messages]);
    setNewMessageContent('');
    setNewMessageOpen(false);
    toast.success('Message posted successfully');
  };

  const handleLike = (messageId: number) => {
    setMessages(
      messages.map(message =>
        message.id === messageId
          ? { ...message, likes: message.likes + 1 }
          : message
      )
    );
  };

  const handlePin = (messageId: number) => {
    setMessages(
      messages.map(message =>
        message.id === messageId
          ? { ...message, isPinned: !message.isPinned }
          : message
      )
    );
    toast.success('Message pin status updated');
  };

  const handleAddComment = () => {
    if (!selectedMessage || !newComment.trim()) return;
    
    const newCommentObj = {
      id: selectedMessage.comments.length + 1,
      author: 'Jason Smith', // Current user
      avatar: '/placeholder.svg',
      content: newComment,
      timestamp: 'Just now'
    };

    setMessages(messages.map(message => 
      message.id === selectedMessage.id 
        ? { 
            ...message, 
            comments: [...message.comments, newCommentObj],
          }
        : message
    ));

    setNewComment('');
    toast.success('Comment added successfully');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Message Board</h1>
          <p className="text-muted-foreground">
            Stay updated with announcements and discussions
          </p>
        </div>
        <NewMessageDialog 
          isOpen={newMessageOpen}
          onOpenChange={setNewMessageOpen}
          newMessageContent={newMessageContent}
          setNewMessageContent={setNewMessageContent}
          newMessageCategory={newMessageCategory}
          setNewMessageCategory={setNewMessageCategory}
          handlePostMessage={handlePostMessage}
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Input
            className="pl-8"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MessageSquare className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSearchQuery('')}>
              All Messages
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchQuery('announcement')}>
              Announcements
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchQuery('event')}>
              Events
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchQuery('question')}>
              Questions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchQuery('general')}>
              General
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-4 pt-4">
        {sortedMessages.length > 0 ? (
          sortedMessages.map((message) => (
            <MessageCard 
              key={message.id}
              message={message}
              onLike={() => handleLike(message.id)}
              onPin={() => handlePin(message.id)}
              onOpenComments={() => setSelectedMessage(message)}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">No messages found.</p>
        )}
      </div>

      <CommentsDialog 
        isOpen={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
        selectedMessage={selectedMessage}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
      />
    </div>
  );
};

export default MessageBoard;
