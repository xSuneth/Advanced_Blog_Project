import { Link, useActionData, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";
import { PostForm } from "../components/PostFrom";
import { getPost, updatepost } from "../api/posts";

function EditPost() {
  const { post, users } = useLoaderData();
  const { state } = useNavigation();
  const isSubmiting = state === "submitting";

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        users={users}
        defaultValues={post}
        method={"put"}
        isSubmiting={isSubmiting}
      />
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const posts = getPost(postId, { signal });
  const users = getUsers({ signal });
  return { post: await posts, users: await users };
}

async function action({ request, params: { postId } }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const userId = formData.get("userId");
  const body = formData.get("body");

  const post = await updatepost(
    postId,
    { title, body, userId },
    { signal: request.signal }
  );

  return redirect(`/posts/${post.id}`);
}

export const editPostRoute = {
  element: <EditPost />,
  loader,
  action,
};
