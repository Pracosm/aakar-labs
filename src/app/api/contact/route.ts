import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, service, budget, details, timeline } =
      await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Aakar Labs <onboarding@resend.dev>",
      to: "shardul@dvaitatech.com",
      replyTo: email,
      subject: `New Project Inquiry — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="margin-bottom: 24px;">New project inquiry from ${name}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B6560; width: 140px;">Name</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B6560;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${service ? `<tr><td style="padding: 8px 0; color: #6B6560;">Service</td><td style="padding: 8px 0;">${service}</td></tr>` : ""}
            ${budget ? `<tr><td style="padding: 8px 0; color: #6B6560;">Budget</td><td style="padding: 8px 0;">${budget}</td></tr>` : ""}
            ${timeline ? `<tr><td style="padding: 8px 0; color: #6B6560;">Timeline</td><td style="padding: 8px 0;">${timeline}</td></tr>` : ""}
          </table>
          ${details ? `<div style="margin-top: 20px; padding: 16px; background: #F5F1EB; border-radius: 8px;"><p style="margin: 0 0 4px; color: #6B6560; font-size: 13px;">Project Details</p><p style="margin: 0; white-space: pre-wrap;">${details}</p></div>` : ""}
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
