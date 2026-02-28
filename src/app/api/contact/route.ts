import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// ─── Rate Limiter (in-memory, per Vercel instance) ──────────────────────────
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // max 3 submissions per IP per window

const ipSubmissions = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipSubmissions.get(ip);

  if (!entry || now > entry.resetAt) {
    ipSubmissions.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

// Clean up stale entries every 30 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of ipSubmissions) {
    if (now > entry.resetAt) ipSubmissions.delete(ip);
  }
}, 30 * 60 * 1000);

// ─── Input sanitisation ─────────────────────────────────────────────────────
function sanitize(str: string | undefined, maxLength = 500): string {
  if (!str || typeof str !== "string") return "";
  return str.trim().slice(0, maxLength);
}

async function sendToNotion(
  name: string,
  email: string,
  service: string,
  budget: string,
  timeline: string,
  details: string,
) {
  const notionSecret = process.env.NOTION_SECRET?.trim();
  const notionDatabaseId = process.env.NOTION_DATABASE_ID?.trim();

  if (!notionSecret || !notionDatabaseId) {
    throw new Error("Notion is not configured. Missing NOTION_SECRET or NOTION_DATABASE_ID.");
  }

  const notion = new Client({ 
    auth: notionSecret,
    notionVersion: "2022-06-28" 
  });

  await notion.pages.create({
    parent: { database_id: notionDatabaseId },
    properties: {
      Name: { title: [{ text: { content: name } }] },
      Email: { email: email },
      Service: { select: { name: service || "Not specified" } },
      Budget: {
        rich_text: [{ text: { content: budget || "Not specified" } }],
      },
      Timeline: {
        rich_text: [{ text: { content: timeline || "Not specified" } }],
      },
      Details: {
        rich_text: [{ text: { content: details || "Not specified" } }],
      },
      // Note: If you want to track submission time, add a Date property named "Submitted At" to your Notion DB
      // "Submitted At": { date: { start: new Date().toISOString() } },
    },
  });
}

// ─── Telegram Integration (sends to group, HTML formatting) ─────────────────
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function sendToTelegram(
  name: string,
  email: string,
  service: string,
  budget: string,
  timeline: string,
  details: string,
) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) return;

  const n = escapeHTML(name);
  const e = escapeHTML(email);
  const s = escapeHTML(service || "Not specified");
  const b = escapeHTML(budget || "Not specified");
  const t = escapeHTML(timeline || "Not specified");
  const d = escapeHTML(details || "Not specified");

  // HTML parse_mode is more reliable than Markdown for special characters
  const text = [
    `🚀 <b>New Project Inquiry</b>`,
    ``,
    `┌─────────────────────────`,
    `│ 👤  <b>Name:</b>  ${n}`,
    `│ 📧  <b>Email:</b>  ${e}`,
    `│ 🎨  <b>Service:</b>  ${s}`,
    `│ 💰  <b>Budget:</b>  ${b}`,
    `│ ⏱  <b>Timeline:</b>  ${t}`,
    `└─────────────────────────`,
    ``,
    `📝 <b>Project Details:</b>`,
    `<i>${d}</i>`,
    ``,
    `📅 <code>${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</code>`,
  ].join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML",
      }),
    },
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Telegram API error: ${JSON.stringify(err)}`);
  }
}

// ─── POST handler ───────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // --- Rate limiting by IP ---
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();

    // --- Honeypot check: if the hidden "company" field is filled, it's a bot ---
    if (body.company) {
      // Silently accept to not alert the bot, but do nothing
      return NextResponse.json({ success: true });
    }

    const name = sanitize(body.name, 100);
    const email = sanitize(body.email, 200);
    const service = sanitize(body.service, 100);
    const budget = sanitize(body.budget, 50);
    const details = sanitize(body.details, 2000);
    const timeline = sanitize(body.timeline, 50);

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    // Run Notion + Telegram in parallel — completely free, no paid APIs
    const results = await Promise.allSettled([
      sendToNotion(name, email, service, budget, timeline, details),
      sendToTelegram(name, email, service, budget, timeline, details),
    ]);

    results.forEach((r, i) => {
      if (r.status === "rejected") {
        const labels = ["Notion", "Telegram"];
        console.error(`${labels[i]} failed:`, r.reason);
      }
    });

    const notionResult = results[0];
    if (notionResult.status === "rejected") {
      return NextResponse.json(
        {
          error:
            "Failed to store submission in Notion. Verify the integration token and that the database is shared with the integration.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
