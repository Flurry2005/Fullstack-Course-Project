import type { User } from "../types/User";

// Public profile data shown to anyone visiting /profile/:username.
export type PublicProfile = Pick<
  User,
  | "fullname"
  | "username"
  | "profilePictureUrl"
  | "coverImageUrl"
  | "bio"
  | "location"
  | "languages"
  | "skills"
  | "createdAt"
>;
