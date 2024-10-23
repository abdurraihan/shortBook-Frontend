import { useState } from "react";
import { actions } from "../../action/action";
import TheeDotsIcon from "../../assets/icons/3dots.svg";
import DeletIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcom from "../../assets/icons/time.svg";
import { useAuth } from "../../hook/useAuth";
import { useAvatar } from "../../hook/useAvatar";
import useAxios from "../../hook/useAxios.js";
import { usePost } from "../../hook/usePost.js";
import { getDateDifferenceFromNow } from "../../utils";
export default function PostHeader({ post }) {
  const [showAction, setShowAction] = useState();
  const { avatarURL } = useAvatar(post);
  const { auth } = useAuth();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const isMe = post?.author?.id == auth?.user?.id;

  const handleDeletePost = async (event) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
      );

      if (response.status === 200) {
        dispatch({
          type: actions.post.POST_DELETED,
          data: post.id,
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
        error: response.error,
      });
    }
  };

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURL}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcom} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              {`${getDateDifferenceFromNow(post?.createAt)} ago `}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button
            onClick={() => {
              setShowAction(!showAction);
            }}
          >
            <img src={TheeDotsIcon} alt="3dots of Action" />
          </button>
        )}
        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              className="action-menu-item hover:text-red-500"
              onClick={handleDeletePost}
            >
              <img src={DeletIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
