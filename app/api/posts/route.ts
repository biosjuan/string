import { getJWTPayload } from "@/app/util/auth";
import { sql } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const jwtPayload = await getJWTPayload();
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;
  const limit = 10;
  const offset = page - 10;

  const statement = `select p.*, u.avatar, u.username from posts p inner join users u 
  on p.user_id = u.id where user_id = $1
  order by create_at desc limit $2 offset $3`;

  if (username) {
    // TODO
  }

  const res = await sql(statement, [jwtPayload.sub, limit, offset]);

  return NextResponse.json({ data: res.rows });
}
