import axios from "axios";

export enum Url {
  Users = "USERS",
  Posts = "POSTS",
  Comments = "COMMENTS",
}

const urls: Map<Url, string> = new Map()
  .set(Url.Users, "https://jsonplaceholder.typicode.com/users")
  .set(Url.Posts, "https://jsonplaceholder.typicode.com/posts")
  .set(Url.Comments, "https://jsonplaceholder.typicode.com/comments");

export async function fetchData(url: Url) {
  const _url: string = urls.get(url)!;
  const response = await axios.get(_url);

  if (response.status < 400) {
    console.log(response.data);
    return response.data;
  } else {
    throw new Error(response.status.toString() + "" + response.statusText);
  }
}
