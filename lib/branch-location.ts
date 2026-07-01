import { unstable_cache } from "next/cache";

export type BranchCoordinates = {
  lat: number;
  lng: number;
};

const ULAANBAATAR_CENTER: BranchCoordinates = {
  lat: 47.9184,
  lng: 106.9176,
};

const BRANCH_COORDINATE_FALLBACKS: Array<{
  match: RegExp;
  coordinates: BranchCoordinates;
}> = [
  {
    match: /нарны|salbar-1|салбар 1/i,
    coordinates: { lat: 47.9077, lng: 106.9156 },
  },
  {
    match: /товчоо|сонсголон|aguulakh|агуулах|salbar-2|салбар 2/i,
    coordinates: { lat: 47.9228, lng: 106.7589 },
  },
  {
    match: /luxoil|энхтайван|salbar-3|салбар 3/i,
    coordinates: { lat: 47.9135, lng: 106.8534 },
  },
];

function getFallbackCoordinates(
  address?: string,
  slug?: string,
  title?: string,
): BranchCoordinates | null {
  const source = `${slug ?? ""} ${title ?? ""} ${address ?? ""}`.toLowerCase();

  for (const item of BRANCH_COORDINATE_FALLBACKS) {
    if (item.match.test(source)) return item.coordinates;
  }

  return null;
}

async function geocodeAddress(address: string): Promise<BranchCoordinates | null> {
  const query = `${address}, Ulaanbaatar, Mongolia`.trim();
  if (!query) return null;

  try {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("q", query);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", "1");

    const response = await fetch(url, {
      headers: {
        "User-Agent": "AutoOilWebsite/1.0 (branch-locator)",
        Accept: "application/json",
      },
      next: { revalidate: 60 * 60 * 24 },
    });

    if (!response.ok) return null;

    const results = (await response.json()) as Array<{
      lat?: string;
      lon?: string;
    }>;

    const first = results[0];
    if (!first?.lat || !first?.lon) return null;

    const lat = Number(first.lat);
    const lng = Number(first.lon);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

    return { lat, lng };
  } catch {
    return null;
  }
}

const geocodeCached = unstable_cache(
  async (address: string) => geocodeAddress(address),
  ["branch-geocode"],
  { revalidate: 60 * 60 * 24 },
);

export function parseCoordinatePair(value: string): BranchCoordinates | null {
  const match = value.match(/(-?\d+(?:\.\d+)?)\s*[,;]\s*(-?\d+(?:\.\d+)?)/);
  if (!match) return null;

  const lat = Number(match[1]);
  const lng = Number(match[2]);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;

  return { lat, lng };
}

export async function resolveBranchCoordinates(input: {
  latitude?: string;
  longitude?: string;
  location?: string;
  address?: string;
  slug?: string;
  title?: string;
}): Promise<BranchCoordinates> {
  const lat = Number(input.latitude);
  const lng = Number(input.longitude);

  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    return { lat, lng };
  }

  const fromLocationField =
    input.location && parseCoordinatePair(input.location);
  if (fromLocationField) return fromLocationField;

  const fallback = getFallbackCoordinates(
    input.address,
    input.slug,
    input.title,
  );
  if (fallback) return fallback;

  if (input.address) {
    const geocoded = await geocodeCached(input.address);
    if (geocoded) return geocoded;
  }

  return ULAANBAATAR_CENTER;
}

export function getBranchesMapCenter(
  branches: Array<{ lat: number; lng: number }>,
): BranchCoordinates {
  if (branches.length === 0) return ULAANBAATAR_CENTER;

  const lat =
    branches.reduce((sum, branch) => sum + branch.lat, 0) / branches.length;
  const lng =
    branches.reduce((sum, branch) => sum + branch.lng, 0) / branches.length;

  return { lat, lng };
}
