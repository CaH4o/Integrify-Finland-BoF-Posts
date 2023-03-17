import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import commentsReducer from "./reducers/comments";
import postsReducer from "./reducers/posts";
import usersReducer from "./reducers/users";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
