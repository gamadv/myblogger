import React, { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { FetchBlogList } from "../services/blogService";

export default function Home() {
  async function getPostList() {
    try {
      const { data } = await FetchBlogList();
      console.log("🚀 ~ file: App.tsx ~ line 10 ~ getPostList ~ data", data);
    } catch (error) {}
  }


  useEffect(() => {
    getPostList();
  });

  return (
    <main className="mt-6">
      <LoadingSpinner />
    </main>
  );
}
