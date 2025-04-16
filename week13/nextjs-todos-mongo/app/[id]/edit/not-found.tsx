import Link from "next/link";

export default function NotFound() {
  return (
    <div className="">
      <h1>Todo Not Found - 404</h1>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
