import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Comments } from "../../types/Comments";
import { LoadingStatus, CommentsState } from "../../types/States";
import { commentsInitialState } from "../../app/initial";
import { fetchData, Url } from "../../app/api";

const commentsSlice = createSlice({
  name: "users",
  initialState: commentsInitialState(),
  reducers: {},
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
          state.data = action.payload;
          state.loadingStatus = LoadingStatus.Completed;
        }
      );
  },
});

export const commentsFetch = createAsyncThunk(
  "commentsFetch",
  async function (): Promise<Comments> {
    return await fetchData<Comments>(Url.Comments);
  }
);

const commentsReducer = commentsSlice.reducer;
export const {} = commentsSlice.actions;
export default commentsReducer;
