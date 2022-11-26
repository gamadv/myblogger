import { useState } from "react";
import { TBlog } from "../services/blogService";
import LoadingSpinner from "./LoadingSpinner";

type TBlogList = {
  postList: TBlog[] | undefined;
};
const postsToShow = 4;

export default function Bloglist({ postList }: TBlogList) {
  const [ListQuantity, setUpdateListQuantity] = useState(postsToShow);

  const hasList = postList && postList?.length > 0;

  function handleMorePosts() {
    setUpdateListQuantity(ListQuantity + postsToShow);
  }

  return hasList ? (
    <div className="flex justify-center flex-col">
      <ul className="flex flex-wrap">
        {postList?.slice(0, ListQuantity).map(({ body, id, title, userId }) => {
          return (
            <li key={id}>
              <article className="bg-[#344D67] rounded min-w-[300px] w-[100%] max-w-[600px] min-h-[200px] max-h-[200px] line-clamp-5 m-5 p-4 cursor-pointer">
                <header className="bg-slate-50 flex items-start justify-center text-center">
                  {title}
                </header>
                <p className="mt-3 text-yellow-100">{body}</p>
              </article>
            </li>
          );
        })}
      </ul>
      {ListQuantity < postList?.length && (
        <button
          className="mt-4 p-2 bg-slate-100 text-[#344D67] max-w-[150px] self-center"
          onClick={handleMorePosts}
        >
          Mostrar mais +
        </button>
      )}
    </div>
  ) : (
    <LoadingSpinner />
  );
}
