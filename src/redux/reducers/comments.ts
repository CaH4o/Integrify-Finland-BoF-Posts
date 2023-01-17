import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Comments, Comment } from "../../types/Comments";
import { LoadingStatus, CommentsState } from "../../types/States";
import { commentsInitialState } from "../../app/initial";
import { deletData, fetchData, postData, Url } from "../../app/api";

const commentsSlice = createSlice({
  name: "users",
  initialState: commentsInitialState(),
  reducers: {
    commentsReset: function (status: CommentsState) {
      return commentsInitialState();
    },
    commentDelete: function (
      status: CommentsState,
      action: PayloadAction<Comment>
    ) {
      const data: Comments = status.data.filter(function (c: Comment) {
        return c.id !== action.payload.id;
      });
      return { ...status, data };
    },
  },
  extraReducers: function (builder) {
    builder
      .addCase(commentsFetch.pending, function (state: CommentsState) {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(commentsFetch.rejected, function (state: CommentsState) {
        state.loadingStatus = LoadingStatus.Error;
      })
      .addCase(
        commentsFetch.fulfilled,
        function (state: CommentsState, action: PayloadAction<Comments>) {
          const commnts: Comments = Array.isArray(action.payload)
            ? action.payload
            : [action.payload];
          state.data = commnts;
          state.loadingStatus = LoadingStatus.Completed;
        }
      );
    builder
      .addCase(commentPost.pending, function (state: CommentsState) {
        state.loadingStatus = LoadingStatus.Posting;
      })
      .addCase(commentPost.rejected, function (state: CommentsState) {
        state.loadingStatus = LoadingStatus.Error;
      })
      .addCase(
        commentPost.fulfilled,
        function (state: CommentsState, action: PayloadAction<Comment>) {
          state.loadingStatus = LoadingStatus.Completed;
          const comment: Comment = action.payload;
          const id: number = new Date().getUTCMilliseconds();
          state.data = [...state.data, { ...comment, id }];
        }
      );
    builder
      .addCase(commentDeleteThunk.pending, function (state: CommentsState) {
        state.loadingStatus = LoadingStatus.Deleting;
      })
      .addCase(commentDeleteThunk.rejected, function (state: CommentsState) {
        state.loadingStatus = LoadingStatus.Error;
      })
      .addCase(commentDeleteThunk.fulfilled, function (state: CommentsState) {
        state.loadingStatus = LoadingStatus.Completed;
      });
  },
});

export const commentsFetch = createAsyncThunk(
  "commentsFetch",
  async function (urlAdd: string): Promise<Comments> {
    return await fetchData<Comments>(Url.Comments, urlAdd);
  }
);

export const commentPost = createAsyncThunk(
  "postPost",
  async function (comment: Comment): Promise<Comment> {
    return await postData<Comment>(Url.Comments, "", comment);
  }
);

export const commentDeleteThunk = createAsyncThunk(
  "commentDelete",
  async function (id: string): Promise<Comment> {
    return await deletData<Comment>(Url.Comments, id);
  }
);

const commentsReducer = commentsSlice.reducer;
export const { commentsReset, commentDelete } = commentsSlice.actions;
export default commentsReducer;
