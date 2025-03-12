
import React, { useState } from 'react';
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
import { PlusCircle, Image, X } from 'lucide-react';

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
  const [mediaFiles, setMediaFiles] = useState<Array<{type: 'image' | 'video', url: string}>>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleMediaUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        setIsUploading(true);
        
        // Process each selected file
        Array.from(files).forEach(file => {
          // Determine if it's an image or video
          const type = file.type.startsWith('image/') ? 'image' : 'video';
          
          // Create local URL
          const url = URL.createObjectURL(file);
          
          // Add the file to the mediaFiles array
          setMediaFiles(prev => [...prev, { type, url }]);
        });
        
        setIsUploading(false);
      }
    };
    
    input.click();
  };

  const removeMedia = (index: number) => {
    const newMediaFiles = [...mediaFiles];
    newMediaFiles.splice(index, 1);
    setMediaFiles(newMediaFiles);
  };

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
          
          {/* Media preview area */}
          {mediaFiles.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium">Media Files</div>
              <div className="flex flex-wrap gap-2">
                {mediaFiles.map((file, index) => (
                  <div key={index} className="relative">
                    {file.type === 'image' ? (
                      <img 
                        src={file.url} 
                        alt="Uploaded content" 
                        className="h-20 w-20 object-cover rounded-md" 
                      />
                    ) : (
                      <video 
                        src={file.url} 
                        className="h-20 w-20 object-cover rounded-md" 
                        controls 
                      />
                    )}
                    <button 
                      className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                      onClick={() => removeMedia(index)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Single Media upload button */}
          <div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleMediaUpload}
              disabled={isUploading}
              className="w-full"
            >
              <Image className="h-4 w-4 mr-2" />
              Add Media
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handlePostMessage} disabled={!newMessageContent.trim() && mediaFiles.length === 0}>
            Post Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageDialog;
