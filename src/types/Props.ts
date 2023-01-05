import { Dispatch, SetStateAction } from "react";

import { User } from "./Users";
import { Post } from "./Posts";

export interface PropPostsCard extends Omit<Post, "userId"> {
  user: User;
  countComments?: number;
  countPosts?: number;
}

export interface PropPostsSearch {
  setSearch: Dispatch<SetStateAction<string>>;
  search: string;
}