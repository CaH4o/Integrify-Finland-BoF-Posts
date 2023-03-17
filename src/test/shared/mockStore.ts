import { configureStore } from "@reduxjs/toolkit";

import commentsReducer from "../../redux/reducers/comments";
import postsReducer from "../../redux/reducers/posts";
import usersReducer from "../../redux/reducers/users";

export default function createStore() {
  const store = configureStore({
    reducer: {
      commentsReducer,
      postsReducer,
      usersReducer,
    },
  });

  return store;
}
