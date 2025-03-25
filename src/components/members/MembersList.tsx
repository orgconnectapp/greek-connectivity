
import React from 'react';
import { MemberCard } from './MemberCard';
import { MemberListItem } from './MemberListItem';
import { Member, ViewType } from './types';

interface MembersListProps {
  members: Member[];
  viewType: ViewType;
  onOpenProfile: (member: Member) => void;
}

export const MembersList: React.FC<MembersListProps> = ({
  members,
  viewType,
  onOpenProfile
}) => {
  if (viewType === 'grid') {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((member) => (
          <MemberCard 
            key={member.id} 
            member={member} 
            onOpenProfile={onOpenProfile}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-[1fr_1fr_1fr_auto] p-4 font-medium bg-muted/50">
        <div>Name</div>
        <div>Contact</div>
        <div>Joined</div>
        <div></div>
      </div>
      <div className="divide-y">
        {members.map((member) => (
          <MemberListItem
            key={member.id}
            member={member}
            onOpenProfile={onOpenProfile}
          />
        ))}
      </div>
    </div>
  );
};
