import { useState } from "react";
import { TBlog } from "../services/blogService";
import LoadingSpinner from "./LoadingSpinner";
import PostItem, { TPost } from "./PostItem";

type TBlogList = {
  postList: TBlog[] | undefined;
};

const postsToShow = 6;

export default function Bloglist({ postList }: TBlogList) {
  const [ListQuantity, setUpdateListQuantity] = useState(postsToShow);
  const [postItemState, setUpdateListItemState] = useState<TPost>();
  const [showPostItem, setShowPostItem] = useState(false);

  const hasList = postList && postList?.length > 0;

  function handleMorePosts() {
    setUpdateListQuantity(ListQuantity + postsToShow);
  }

  function handleOpenPost(
    postId: number,
    postTitle: string,
    postBody: string,
  ) {
    setUpdateListItemState({ postBody, postId, postTitle});
    handleTogglePost();
  }

  function handleTogglePost() {
    setShowPostItem((oldState) => !oldState);
  }

  return hasList ? (
    <>
      <div className="flex justify-center flex-col">
        <ul className="flex flex-wrap justify-center">
          {postList
            ?.slice(0, ListQuantity)
            .map(({ body, id, title, userId }) => {
              return (
                <li key={id}>
                  <article
                    className="bg-[#344D67] rounded max-w-sm min-h-[200px] h-[100%] max-h-[200px] m-5 p-4 cursor-pointer"
                    onClick={() => handleOpenPost(id, title, body)}
                  >
                    <header className="bg-slate-50 flex items-start justify-center text-center">
                      {title}
                    </header>
                    <p className="mt-3 text-yellow-100 line-clamp-4 ">{body}</p>
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
      {showPostItem && (
        <PostItem
          postId={postItemState?.postId}
          postTitle={postItemState?.postTitle}
          postBody={postItemState?.postBody}
          showPostItem={showPostItem}
          handleClosePost={handleTogglePost}
        />
      )}
    </>
  ) : (
    <LoadingSpinner />
  );
}
