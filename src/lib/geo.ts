import { currencyFromCountry, type CurrencyCode } from "./currency";

const UNKNOWN_COUNTRIES = new Set(["", "XX", "T1", "A1", "A2"]);

export type GeoResult = {
  country: string | null;
  currency: CurrencyCode | null;
  source: "header" | "ip" | "none";
};

export function countryFromHeaderValue(value: string | null | undefined): string | null {
  if (!value) return null;
  const country = value.trim().toUpperCase();
  if (UNKNOWN_COUNTRIES.has(country)) return null;
  if (!/^[A-Z]{2}$/.test(country)) return null;
  return country;
}

export function getCountryFromHeaders(headers: Headers): string | null {
  return (
    countryFromHeaderValue(headers.get("x-vercel-ip-country")) ||
    countryFromHeaderValue(headers.get("cf-ipcountry")) ||
    countryFromHeaderValue(headers.get("cloudfront-viewer-country")) ||
    countryFromHeaderValue(headers.get("x-country-code")) ||
    countryFromHeaderValue(headers.get("x-appengine-country"))
  );
}

export function getClientIp(headers: Headers): string | null {
  const candidates = [
    headers.get("cf-connecting-ip"),
    headers.get("x-real-ip"),
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-forwarded-for"),
  ];

  for (const value of candidates) {
    if (!value) continue;
    const ip = value.split(",")[0]?.trim().replace(/^\[|\]$/g, "");
    if (ip) return ip;
  }
  return null;
}

export function isPrivateIp(ip: string): boolean {
  const value = ip.trim().toLowerCase();
  if (!value) return true;
  if (value === "::1" || value === "localhost") return true;
  if (value.startsWith("127.") || value.startsWith("10.") || value.startsWith("192.168.")) {
    return true;
  }
  if (value.startsWith("0.")) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(value)) return true;
  if (value.startsWith("fe80:") || value.startsWith("fc") || value.startsWith("fd")) return true;
  if (value.startsWith("::ffff:")) {
    return isPrivateIp(value.slice("::ffff:".length));
  }
  return false;
}

export async function lookupCountryByIp(ip: string, timeoutMs = 2500): Promise<string | null> {
  if (!ip || isPrivateIp(ip)) return null;

  try {
    const res = await fetch(`https://api.country.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(timeoutMs),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { country?: string };
    return countryFromHeaderValue(data.country ?? null);
  } catch {
    return null;
  }
}

export async function resolveGeo(headers: Headers): Promise<GeoResult> {
  const fromHeader = getCountryFromHeaders(headers);
  if (fromHeader) {
    return {
      country: fromHeader,
      currency: currencyFromCountry(fromHeader),
      source: "header",
    };
  }

  const ip = getClientIp(headers);
  const fromIp = ip ? await lookupCountryByIp(ip) : null;
  if (fromIp) {
    return {
      country: fromIp,
      currency: currencyFromCountry(fromIp),
      source: "ip",
    };
  }

  return { country: null, currency: null, source: "none" };
}
