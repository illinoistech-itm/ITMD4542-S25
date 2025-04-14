"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center space-x-4 mb-6 p-2 bg-gray-400">
      <Link
        className={clsx(
          "px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white border-2 border-blue-500",
          {
            "bg-blue-600! text-white": pathname === "/",
          }
        )}
        href="/"
      >
        All Todos
      </Link>
      <Link
        className={clsx(
          "px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white border-2 border-blue-500",
          {
            "bg-blue-600! text-white": pathname === "/new",
          }
        )}
        href="/new"
      >
        New Todo
      </Link>
      <Link
        className={clsx(
          "px-4 py-2 bg-white text-blue-500 rounded hover:bg-blue-600 hover:text-white border-2 border-blue-500",
          {
            "bg-blue-600! text-white": pathname === "/completed",
          }
        )}
        href="/completed"
      >
        Completed Todos
      </Link>
    </nav>
  );
}
