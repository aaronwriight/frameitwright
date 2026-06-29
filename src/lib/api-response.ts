import { NextResponse } from "next/server";

export function jsonMessage(message: string, status = 200) {
  return NextResponse.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
