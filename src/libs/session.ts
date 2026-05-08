import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export type SessionData = {
  userId: string;
  role: string;
  isLoggedIn: boolean;
};

export const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "dotify_school_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export async function getSession() {
  const cookieStore = cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions,
  );
  return session;
}
