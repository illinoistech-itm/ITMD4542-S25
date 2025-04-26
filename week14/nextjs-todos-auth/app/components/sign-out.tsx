import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white border-2 border-blue-500"
      >
        Sign Out
      </button>
    </form>
  );
}
