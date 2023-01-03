import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Users } from "../../types/Users";
import { LoadingStatus, UsersState } from "../../types/States";
import { usersInitialState } from "../../app/initial";
import { fetchData, Url } from "../../app/api";

const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState(),
  reducers: {},
  extraReducers: function (builder) {
    builder
      .addCase(usersFetch.pending, function (state: UsersState) {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(usersFetch.rejected, function (state: UsersState) {
        state.loadingStatus = LoadingStatus.Error;
      })
      .addCase(
        usersFetch.fulfilled,
        function (state: UsersState, action: PayloadAction<Users>) {
          state.data = action.payload;
          state.loadingStatus = LoadingStatus.Completed;
        }
      );
  },
});

export const usersFetch = createAsyncThunk(
  "usersFetch",
  async function (): Promise<Users> {
    return await fetchData<Users>(Url.Users);
  }
);

const usersReducer = usersSlice.reducer;
export const {} = usersSlice.actions;
export default usersReducer;
