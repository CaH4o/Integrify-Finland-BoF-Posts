import { RootState } from "../redux/store";
import { Comment, Comments } from "../types/Comments";
import { Post, Posts } from "../types/Posts";
import { Queries, QueryPosts } from "../types/Queries";
import { LoadingStatus } from "../types/States";
import { User, Users } from "../types/Users";
import { useAppSelector } from "./hooks";

export default function useQueries(query: Queries): QueryPosts {
  const state: RootState = useAppSelector(function (state) {
    return state;
  });
  const comments: Comments = state.comments.data;
  const posts: Posts = state.posts.data;
  const users: Users = state.users.data;

  if (
    state.comments.loadingStatus !== LoadingStatus.Completed ||
    state.posts.loadingStatus !== LoadingStatus.Completed ||
    state.users.loadingStatus !== LoadingStatus.Completed
  ) {
    return [];
  }

  switch (query) {
    case Queries.Posts:
      const queryPosts: QueryPosts = posts.map(function (p: Post) {
        const userIndex: number = users.findIndex(function (u: User) {
          return u.id === p.userId;
        });
        const user: User = JSON.parse(JSON.stringify(users[userIndex]));
        const countComments: number = comments.reduce(function (
          prev: number,
          c: Comment
        ) {
          return prev + (c.postId === p.id ? 1 : 0);
        },
        0);

        return { ...p, user, countComments };
      });

      return queryPosts;
      break;
    default:
      return [];
      break;
  }
}
