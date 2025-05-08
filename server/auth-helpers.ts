import { headers } from "next/headers";
import { auth } from "./api/auth";

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return {
    session,
    isLoggedIn: session !== null,
  };
}
