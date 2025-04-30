"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/" }); // Redirect to the home page after signing in
}

export async function signInWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      // Handle the error (e.g., show a message to the user)
      console.error("Authentication error:", error);
    }
    if (isRedirectError(error)) {
      throw error;
    }
  }
}
