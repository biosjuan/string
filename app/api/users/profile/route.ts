import { getJWTPayload } from "@/app/util/auth";
import { sql } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // get currtly logged user
  const jwtPayload = await getJWTPayload();
  console.log(jwtPayload);
  // fetch user data
  const res = await sql(
    "select id, username, avatar from users where id = $1",
    [jwtPayload?.sub!]
  );
  // return user data
  const user = res.rows[0];

  return NextResponse.json({});
}
