import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Post, Posts } from "../../types/Posts";
import { LoadingStatus, PostsState } from "../../types/States";
import { postsInitialState } from "../../app/initial";
import { fetchData, postData, Url } from "../../app/api";

const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState(),
  reducers: {
    postsReset: function (status: PostsState) {
      return postsInitialState();
    },
  },
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
          const posts: Posts = Array.isArray(action.payload)
            ? action.payload
            : [action.payload];
          state.data = posts;
          state.loadingStatus = LoadingStatus.Completed;
        }
      );
    builder
      .addCase(postPost.pending, function (state: PostsState) {
        state.loadingStatus = LoadingStatus.Posting;
      })
      .addCase(postPost.rejected, function (state: PostsState) {
        state.loadingStatus = LoadingStatus.Error;
      })
      .addCase(
        postPost.fulfilled,
        function (state: PostsState, action: PayloadAction<Post>) {
          state.loadingStatus = LoadingStatus.Completed;
          const post: Post = action.payload;
          post.id = state.data.length + 1;
          state.data = [...state.data, post];
        }
      );
  },
});

export const postsFetch = createAsyncThunk(
  "postsFetch",
  async function (urlAdd: string): Promise<Posts> {
    return await fetchData<Posts>(Url.Posts, urlAdd);
  }
);

export const postPost = createAsyncThunk(
  "postPost",
  async function (post: Post): Promise<Post> {
    return await postData<Post>(Url.Posts, "", post);
  }
);

const postsReducer = postsSlice.reducer;
export const { postsReset } = postsSlice.actions;
export default postsReducer;
