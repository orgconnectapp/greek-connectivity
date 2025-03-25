
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from './types';

interface CommentsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedMessage: Message | null;
  newComment: string;
  setNewComment: (comment: string) => void;
  handleAddComment: () => void;
}

const CommentsDialog: React.FC<CommentsDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedMessage,
  newComment,
  setNewComment,
  handleAddComment
}) => {
  const navigate = useNavigate();

  const handleAuthorClick = (author: string) => {
    // Navigate to the author's profile page using the username format
    const username = author.replace(/\s+/g, '-').toLowerCase();
    navigate(`/profile/${username}`);
    onOpenChange(false); // Close the dialog after navigation
  };

  if (!selectedMessage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Comments</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <div className="flex items-start space-x-4 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedMessage.avatar} alt={selectedMessage.author} />
              <AvatarFallback>{selectedMessage.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center">
                <h4 
                  className="font-medium text-sm cursor-pointer hover:underline"
                  onClick={() => handleAuthorClick(selectedMessage.author)}
                >
                  {selectedMessage.author}
                </h4>
                <span className="text-xs text-muted-foreground ml-2">{selectedMessage.timestamp}</span>
              </div>
              <p className="mt-1">{selectedMessage.content}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-sm mb-2">
              {selectedMessage.comments.length} Comment{selectedMessage.comments.length !== 1 ? 's' : ''}
            </h4>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {selectedMessage.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 
                        className="font-medium text-sm cursor-pointer hover:underline" 
                        onClick={() => handleAuthorClick(comment.author)}
                      >
                        {comment.author}
                      </h4>
                      <span className="text-xs text-muted-foreground ml-2">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-end gap-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-24 flex-1"
            />
            <Button 
              size="icon" 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDialog;
