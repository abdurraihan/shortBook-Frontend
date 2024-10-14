import { useEffect, useReducer } from "react";
import { actions } from "../action/action";
import PostList from "../components/posts/PostList";
import { useAuth } from "../hook/useAuth";
import useAxios from "../hook/useAxios.js";
import { initialState, postReducer } from "../reducers/postReducer";

export default function HomePage() {
  const { auth } = useAuth();
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );

        if (response.status === 200) {
          dispatch({ type: actions.post.DATA_FETCHED, data: response.data });
        }
      } catch (error) {
        console.log(error);

        dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
      }
    };

    fetchPost();
  }, [api]);

  if (state?.loading) {
    return <div>Loading...</div>;
  }

  if (state?.error) {
    return <div>Error: {state.error}</div>;
  }

  return (
    <div>
      <PostList posts={state?.posts}></PostList>
    </div>
  );
}
