import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getUsers } from "../api/users";
import { PostForm, postFormValidator } from "../components/PostFrom";

function NewPost() {
  const users = useLoaderData();
  const { state } = useNavigation();
  const isSubmiting = state === "submitting";
  const errors = useActionData();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm
        users={users}
        method={"post"}
        isSubmiting={isSubmiting}
        errors={errors}
      />
    </>
  );
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
}

async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const userId = formData.get("userId");
  const body = formData.get("body");

  const errors = postFormValidator({ title, userId, body });
  if (Object.keys(errors).length > 0) return errors;

  const post = await fetch("http://localhost:3000/posts", {
    method: "POST",
    signal: request.signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, userId, body, completed: false }),
  }).then((res) => res.json());

  return redirect(`/posts/${post.id}`);
}

export const newPostRoute = { element: <NewPost />, loader, action };
