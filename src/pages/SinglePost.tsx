import { useEffect } from "react";
import { Box } from "@mui/material";
import { Params, useParams } from "react-router-dom";

import { Post } from "../types/Posts";
import { RootState } from "../redux/store";
import { LoadingStatus } from "../types/States";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { usersFetch, usersReset } from "../redux/reducers/users";
import { postsFetch } from "../redux/reducers/posts";
import { commentsFetch, commentsReset } from "../redux/reducers/comments";
import Main from "../components/singlPost/Main";

export default function SinglePost(): JSX.Element {
  const dispatch = useAppDispatch();
  const params: Readonly<Params<string>> = useParams();
  const urlPost: string = `/${params.id}`;
  const urlComment: string = `/?postId=${params.id}`;
  const state: RootState = useAppSelector(function (state) {
    return state;
  });

  useEffect(function () {
    dispatch(commentsReset());
    dispatch(postsFetch(urlPost));
    if (state.users.loadingStatus === LoadingStatus.Completed)
      dispatch(usersReset());
  }, []);

  useEffect(
    function () {
      if (
        state.users.loadingStatus === LoadingStatus.Idle &&
        state.posts.loadingStatus === LoadingStatus.Completed
      ) {
        const post: Post = state.posts.data[0];
        const userID: number = post.userId;
        const urlPosts: string = `/?userId=${userID.toString()}`;
        const urlUser: string = `/${userID.toString()}`;
        dispatch(usersFetch(urlUser));
        dispatch(postsFetch(urlPosts));
        dispatch(commentsFetch(urlComment));
      }
    },
    [state.users.loadingStatus, state.posts.loadingStatus]
  );

  return (
    <Box component="div">
      <Main id={params.id || ""} />
    </Box>
  );
}
