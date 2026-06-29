import { jsonMessage } from "@/lib/api-response";
import { emailPattern, upsertResendContact } from "@/lib/resend-contacts";

const photographyInterests = new Set([
  "portraits",
  "couples",
  "families",
  "events",
  "graduation",
  "creative collaboration",
  "prints",
  "just following along",
]);

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonMessage("Please submit the form again.", 400);
  }

  if (body.company) return jsonMessage("You’re on the photography list—thank you!");

  const firstName = cleanString(body.firstName, 80);
  const lastName = cleanString(body.lastName, 80);
  const email = cleanString(body.email, 254).toLowerCase();
  const photographyInterest =
    typeof body.photographyInterest === "string" && photographyInterests.has(body.photographyInterest)
      ? body.photographyInterest
      : "just following along";
  const location = cleanString(body.location, 120);
  const notes = cleanString(body.notes, 500);

  if (!emailPattern.test(email)) {
    return jsonMessage("Please enter a valid email address.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_PHOTOGRAPHY_SEGMENT_ID;
  if (!apiKey || !segmentId) {
    return jsonMessage("Photography sign-up is being configured. Please check back soon.", 503);
  }

  try {
    await upsertResendContact({
      apiKey,
      segmentId,
      email,
      firstName,
      lastName,
      properties: {
        source: "frame_it_wright_photography",
        photography_interest: photographyInterest,
        location,
        notes,
      },
    });
    return jsonMessage("You’re on the photography list—thank you!");
  } catch (error) {
    console.error("Photography mailing-list subscription failed", error);
    return jsonMessage("I couldn’t add you just now. Please try again shortly.", 502);
  }
}
