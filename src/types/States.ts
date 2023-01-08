import { Comments } from "./Comments";
import { Posts } from "./Posts";
import { Users } from "./Users";

export enum LoadingStatus {
  Idle = 0,
  Loading = 100,
  Completed = 200,
  Error = 400,
}

export interface FetchState {
  loadingStatus: LoadingStatus;
  data: unknown;
}

export interface UsersState extends Omit<FetchState, "data"> {
  data: Users;
}

export interface PostsState extends Omit<FetchState, "data"> {
  data: Posts;
}

export interface CommentsState extends Omit<FetchState, "data"> {
  data: Comments;
}
