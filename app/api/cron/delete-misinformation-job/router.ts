import { sql } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("executing delete misinformation job");

  const res = await sql(
    "delete from posts where is_misinformation = true and is_misinformation_flagged_at <= now() - interval '1 minute'"
  );

  return NextResponse.json({
    nsg: `misinformation post deleted ${res.rowCount}`,
  });
}
