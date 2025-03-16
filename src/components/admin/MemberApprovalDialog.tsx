
import React from "react";
import { Check, X, User, Mail, Phone, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface PendingMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  major: string;
  year: string;
  bio: string;
  appliedDate: string;
  profileImage?: string;
}

interface MemberApprovalDialogProps {
  member: PendingMember | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const MemberApprovalDialog: React.FC<MemberApprovalDialogProps> = ({
  member,
  isOpen,
  onOpenChange,
  onApprove,
  onReject,
}) => {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            {member.name}
          </DialogTitle>
          <DialogDescription>
            Membership application details and approval options
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex flex-col md:flex-row gap-6">
            {member.profileImage && (
              <div className="w-full md:w-1/3">
                <img
                  src={member.profileImage}
                  alt={member.name}
                  className="rounded-md object-cover w-full h-auto aspect-square"
                />
              </div>
            )}

            <div className="flex-1 space-y-3">
              <div>
                <span className="font-medium">Email:</span>
                <p className="mt-1 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  {member.email}
                </p>
              </div>

              <div>
                <span className="font-medium">Phone:</span>
                <p className="mt-1 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {member.phone}
                </p>
              </div>

              <div>
                <span className="font-medium">Academic Information:</span>
                <p className="mt-1 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  {member.major}, {member.year}
                </p>
              </div>

              {member.bio && (
                <div>
                  <span className="font-medium">Bio:</span>
                  <p className="mt-1">{member.bio}</p>
                </div>
              )}

              <div>
                <span className="font-medium">Applied:</span>
                <p className="mt-1">{member.appliedDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            onClick={() => onApprove(member.id)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="mr-2 h-4 w-4" />
            Approve Membership
          </Button>
          <Button
            onClick={() => onReject(member.id)}
            variant="destructive"
          >
            <X className="mr-2 h-4 w-4" />
            Reject Application
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberApprovalDialog;
