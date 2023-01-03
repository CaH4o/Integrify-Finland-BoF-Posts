import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Posts } from "../../types/Posts";
import { LoadingStatus, PostsState } from "../../types/States";
import { postsInitialState } from "../../app/initial";
import { fetchData, Url } from "../../app/api";

const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState(),
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(postsFetch.pending, function (state: PostsState) {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(postsFetch.rejected, function (state: PostsState) {
        state.loadingStatus = LoadingStatus.Error;
      })
      .addCase(
        postsFetch.fulfilled,
        function (state: PostsState, action: PayloadAction<Posts>) {
          state.data = action.payload;
          state.loadingStatus = LoadingStatus.Completed;
        }
      );
  },
});

export const postsFetch = createAsyncThunk(
  "postsFetch",
  async function (): Promise<Posts> {
    return await fetchData<Posts>(Url.Posts);
  }
);

const postsReducer = postsSlice.reducer;
export const {} = postsSlice.actions;
export default postsReducer;
