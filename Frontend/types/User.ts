import type { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  fullname: string;
  username: string;
  email: string;
  createdAt: Date;
  profilePictureUrl: string;
  coverImageUrl?: string;
  bio?: string;
  location?: string;
  languages?: ProfileLanguage[];
  skills?: string[];
  online?: boolean;
};

export type ProfileLanguage = {
  name: string;
  level: "Basic" | "Conversational" | "Fluent" | "Native";
};

export type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};
