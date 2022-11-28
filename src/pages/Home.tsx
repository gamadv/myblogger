import { useEffect, useState } from "react";
import Bloglist from "../components/Bloglist";
import { useErrorModal } from "../context/ModalContext";
import { FetchBlogList, TBlog } from "../services/blogService";

export default function Home() {
  const { handleGetModalInfo } = useErrorModal();
  const [postList, setPostList] = useState<TBlog[]>();
  
  async function getPostList() {
    try {
      const { data: postListData } = await FetchBlogList();
      setPostList(postListData);
    } catch (error) {
      console.log("cheguei no try");
      handleGetModalInfo(
        "error",
        "Cannot fetch blog list, please try again or contact the admin"
      );
    }
  }

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <main className="mt-6 max-w-7xl m-auto pb-9">
      <Bloglist postList={postList} />
    </main>
  );
}
