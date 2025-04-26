import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/" }); // Redirect to the home page after signing in
      }}
    >
      <button
        type="submit"
        className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white border-2 border-blue-500"
      >
        Signin with GitHub
      </button>
    </form>
  );
}
