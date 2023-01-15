import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Comments } from "../../types/Comments";
import { LoadingStatus, CommentsState } from "../../types/States";
import { commentsInitialState } from "../../app/initial";
import { fetchData, Url } from "../../app/api";

const commentsSlice = createSlice({
  name: "users",
  initialState: commentsInitialState(),
  reducers: {
    commentReset: function (status: CommentsState) {
      return commentsInitialState();
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
  },
});

export const commentsFetch = createAsyncThunk(
  "commentsFetch",
  async function (urlAdd: string): Promise<Comments> {
    return await fetchData<Comments>(Url.Comments, urlAdd);
  }
);

const commentsReducer = commentsSlice.reducer;
export const {} = commentsSlice.actions;
export default commentsReducer;
