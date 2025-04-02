import Link from "next/link";

export default function NotFound() {
  return (
    <div className="">
      <h1>Not Found - 404 (from dynamic)</h1>
      <Link href="/">Go back to Home</Link>
    </div>
  );
}
