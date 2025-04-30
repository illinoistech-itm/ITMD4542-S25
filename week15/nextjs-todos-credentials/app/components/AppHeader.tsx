import { auth } from "@/auth";
import { SignOut } from "./sign-out";

export default async function AppHeader() {
  const session = await auth();
  console.log("Session:", session);
  return (
    <header className="bg-gray-800 text-white p-8 flex flex-col items-center gap-2">
      <h1 className="font-bold text-4xl">NextJS Postgres Todos</h1>
      <p className="text-gray-300">{session ? session.user?.name : null}</p>
      <p className="text-gray-300">{session ? session.user?.uid : null}</p>
      <p className="text-gray-300">
        This is a simple Todo App using NextJS, Tailwind, and Postgres as a
        database.
      </p>
      {session ? <SignOut /> : null}
    </header>
  );
}
