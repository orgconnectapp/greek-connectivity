
export type EventType = "meeting" | "social" | "service" | "fundraiser" | "other";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: EventType;
  createdBy: string;
  status?: "pending" | "approved" | "rejected";
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "alumni";
  profileImage?: string;
  phone?: string;
  joinedDate?: string;
  major?: string;
  graduationYear?: string;
  bio?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}
