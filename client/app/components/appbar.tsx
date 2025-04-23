"use  client";

import { Avatar } from "./blogcard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Appbar() {
  const router = useRouter();
  return (
    <div className="border-b flex justify-between items-center px-10 py-4 shadow-sm">
      <Link href="/blog">
        <div className="text-xl font-semibold tracking-wide cursor-pointer hover:scale-105 transition-transform duration-200">
          Medium
        </div>
      </Link>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          onClick={() => router.push("/publishblog")}
        >
          New
        </button>
        <span className="text-sm font-light tracking-wide">Welcome back</span>
        <Avatar name="Harshit" />
      </div>
    </div>
  );
}
