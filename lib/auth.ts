import { NextRequest } from "next/server";
import { supabase } from "./db";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

export async function verifyAuth(
  request: NextRequest,
): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      console.log("No Bearer token found");
      return null;
    }

    const token = authHeader.slice(7);
    console.log("Verifying token:", token.slice(0, 20) + "...");

    // Query the rep_session table to find the user
    const { data: session, error } = await supabase
      .from("rep_session")
      .select(
        `
        id,
        rep_id,
        expires_at,
        rep(id, email, full_name, role)
      `,
      )
      .eq("session_token", token)
      .single();

    if (error) {
      console.log("Session query error:", error.message);
      return null;
    }

    if (!session) {
      console.log("No session found for token");
      return null;
    }

    // Check if session is expired
    const expiresAt = new Date(session.expires_at);
    if (expiresAt < new Date()) {
      console.log("Session expired");
      return null;
    }

    const rep = session.rep as any;
    console.log("Auth successful for user:", rep.id);

    return {
      id: rep.id,
      email: rep.email || "",
      full_name: rep.full_name || "",
      role: rep.role || "rep",
    };
  } catch (error) {
    console.error("Auth verification error:", error);
    return null;
  }
}
