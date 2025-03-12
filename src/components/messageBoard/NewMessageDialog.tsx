
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircle } from 'lucide-react';

interface NewMessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newMessageContent: string;
  setNewMessageContent: (value: string) => void;
  newMessageCategory: string;
  setNewMessageCategory: (value: string) => void;
  handlePostMessage: () => void;
}

const NewMessageDialog = ({
  isOpen,
  onOpenChange,
  newMessageContent,
  setNewMessageContent,
  newMessageCategory,
  setNewMessageCategory,
  handlePostMessage
}: NewMessageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handlePostMessage}>Post Message</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageDialog;
