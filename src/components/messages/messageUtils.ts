
import { Conversation } from './types';
import { Member } from './NewDirectMessageDialog';

export const createNewConversation = (
  selectedMembers: Member[], 
  initialMessage: string, 
  groupName?: string
): Conversation => {
  const isGroup = selectedMembers.length > 1; // Changed from > 1 to >= 2, but this is the same
  
  let name = '';
  if (isGroup) {
    if (groupName && groupName.trim() !== '') {
      name = groupName;
    } else if (selectedMembers.length === 2) {
      name = selectedMembers.map(m => m.name).join(' & ');
    } else {
      name = `${selectedMembers[0].name}, ${selectedMembers[1].name} & ${selectedMembers.length - 2} others`;
    }
  } else {
    name = selectedMembers[0].name;
  }
  
  return {
    id: Date.now(),
    name: name,
    role: isGroup ? `Group • ${selectedMembers.length} members` : selectedMembers[0].role,
    lastMessage: initialMessage,
    timestamp: 'Just now',
    unread: 0,
    online: false,
    avatar: isGroup ? '/placeholder.svg' : selectedMembers[0].avatar,
    isGroup: isGroup,
    members: selectedMembers,
    customName: groupName && groupName.trim() !== '' ? true : false
  };
};

export const formatTime = (): string => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
