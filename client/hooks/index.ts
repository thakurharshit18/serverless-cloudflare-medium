"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}
export const useBlogs = () => {
  const [loading, setloading] = useState(true);
  const [blogs, setblogs] = useState<Blog[]>([]);
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setblogs(response.data.blogs);
        setloading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
