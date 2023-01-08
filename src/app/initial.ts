import {
  CommentsState,
  LoadingStatus,
  PostsState,
  UsersState,
} from "../types/States";

export function usersInitialState(): UsersState {
  return {
    loadingStatus: LoadingStatus.Idle,
    data: [],
  };
}

export function postsInitialState(): PostsState {
  return {
    loadingStatus: LoadingStatus.Idle,
    data: [],
  };
}

export function commentsInitialState(): CommentsState {
  return {
    loadingStatus: LoadingStatus.Idle,
    data: [],
  };
}
