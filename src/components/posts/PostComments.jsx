import { useState } from "react";
import { useAuth } from "../../hook/useAuth.js";
import { useAvatar } from "../../hook/useAvatar.js";
import useAxios from "../../hook/useAxios.js";
import PostCommentList from "./PostCommentList";
export default function PostComments({ post }) {
  const { auth } = useAuth();
  const { avatarURL } = useAvatar(post);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { api } = useAxios();

  const addComent = async (event) => {
    const keyCode = event.keyCode;

    if (keyCode === 13) {
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );
        console.log("response", response);
        if (response?.status === 200) {
          setComments([...response.data.comments]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => addComent(e)}
            placeholder="What's on your mind?"
          />
        </div>
      </div>

      <div className="mt-4">
        <button
          className="text-gray-300 max-md:text-sm"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          All Comment ▾
        </button>
      </div>

      {showComments && <PostCommentList comments={comments}></PostCommentList>}
    </div>
  );
}
