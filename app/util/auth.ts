import { jwtVerify } from "jose";
import { cookies } from "next/headers";
export async function getJWTPayload() {
  const cookieStore = cookies();
  console.log(cookieStore);
  const token = cookieStore.get("jwt-token");
  console.log(token);
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const { payload, protectedHeader } = await jwtVerify(token?.value!, secret);
  return payload;
}
