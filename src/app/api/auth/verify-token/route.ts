import { getAuth } from "firebase-admin/auth";
import { adminApp } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    if (!adminApp) {
      console.error("Firebase Admin could not be initialized. Check environment variables.");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    }

    // Verify the ID token
    const decodedToken = await getAuth(adminApp).verifyIdToken(idToken);
    const { uid, phone_number } = decodedToken;

    // In a real app, you might want to create a session cookie here using Firebase Auth
    // or just set your own secure cookie. The user asked for a secure HTTP-only cookie.
    // For simplicity and security, we'll set a cookie with the UID or a custom session.
    
    const response = NextResponse.json({
      success: true,
      uid,
      phoneNumber: phone_number,
    });

    // Set a secure HTTP-only cookie
    response.cookies.set("session", uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
