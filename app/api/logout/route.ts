import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ nsg: "logout success" });
  response.cookies.set("jwt-token", "");
  return response;
}
