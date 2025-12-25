"use server";

import { auth } from "@/auth";

export async function getCurrentUser() {
  try {
    const session = await auth();

    if (session) {
      return session.user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}
