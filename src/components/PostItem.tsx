import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useErrorModal } from "../context/ModalContext";
import { FetchBlogList, FetchUserInfo } from "../services/blogService";
import LoadingSpinner from "./LoadingSpinner";

export type TPost = {
  postId?: number;
  postTitle?: string;
  postBody?: string;
};

type TPostItem = TPost & {
  showPostItem: boolean;
  handleClosePost: () => void;
};

type TPostCommentList = {
  id: number;
  author: string;
  postTitle: string;
  postComment: string;
};

export default function PostItem({
  postId,
  postTitle,
  postBody,
  showPostItem,
  handleClosePost,
}: TPostItem) {
  const { handleGetModalInfo } = useErrorModal();
  const [postCommentsList, setPostCommentsList] =
    useState<TPostCommentList[]>();

  async function getCommentsList() {
    try {
      const { data: commentsList } = await FetchBlogList(postId);

      const parseData = commentsList.map((comment) => {
        return {
          id: comment.id,
          author: comment.email,
          postTitle: comment.title,
          postComment: comment.body,
        };
      });

      setPostCommentsList(parseData);
    } catch (error) {
      handleGetModalInfo(
        "error",
        "Cannot fetch comments list, please try again or contact the admin"
      );
    }
  }

  useEffect(() => {
    if (!postId) return;
    getCommentsList();
  }, []);

  return showPostItem ? (
    <>
      {ReactDOM.createPortal(
        <>
          <div
            onClick={handleClosePost}
            className="bg-gray-900 opacity-70 fixed left-0 top-0 w-screen h-fill overflow-auto"
          ></div>
          <section
            className="bg-slate-200 rounded pb-6 fixed m-auto top-20 left-[5%] sm:left-[25%] xl:left-[30%] z-10 max-w-[330px] lg:max-w-2xl w-[100%] max-h-[600px] overflow-hidden"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <div className="h-[100%] w-[100%]">
              <header className="flex items-center justify-between px-6 bg-yellow-100">
                <p className="line-clamp-1 font-bold">{postTitle}</p>
                <button
                  className="text-6xl text-[#344D67]"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleClosePost}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </header>
              <div className="flex flex-col px-6 my-5">
                <p className="border-b-2 border-b-gray-300 pb-6">{postBody}</p>
                <p className="text-lg mt-4 font-bold">Comments</p>
                <div>
                  <ul className="max-h-[180px] lg:max-h-[280px] overflow-y-scroll">
                    {postCommentsList ? (
                      postCommentsList?.map(
                        ({ id, author, postComment, postTitle }) => {
                          return (
                            <li key={id} className="flex flex-col my-4 p-4 gap-2 rounded border-solid border-gray-700 border-2 max-w-[600px]">
                              <p>User: {author}</p>
                              <p>{postTitle}</p>
                              <p>{postComment}</p>
                            </li>
                          );
                        }
                      )
                    ) : (
                      <LoadingSpinner />
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>,
        document.body
      )}
    </>
  ) : null;
}
