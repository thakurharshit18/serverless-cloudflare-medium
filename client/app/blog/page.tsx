"use client";
import Appbar from "../components/appbar";
import Blogcard from "../components/blogcard";
import { useBlogs } from "@/hooks";

export default function Blog() {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="max-w-screen-md mx-auto mt-8 space-y-6 px-4">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse p-6 rounded-xl bg-white shadow-md space-y-4"
            >
              <div className="h-6 bg-gray-300 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />

      <div className="max-w-screen-md mx-auto mt-8 space-y-6 px-4">
        {blogs.map((blog) => (
          <Blogcard
            key={blog.id}
            id={blog.id}
            authorname={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd Feb"}
          />
        ))}
      </div>
    </div>
  );
}
