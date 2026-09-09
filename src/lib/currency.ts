export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  region: string;
  flag: string;
  rate: number;
  markup: number;
  round: number;
  locale: string;
};

export const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", region: "India", flag: "🇮🇳", rate: 1, markup: 1, round: 500, locale: "en-IN" },
  { code: "USD", symbol: "$", region: "United States", flag: "🇺🇸", rate: 83, markup: 1.25, round: 25, locale: "en-US" },
  { code: "EUR", symbol: "€", region: "Europe", flag: "🇪🇺", rate: 90, markup: 1.25, round: 25, locale: "en-IE" },
  { code: "GBP", symbol: "£", region: "United Kingdom", flag: "🇬🇧", rate: 105, markup: 1.25, round: 25, locale: "en-GB" },
  { code: "AED", symbol: "AED", region: "UAE", flag: "🇦🇪", rate: 22.6, markup: 1.25, round: 100, locale: "en-AE" },
];

const REGION_TO_CURRENCY: Record<string, CurrencyCode> = {
  IN: "INR",
  US: "USD",
  CA: "USD",
  AU: "USD",
  NZ: "USD",
  SG: "USD",
  HK: "USD",
  GB: "GBP",
  AE: "AED",
  SA: "AED",
  QA: "AED",
  KW: "AED",
  OM: "AED",
  BH: "AED",
  DE: "EUR",
  FR: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  PT: "EUR",
  IE: "EUR",
  FI: "EUR",
  GR: "EUR",
  LU: "EUR",
};

export function getCurrency(code: CurrencyCode): Currency {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

export function currencyFromCountry(country: string | null | undefined): CurrencyCode | null {
  if (!country) return null;
  const region = country.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(region) || region === "XX") return null;
  return REGION_TO_CURRENCY[region] ?? "USD";
}

export function currencyFromLocale(): CurrencyCode {
  if (typeof navigator === "undefined") return "USD";
  try {
    const locale = navigator.language || "en-US";
    const region = new Intl.Locale(locale).region;
    if (region && REGION_TO_CURRENCY[region]) return REGION_TO_CURRENCY[region];
  } catch {
    // ignore malformed locale
  }
  return "USD";
}

export function convertFromINR(inrValue: number, currency: Currency): number {
  if (currency.code === "INR") return inrValue;
  const converted = (inrValue / currency.rate) * currency.markup;
  return Math.round(converted / currency.round) * currency.round;
}

export function formatMoney(value: number, currency: Currency): string {
  const formatted = new Intl.NumberFormat(currency.locale, {
    maximumFractionDigits: 0,
  }).format(value);
  if (currency.code === "AED") return `${formatted} ${currency.symbol}`;
  return `${currency.symbol}${formatted}`;
}
