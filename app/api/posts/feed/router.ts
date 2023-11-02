import { getJWTPayload } from "@/app/util/auth";
import { sql } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;

  const limit = 10;
  const offset = page * 10;
  const jwtPayload = await getJWTPayload();

  const res = await sql(
    ` select P.*, u.username, u.avatar from posts p 
    inner join users u on p.user_id = u.id where user_id in 
    (select user_id from follows where follower_id = $1) 
    order by create_at desc limit $2 offset $3;`,
    [jwtPayload.sub, limit, offset]
  );

  return NextResponse.json({ data: res.rows });
}
