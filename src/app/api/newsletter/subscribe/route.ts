import { NextResponse } from "next/server";

const interests = new Set([
  "everything",
  "life updates",
  "musings",
  "cognitive science",
  "photography, travel & adventure",
  "faith",
]);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Please submit the form again." }, { status: 400 });
  }

  if (body.company) return NextResponse.json({ message: "You’re on the list—thank you!" });

  const firstName = typeof body.firstName === "string" ? body.firstName.trim().slice(0, 80) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const interest = typeof body.interest === "string" && interests.has(body.interest) ? body.interest : "everything";

  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (body.consent !== "yes") {
    return NextResponse.json({ message: "Please confirm that you’d like to receive updates." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SFI_SEGMENT_ID;
  if (!apiKey || !segmentId) {
    return NextResponse.json({ message: "Sign-up is being configured. Please check back soon." }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      first_name: firstName || undefined,
      unsubscribed: false,
      properties: { interest },
      segments: [{ id: segmentId }],
    }),
  });

  if (response.ok) {
    return NextResponse.json({ message: "You’re on the list—thank you!" });
  }

  if (response.status === 409) {
    const segmentResponse = await fetch(
      `https://api.resend.com/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segmentId)}`,
      { method: "POST", headers: { Authorization: `Bearer ${apiKey}` } },
    );
    if (segmentResponse.ok || segmentResponse.status === 409) {
      return NextResponse.json({ message: "You’re on the list—thank you!" });
    }
  }

  const error = (await response.json().catch(() => null)) as { message?: string } | null;
  console.error("Newsletter subscription failed", response.status, error?.message || "Unknown Resend error");
  return NextResponse.json({ message: "I couldn’t add you just now. Please try again shortly." }, { status: 502 });
}
