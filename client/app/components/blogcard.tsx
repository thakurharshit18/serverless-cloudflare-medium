"use client";

import Link from "next/link";

interface BlogCardProps {
  authorname: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export default function Blogcard({
  authorname,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <div>
        <div className="p-4 border rounded-md shadow-md bg-white max-w-xl mx-auto my-4 cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <Avatar name={authorname} />
            <div className="text-sm text-gray-600 font-light">
              {authorname} • {publishedDate}
            </div>
          </div>

          <div className="text-lg font-semibold mb-1">{title}</div>

          <div className="text-sm text-gray-700 mb-2">
            {content.slice(0, 100)}...
          </div>

          <div className="text-xs text-gray-500">
            {`${Math.ceil(content.length / 100)} minute read`}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
      <span className="text-sm font-medium text-gray-800">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
