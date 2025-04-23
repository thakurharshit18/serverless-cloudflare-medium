"use client";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "@/app/config";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Appbar from "../components/appbar";
import { useRouter } from "next/navigation";

export default function Publishblog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter both a title and content.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        alert("Blog published successfully!");
        setTitle("");
        setContent("");
        router.push(`/blog/${response.data.id}`);
      } else {
        alert("Failed to publish blog. Please try again.");
      }
    } catch (error) {
      console.error("Publish Error:", error);
      alert("An error occurred while publishing the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Appbar />
      <div className="max-w-screen-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Publish a Blog
        </h1>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Blog Title"
          className="w-full p-4 text-lg text-gray-800 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition duration-200"
        />

        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="Write your content here..."
          className="w-full p-4 text-lg text-gray-800 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition duration-200"
        />

        <Button
          onClick={handlePublish}
          disabled={loading}
          className={`w-full p-4 text-lg font-semibold text-white rounded-xl transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
          }`}
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </Button>
      </div>
    </div>
  );
}
