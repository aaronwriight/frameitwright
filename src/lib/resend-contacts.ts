export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ResendProperties = Record<string, string | undefined>;

type UpsertResendContactInput = {
  apiKey: string;
  segmentId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  properties?: ResendProperties;
};

export class ResendContactError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ResendContactError";
    this.status = status;
  }
}

function cleanProperties(properties: ResendProperties = {}) {
  return Object.fromEntries(
    Object.entries(properties)
      .map(([key, value]) => [key, value?.trim()])
      .filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
}

async function readResendError(response: Response) {
  const error = (await response.json().catch(() => null)) as { message?: string } | null;
  return error?.message || "Unknown Resend error";
}

export async function upsertResendContact({
  apiKey,
  segmentId,
  email,
  firstName,
  lastName,
  properties,
}: UpsertResendContactInput) {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  const cleanFirstName = firstName?.trim() || undefined;
  const cleanLastName = lastName?.trim() || undefined;
  const cleanContactProperties = cleanProperties(properties);

  const response = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      first_name: cleanFirstName,
      last_name: cleanLastName,
      unsubscribed: false,
      properties: cleanContactProperties,
      segments: [{ id: segmentId }],
    }),
  });

  if (response.ok) return;

  if (response.status !== 409) {
    throw new ResendContactError(response.status, await readResendError(response));
  }

  const updateResponse = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      first_name: cleanFirstName,
      last_name: cleanLastName,
      unsubscribed: false,
      properties: cleanContactProperties,
    }),
  });
  const segmentResponse = await fetch(
    `https://api.resend.com/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segmentId)}`,
    { method: "POST", headers: { Authorization: `Bearer ${apiKey}` } },
  );

  if (updateResponse.ok && (segmentResponse.ok || segmentResponse.status === 409)) return;

  throw new ResendContactError(
    updateResponse.ok ? segmentResponse.status : updateResponse.status,
    updateResponse.ok ? await readResendError(segmentResponse) : await readResendError(updateResponse),
  );
}
