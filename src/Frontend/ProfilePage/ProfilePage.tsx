import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../Context/useAuth";
import type { Gig } from "../types/Gig";
import type { User } from "../types/User";
import ProfileGigs from "./Components/ProfileGigs";
import ProfileHeader from "./Components/ProfileHeader";
import ProfileDetails from "./Components/ProfileDetails";
import type { PublicProfile } from "./types";
import {
  API_BASE,
  DEFAULT_PROFILE_IMAGE,
  formatLanguagesInput,
  formatSkillsInput,
  parseLanguagesInput,
  parseSkillsInput,
} from "./profileUtils";
import NavBar from "../NavBar/NavBar";

function ProfilePage() {
  const { username } = useParams();
  const { user, login } = useAuth();
  const primaryImageRef = useRef<HTMLInputElement | null>(null);
  const bannerImageRef = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState<PublicProfile | null>(null);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [draftBio, setDraftBio] = useState("");
  const [draftLocation, setDraftLocation] = useState("");
  const [draftCoverImageUrl, setDraftCoverImageUrl] = useState("");
  const [draftLanguages, setDraftLanguages] = useState("");
  const [draftSkills, setDraftSkills] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingGigs, setIsLoadingGigs] = useState(true);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageCacheBust, setImageCacheBust] = useState(Date.now());

  // Checks if the profile URL belongs to the logged-in user.
  const isOwnProfile = Boolean(user?.username && user.username === username);

  // Shows stored profile data, or falls back to the logged-in user while loading your own profile.
  const visibleProfile =
    profile ??
    (isOwnProfile && user
      ? {
          fullname: user.fullname,
          username: user.username,
          profilePictureUrl: user.profilePictureUrl,
          coverImageUrl: user.coverImageUrl,
          bio: user.bio,
          location: user.location,
          languages: user.languages,
          skills: user.skills,
          createdAt: user.createdAt,
        }
      : null);

  // Loads the public profile for the username in /profile/:username.
  useEffect(() => {
    if (!username) return;

    async function fetchProfile() {
      setIsLoadingProfile(true);

      try {
        const response = await fetch(`${API_BASE}/api/profile/${username}`);

        if (!response.ok) {
          setProfile(null);
          return;
        }

        const data = (await response.json()) as PublicProfile;
        setProfile(data);
        setDraftBio(data.bio ?? "");
        setDraftLocation(data.location ?? "");
        setDraftCoverImageUrl(data.coverImageUrl ?? "");
        setDraftLanguages(formatLanguagesInput(data.languages));
        setDraftSkills(formatSkillsInput(data.skills));
      } finally {
        setIsLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [username]);

  // Loads gigs created by the profile owner.
  useEffect(() => {
    if (!username) return;

    async function fetchSellerGigs() {
      setIsLoadingGigs(true);

      try {
        const response = await fetch(`${API_BASE}/api/gig/seller/${username}`);

        if (!response.ok) {
          setGigs([]);
          return;
        }

        const data = (await response.json()) as Gig[];
        setGigs(data);
      } finally {
        setIsLoadingGigs(false);
      }
    }

    fetchSellerGigs();
  }, [username]);

  // Resets the edit form when a new profile is loaded.
  useEffect(() => {
    if (!visibleProfile || isEditing) return;
    setDraftBio(visibleProfile.bio ?? "");
    setDraftLocation(visibleProfile.location ?? "");
    setDraftCoverImageUrl(visibleProfile.coverImageUrl ?? "");
    setDraftLanguages(formatLanguagesInput(visibleProfile.languages));
    setDraftSkills(formatSkillsInput(visibleProfile.skills));
  }, [visibleProfile, isEditing]);

  // Uploads a new profile image for your own profile.
  async function handleProfileImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!isOwnProfile || !user) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setIsUploadingImage(true);

    try {
      const response = await fetch(`${API_BASE}/api/upload/profilePicture`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) return;

      const url = await response.text();
      const updatedUser = {
        ...user,
        profilePictureUrl: url,
      };

      login(updatedUser);
      setImageCacheBust(Date.now());
      setProfile((current) =>
        current ? { ...current, profilePictureUrl: url } : current,
      );
    } finally {
      setIsUploadingImage(false);
    }
  }

  // Uploads a new profile image for your own profile.
  async function handleBannerImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!isOwnProfile || !user) return;

    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setIsUploadingImage(true);

    console.log(formData);

    try {
      const response = await fetch(`${API_BASE}/api/upload/profileBanner`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      console.log(response);

      if (!response.ok) return;

      const url = await response.text();
      setDraftCoverImageUrl(url);
      const updatedUser = {
        ...user,
        coverImageUrl: url,
      };
      console.log(url);

      login(updatedUser);
      setImageCacheBust(Date.now());
      setProfile((current) =>
        current ? { ...current, coverImageUrl: url } : current,
      );
    } finally {
      setIsUploadingImage(false);
    }
  }

  // Saves editable profile text fields.
  async function handleSaveProfile() {
    if (!isOwnProfile || !user) return;

    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE}/api/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          bio: draftBio,
          location: draftLocation,
          coverImageUrl: draftCoverImageUrl,
          languages: parseLanguagesInput(draftLanguages),
          skills: parseSkillsInput(draftSkills),
        }),
      });

      if (!response.ok) return;

      const updatedUser = (await response.json()) as User;

      // Updates useAuth/localStorage with the saved profile values.
      login(updatedUser);
      setProfile(updatedUser);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  const profileImageUrl = visibleProfile?.profilePictureUrl
    ? `${visibleProfile.profilePictureUrl}${
        visibleProfile.profilePictureUrl.includes("?") ? "&" : "?"
      }t=${imageCacheBust}`
    : DEFAULT_PROFILE_IMAGE;

  return (
    <section className="bg-white min-h-screen">
      <NavBar />

      <ProfileHeader
        profile={visibleProfile}
        profileImageUrl={profileImageUrl}
        isLoading={isLoadingProfile}
        isOwnProfile={isOwnProfile}
        isEditing={isEditing}
        isSaving={isSaving}
        isUploadingImage={isUploadingImage}
        draftBio={draftBio}
        draftLocation={draftLocation}
        imageInputRef={primaryImageRef}
        onEdit={() => setIsEditing(true)}
        onCancelEdit={() => {
          setDraftBio(visibleProfile?.bio ?? "");
          setDraftLocation(visibleProfile?.location ?? "");
          setDraftCoverImageUrl(visibleProfile?.coverImageUrl ?? "");
          setDraftLanguages(formatLanguagesInput(visibleProfile?.languages));
          setDraftSkills(formatSkillsInput(visibleProfile?.skills));
          setIsEditing(false);
        }}
        onSave={handleSaveProfile}
        onBioChange={setDraftBio}
        onLocationChange={setDraftLocation}
        onImageChange={handleProfileImageChange}
      />

      <main className="gap-6 grid lg:grid-cols-[320px_1fr] mx-auto px-4 sm:px-6 py-8 max-w-296">
        <ProfileDetails
          profile={visibleProfile}
          isEditing={isEditing}
          draftCoverImageUrl={draftCoverImageUrl}
          draftLanguages={draftLanguages}
          draftSkills={draftSkills}
          handleBannerImageChange={handleBannerImageChange}
          onLanguagesChange={setDraftLanguages}
          bannerImageRef={bannerImageRef}
          onSkillsChange={setDraftSkills}
        />

        <ProfileGigs
          gigs={gigs}
          isLoading={isLoadingGigs}
          isOwnProfile={isOwnProfile}
        />
      </main>
    </section>
  );
}

export default ProfilePage;
