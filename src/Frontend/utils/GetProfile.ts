import type { PublicProfile } from "../ProfilePage/types";
import { API_BASE } from "../ProfilePage/profileUtils";
export async function fetchProfile(username: string) {
  try {
    const response = await fetch(`${API_BASE}/api/profile/${username}`);

    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as PublicProfile;
    return data;
  } catch (err) {
    console.error(err);
  }
}
