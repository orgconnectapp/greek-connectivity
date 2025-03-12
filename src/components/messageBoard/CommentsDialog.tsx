
import React from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CommentsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMessage: {
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
  } | null;
  newComment: string;
  setNewComment: (value: string) => void;
  handleAddComment: () => void;
}

const CommentsDialog = ({
  isOpen,
  onOpenChange,
  selectedMessage,
  newComment,
  setNewComment,
  handleAddComment
}: CommentsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};

export default CommentsDialog;
