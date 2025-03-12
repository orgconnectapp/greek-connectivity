
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Organization } from './OrganizationCard';

interface ConfirmJoinDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOrg: Organization | null;
  onConfirm: () => void;
  isLoading: boolean;
}

const ConfirmJoinDialog = ({ 
  open, 
  onOpenChange, 
  selectedOrg, 
  onConfirm, 
  isLoading 
}: ConfirmJoinDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Join Request</DialogTitle>
          <DialogDescription>
            Are you sure you want to request to join {selectedOrg?.name}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Confirm Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmJoinDialog;
