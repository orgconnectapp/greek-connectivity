
import React, { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { FundraiserType } from './data';

interface ShareFundraiserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fundraiser: FundraiserType | null;
}

const ShareFundraiserDialog = ({
  open,
  onOpenChange,
  fundraiser
}: ShareFundraiserDialogProps) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  if (!fundraiser) return null;

  const shareableLink = `${window.location.origin}/external-payment/${fundraiser.id}`;
  const templateMessage = `Hi! I'm supporting "${fundraiser.title}" and wanted to share this opportunity with you. Your contribution would make a real difference!\n\n${fundraiser.description}\n\nYou can donate here: ${shareableLink}`;

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
      navigator.clipboard.writeText(templateMessage)
        .then(() => {
          setCopied(true);
          toast({
            title: "Message copied",
            description: "Share it with your network!",
          });
          
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        })
        .catch(() => {
          toast({
            title: "Failed to copy message",
            description: "Please try again or copy manually",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{fundraiser.title}"</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Copy the message below and share it with your network to help spread the word.
            </p>
            <Textarea
              ref={textareaRef}
              className="min-h-[150px]"
              value={templateMessage}
              readOnly
            />
          </div>
          <Button 
            onClick={handleCopy} 
            className="w-full gap-2"
            variant="default"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? "Copied!" : "Copy Message"}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareFundraiserDialog;
