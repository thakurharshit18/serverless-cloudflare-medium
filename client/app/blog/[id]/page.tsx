"use client";
import Appbar from "@/app/components/appbar";
import { useBlogById } from "@/hooks/idblog";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { blog, loading, error } = useBlogById(id);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 text-xl">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Error: {error}
      </div>
    );
  if (!blog)
    return (
      <div className="text-center mt-20 text-gray-400 text-xl">
        Blog not found
      </div>
    );

  return (
    <div className="bg-white text-black min-h-screen font-serif">
      <Appbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 text-gray-700 text-sm mb-10"></div>

        <div className="prose prose-lg max-w-none prose-black">
          {blog.content.split("\n").map((para, idx) => (
            <p key={idx} className="mb-5 leading-relaxed tracking-wide">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
