import { useState } from "react";
import { useAvatar } from "../../hook/useAvatar.js";
import PostCommentList from "./PostCommentList";

export default function PostComments({ post }) {
  const { avatarURL } = useAvatar(post);
  const [showComments, setShowComments] = useState(false);
  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
          src={avatarURL}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
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

      {showComments && (
        <PostCommentList
          post={post}
          comments={post?.comments}
        ></PostCommentList>
      )}
    </div>
  );
}
