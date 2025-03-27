
import React from 'react';
import { ThumbsUp, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export interface MessageProps {
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
  isLiked: boolean;
}

const MessageCard = ({ message, onLike, onPin, onOpenComments, isLiked }: MessageProps) => {
  const navigate = useNavigate();

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Navigate to the author's profile page using the username format
    // Include state to indicate we're coming from the message board
    const username = message.author.replace(/\s+/g, '-').toLowerCase();
    navigate(`/profile/${username}`, { 
      state: { from: 'messageBoard' } 
    });
  };

  return (
    <Card 
      className="hover:border-primary/30 transition-colors"
      onDoubleClick={onOpenComments}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar onClick={handleAuthorClick} className="cursor-pointer">
            <AvatarImage src={message.avatar} alt={message.author} />
            <AvatarFallback>
              {message.author.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle 
              className="text-base cursor-pointer hover:underline" 
              onClick={handleAuthorClick}
            >
              {message.author}
            </CardTitle>
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
        {message.isPinned && (
          <Badge variant="default" className="bg-primary px-2 py-0.5 text-xs font-medium">Pinned</Badge>
        )}
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{message.content}</p>
        {/* Image or video content would be displayed here */}
      </CardContent>
      <CardFooter className="pt-3 border-t">
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`gap-1 ${isLiked ? "text-blue-500" : ""}`} 
            onClick={onLike}
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-blue-500 text-blue-500" : ""}`} />
            <span>{message.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1" onClick={onOpenComments}>
            <MessageCircle className="h-4 w-4" />
            <span>{message.comments?.length || 0}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
