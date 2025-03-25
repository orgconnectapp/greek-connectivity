
import React from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Message } from './types';

interface CommentsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMessage: Message | null;
  newComment: string;
  setNewComment: (comment: string) => void;
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
  const navigate = useNavigate();

  if (!selectedMessage) return null;

  const handleAuthorClick = (authorName: string) => {
    // Navigate to the author's profile page using the username format
    // Include state to indicate we're coming from the message board
    const username = authorName.replace(/\s+/g, '-').toLowerCase();
    navigate(`/profile/${username}`, {
      state: { from: 'messageBoard' }
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="border-b pb-4">
            <div className="flex items-start gap-3 mb-2">
              <Avatar className="cursor-pointer" onClick={() => handleAuthorClick(selectedMessage.author)}>
                <AvatarImage src={selectedMessage.avatar} alt={selectedMessage.author} />
                <AvatarFallback>
                  {selectedMessage.author.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p 
                  className="font-medium cursor-pointer hover:underline"
                  onClick={() => handleAuthorClick(selectedMessage.author)}
                >
                  {selectedMessage.author}
                </p>
                <p className="text-sm text-muted-foreground">{selectedMessage.timestamp}</p>
              </div>
            </div>
            <p className="whitespace-pre-line">{selectedMessage.content}</p>
          </div>
          
          {selectedMessage.comments && selectedMessage.comments.length > 0 ? (
            <div className="space-y-4">
              {selectedMessage.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="cursor-pointer" onClick={() => handleAuthorClick(comment.author)}>
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>
                      {comment.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p 
                      className="font-medium cursor-pointer hover:underline"
                      onClick={() => handleAuthorClick(comment.author)}
                    >
                      {comment.author}
                    </p>
                    <p className="text-sm text-muted-foreground">{comment.timestamp}</p>
                    <p className="mt-1 whitespace-pre-line">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" onClick={handleAddComment} disabled={!newComment.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
