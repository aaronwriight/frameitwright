import { jsonMessage } from "@/lib/api-response";
import { emailPattern, upsertResendContact } from "@/lib/resend-contacts";

const interests = new Set([
  "everything",
  "life updates",
  "musings",
  "cognitive science",
  "photography",
  "travel and adventure",
  "faith",
]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonMessage("Please submit the form again.", 400);
  }

  if (body.company) return jsonMessage("You’re on the list—thank you!");

  const firstName = typeof body.firstName === "string" ? body.firstName.trim().slice(0, 80) : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim().slice(0, 80) : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const interest = typeof body.interest === "string" && interests.has(body.interest) ? body.interest : "everything";

  if (!emailPattern.test(email) || email.length > 254) {
    return jsonMessage("Please enter a valid email address.", 400);
  }
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SFI_SEGMENT_ID;
  if (!apiKey || !segmentId) {
    return jsonMessage("Sign-up is being configured. Please check back soon.", 503);
  }

  try {
    await upsertResendContact({
      apiKey,
      segmentId,
      email,
      firstName,
      lastName,
      properties: { interest, source: "scope_for_imagination" },
    });
    return jsonMessage("You’re on the list—thank you!");
  } catch (error) {
    console.error("Newsletter subscription failed", error);
    return jsonMessage("I couldn’t add you just now. Please try again shortly.", 502);
  }
}
