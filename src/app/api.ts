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

export async function fetchData<T>(urlMain: Url, urlAdd: string): Promise<T> {
  const url: string = urls.get(urlMain)!.concat(urlAdd);
  const response = await axios.get(url);

  if (response.status < 400) {
    return response.data;
  } else {
    throw new Error(response.status.toString() + "" + response.statusText);
  }
}

export async function postData<T>(
  urlMain: Url,
  urlAdd: string,
  data: T
): Promise<T> {
  const url: string = urls.get(urlMain)!.concat(urlAdd);
  const response = await axios.post(url, data);

  if (response.status < 400) {
    return response.data;
  } else {
    throw new Error(response.status.toString() + "" + response.statusText);
  }
}
