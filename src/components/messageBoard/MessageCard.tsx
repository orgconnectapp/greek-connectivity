
import React from 'react';
import { ThumbsUp, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export default MessageCard;
