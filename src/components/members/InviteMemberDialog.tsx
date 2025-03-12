
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Mail, Send, CheckCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const InviteMemberDialog = ({ open, onOpenChange }: InviteMemberDialogProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  
  // This would typically come from your backend/config in a real application
  const inviteLink = 'https://greeksync.com/join/invite-code-123456';
  
  const defaultMessage = `Hi there,

I'd like to invite you to join our organization on GreekSync! 
We use this platform to manage our events, members, and communications.

You can join by clicking the link below:
${inviteLink}

Looking forward to having you on board!`;

  const [message, setMessage] = useState(defaultMessage);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Invitation link copied to clipboard",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendEmail = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the email through your backend
    // For now, we'll just show a success message
    toast({
      title: "Invitation sent!",
      description: `Invitation email sent to ${email}`,
    });
    
    // Reset form and close dialog
    setEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Invite New Member</DialogTitle>
          <DialogDescription>
            Share an invitation link or send an email invitation
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-2">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Invitation Link</h3>
            <div className="flex items-center gap-2">
              <Input 
                value={inviteLink} 
                readOnly 
                className="flex-1 bg-muted/50"
              />
              <Button size="icon" onClick={handleCopyLink}>
                {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium">Email Invitation</h3>
              <div className="text-xs text-muted-foreground">
                Or send directly to their email
              </div>
            </div>
            
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Textarea
              placeholder="Custom message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="gap-2" onClick={handleSendEmail}>
            <Send className="h-4 w-4" />
            <span>Send Invitation</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;
