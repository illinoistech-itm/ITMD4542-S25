"use client";

import { redirect } from "next/navigation";
import { signInWithCredentials, signInWithGitHub } from "../login-actions";

export default function SignIn() {
  return (
    <>
      <form action={signInWithGitHub}>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white border-2 border-blue-500"
        >
          Signin with GitHub
        </button>
      </form>
      <form
        action={async (formData: FormData) => {
          signInWithCredentials(formData);
          redirect("/");
        }}
      >
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button>Sign In</button>
      </form>
    </>
  );
}
