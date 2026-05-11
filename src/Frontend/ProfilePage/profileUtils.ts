import type { Gig } from "../types/Gig";
import type { ProfileLanguage } from "../types/User";

export const API_BASE =
  import.meta.env.VITE_DEV === "true"
    ? "http://localhost:3000"
    : "https://fullstackapi.liamjorgensen.dev";

export const DEFAULT_PROFILE_IMAGE =
  "https://res.cloudinary.com/dnpnpkqig/image/upload/c_fill,f_auto,g_auto,h_500,q_auto,w_500/default-profilePicture?_a=BAMAPqUs0";

export const FALLBACK_BIO =
  "This seller has not added a profile description yet.";

export const LANGUAGE_LEVELS: ProfileLanguage["level"][] = [
  "Basic",
  "Conversational",
  "Fluent",
  "Native",
];

// Gets the cheapest non-empty package price for a gig card.
export function getStartingPrice(gig: Gig) {
  const prices = [gig.basic?.price, gig.standard?.price, gig.premium?.price]
    .filter((price): price is string | number => Boolean(price))
    .map((price) => Number(price))
    .filter((price) => price > 0);

  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;

  return `$${lowestPrice}`;
}

export function formatMemberSince(createdAt?: Date | string) {
  if (!createdAt) return "Member since unknown";

  return `Member since ${new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(new Date(createdAt))}`;
}

export function parseSkillsInput(value: string) {
  return value
    .split(/[,\n]/)
    .map((skill) => skill.trim())
    .filter(Boolean)
    .slice(0, 12);
}

export function formatSkillsInput(skills?: string[]) {
  return skills?.join(", ") ?? "";
}

export function parseLanguagesInput(value: string): ProfileLanguage[] {
  return value
    .split("\n")
    .map((line) => {
      const [name = "", level = "Conversational"] = line
        .split("-")
        .map((part) => part.trim());

      const safeLevel = LANGUAGE_LEVELS.includes(level as ProfileLanguage["level"])
        ? (level as ProfileLanguage["level"])
        : "Conversational";

      return { name, level: safeLevel };
    })
    .filter((language) => language.name.length > 0)
    .slice(0, 8);
}

export function formatLanguagesInput(languages?: ProfileLanguage[]) {
  return (
    languages
      ?.map((language) => `${language.name} - ${language.level}`)
      .join("\n") ?? ""
  );
}
