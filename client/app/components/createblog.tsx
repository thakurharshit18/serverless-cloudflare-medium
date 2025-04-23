"use client";

import React from "react";

export default function CreateComponent() {
  return (
    <div className="min-h-screen bg-white text-black px-4 py-8 flex justify-center items-start">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold">Create a New Blog</h1>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter blog title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Blog Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your blog content here..."
            rows={10}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-900 transition"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
