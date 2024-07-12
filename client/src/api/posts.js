import { baseApi } from "./base";

export function getPosts(options) {
  return baseApi.get("posts", options).then((res) => res.data);
}

export function getPost(postId, options) {
  return baseApi.get(`posts/${postId}`, options).then((res) => res.data);
}

export function getFilteredPost(options) {
  return baseApi
    .get(`/posts?q=${options.query}&userId=${options.userId}`, options)
    .then((res) => res.data);
}

export function updatepost(postId, data, options) {
  console.log(postId == null);
  return baseApi.put(`/posts/${postId}`, data, options).then((res) => res.data);
}
