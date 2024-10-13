import PostAction from "./PostAction";
import PostBody from "./PostBody";
import PostComments from "./PostComments";
import PostHeader from "./PostHeader";

export default function PostCard({ post }) {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post}></PostHeader>
      <PostBody poster={post?.image} content={post?.content}></PostBody>
      <PostAction
        postId={post?.id}
        commentCoutn={post?.comments?.length}
      ></PostAction>
      <PostComments post={post}></PostComments>
    </article>
  );
}
