
import { Member } from './NewDirectMessageDialog';

export interface Conversation {
  id: number;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  avatar: string;
  isGroup?: boolean;
  members?: Member[];
  customName?: boolean;
}
