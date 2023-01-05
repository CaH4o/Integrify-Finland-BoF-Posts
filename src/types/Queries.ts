import { User } from "./Users";
import { Post } from "./Posts";
import { Comment } from "./Comments";

export type QueryCommetns = QueryCommetn[];

export interface QueryCommetn extends Omit<Comment, "postId"> {
  post: QueryPost;
}

export type QueryPosts = QueryPost[];

export interface QueryPost extends Omit<Post, "userId"> {
  user: User;
  countComments?: number;
}

export enum Queries {
  Posts,
  Users,
  SinglePost,
  SingleUser,
}
