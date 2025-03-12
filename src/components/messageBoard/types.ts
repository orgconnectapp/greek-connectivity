
export interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface Message {
  id: number;
  author: string;
  role: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  category: string;
  isPinned: boolean;
}
