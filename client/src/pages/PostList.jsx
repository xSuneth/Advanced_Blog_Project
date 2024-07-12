import { Form, Link, useLoaderData } from "react-router-dom";
import { getPosts } from "../api/posts";
import { PostCard } from "../components/PostCard";
import { getUsers } from "../api/users";
import { useEffect, useId, useRef } from "react";

function PostList() {
  const {
    posts,
    users,
    searchParams: { query = "", userId = "" },
  } = useLoaderData();

  const queryRef = useRef();
  const userIdref = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  useEffect(() => {
    userIdref.current.value = userId;
  }, [userId]);

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>
      <Form method="get" action="/posts" className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId" ref={userIdref}>
              <option value="">Any</option>
              {users.map((user) => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
      <div className="card-grid">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query");
  const userId = searchParams.get("userId");
  const filterParams = { q: query };
  if (useId !== "") filterParams.userId = userId;

  //Getting data from the filtered posts
  const posts = getPosts({ signal, params: filterParams });

  //Getting data from the users
  const users = getUsers({ signal });
  return {
    users: await users,
    posts: await posts,
    searchParams: { query, useId: userId || "" },
  };
}

export const postListRoute = {
  loader,
  element: <PostList />,
};
