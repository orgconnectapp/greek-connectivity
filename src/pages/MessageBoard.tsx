import React, { useState } from 'react';
import { 
  PlusCircle, 
  MessageSquare, 
  ThumbsUp, 
  MessageCircle, 
  Clock, 
  Filter,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const initialMessages = [
  {
    id: 1,
    author: 'Emma Johnson',
    role: 'Vice President',
    avatar: '/placeholder.svg',
    content: 'The chapter meeting this week will be held in Room 202 instead of our usual location. Please arrive 10 minutes early as we have a guest speaker from the national organization.',
    timestamp: '2 hours ago',
    likes: 12,
    comments: [
      {
        id: 1,
        author: 'Michael Brown',
        avatar: '/placeholder.svg',
        content: 'Will the meeting be recorded for those who cannot attend?',
        timestamp: '1 hour ago'
      },
      {
        id: 2,
        author: 'Sophia Garcia',
        avatar: '/placeholder.svg',
        content: 'Thanks for the heads up! Looking forward to the guest speaker.',
        timestamp: '30 minutes ago'
      }
    ],
    category: 'Announcements',
    isPinned: true
  },
  {
    id: 2,
    author: 'Michael Brown',
    role: 'Treasurer',
    avatar: '/placeholder.svg',
    content: 'A reminder that dues for this semester must be paid by next Friday. Please see me if you need to make arrangements for a payment plan.',
    timestamp: '5 hours ago',
    likes: 8,
    comments: 2,
    category: 'Announcements',
    isPinned: false
  },
  {
    id: 3,
    author: 'Sophia Garcia',
    role: 'Service Chair',
    avatar: '/placeholder.svg',
    content: 'Our beach cleanup event is scheduled for this Saturday at 9am. Sign-up sheet is on the door of the chapter room. We need at least 15 volunteers!',
    timestamp: '1 day ago',
    likes: 15,
    comments: 7,
    category: 'Events',
    isPinned: false
  },
  {
    id: 4,
    author: 'Jason Smith',
    role: 'President',
    avatar: '/placeholder.svg',
    content: 'Congratulations to everyone who helped with the fundraiser last weekend! We raised over $2,000 for our philanthropy partner, exceeding our goal by 25%.',
    timestamp: '2 days ago',
    likes: 24,
    comments: 9,
    category: 'General',
    isPinned: false
  }
];

const MessageBoard = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [newMessageContent, setNewMessageContent] = useState('');
  const [newMessageCategory, setNewMessageCategory] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);
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

    const newMessage = {
      id: messages.length + 1,
      author: 'Jason Smith', // Current user
      role: 'President',
      avatar: '/placeholder.svg',
      content: newMessageContent,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
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
            comments: [...(message.comments || []), newCommentObj],
            commentsCount: (message.comments?.length || 0) + 1
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
        <Dialog open={newMessageOpen} onOpenChange={setNewMessageOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Message</DialogTitle>
              <DialogDescription>
                Post an announcement or start a discussion with the organization.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={newMessageCategory}
                  onChange={(e) => setNewMessageCategory(e.target.value)}
                >
                  <option value="General">General</option>
                  <option value="Announcements">Announcements</option>
                  <option value="Events">Events</option>
                  <option value="Questions">Questions</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Type your message here..."
                  value={newMessageContent}
                  onChange={(e) => setNewMessageContent(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewMessageOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePostMessage}>Post Message</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedMessage.avatar} alt={selectedMessage.author} />
                      <AvatarFallback>
                        {selectedMessage.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{selectedMessage.author}</CardTitle>
                      <div className="text-sm text-muted-foreground">
                        {selectedMessage.timestamp}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{selectedMessage.content}</p>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {selectedMessage.comments?.map((comment) => (
                  <Card key={comment.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback>
                            {comment.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{comment.author}</CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {comment.timestamp}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{comment.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <Button onClick={handleAddComment}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface MessageProps {
  message: {
    id: number;
    author: string;
    role: string;
    avatar: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: Array<{
      id: number;
      author: string;
      avatar: string;
      content: string;
      timestamp: string;
    }>;
    category: string;
    isPinned: boolean;
  };
  onLike: () => void;
  onPin: () => void;
  onOpenComments: () => void;
}

const MessageCard = ({ message, onLike, onPin, onOpenComments }: MessageProps) => {
  return (
    <Card 
      className={`${message.isPinned ? "border-primary/50 bg-primary/5" : ""}`}
      onDoubleClick={onOpenComments}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={message.avatar} alt={message.author} />
            <AvatarFallback>
              {message.author.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base">{message.author}</CardTitle>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <span>{message.role}</span>
              <span className="text-xs">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {message.timestamp}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{message.category}</Badge>
          {message.isPinned && (
            <Badge variant="default" className="bg-primary">Pinned</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{message.content}</p>
      </CardContent>
      <CardFooter className="pt-3 border-t flex justify-between">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="gap-1" onClick={onLike}>
            <ThumbsUp className="h-4 w-4" />
            <span>{message.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1" onClick={onOpenComments}>
            <MessageCircle className="h-4 w-4" />
            <span>{message.comments?.length || 0}</span>
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Options
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onPin}>
              {message.isPinned ? "Unpin Message" : "Pin Message"}
            </DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default MessageBoard;
