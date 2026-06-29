import { jsonMessage } from "@/lib/api-response";
import { emailPattern } from "@/lib/resend-contacts";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonMessage("Please submit the form again.", 400);
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!emailPattern.test(email) || email.length > 254) {
    return jsonMessage("Please enter a valid email address.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonMessage("Unsubscribe is being configured. Please check back soon.", 503);
  }

  const response = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ unsubscribed: true }),
  });

  if (response.ok || response.status === 404) {
    return jsonMessage("You’ve been unsubscribed.");
  }

  const error = (await response.json().catch(() => null)) as { message?: string } | null;
  console.error("Newsletter unsubscribe failed", response.status, error?.message || "Unknown Resend error");
  return jsonMessage("I couldn’t unsubscribe you just now. Please try again shortly.", 502);
}
