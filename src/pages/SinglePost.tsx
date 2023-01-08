import { useEffect } from "react";
import { Box } from "@mui/material";
import { Params, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { usersFetch } from "../redux/reducers/users";
import { RootState } from "../redux/store";
import { postsFetch } from "../redux/reducers/posts";
import { commentsFetch } from "../redux/reducers/comments";
import Header from "../components/Header";
import Main from "../components/singlPost/Main";
import { Post } from "../types/Posts";
import { LoadingStatus, PostsState } from "../types/States";

export default function SinglePost(): JSX.Element {
  const dispatch = useAppDispatch();
  const params: Readonly<Params<string>> = useParams();
  const urlPost: string = `/${params.id}`;
  const urlComment: string = `/?postId=${params.id}`;
  const postsState: PostsState = useAppSelector(function (state) {
    return state.posts;
  });
  const postStatus: LoadingStatus = postsState.loadingStatus;

  useEffect(function () {
    dispatch(postsFetch(urlPost));
    dispatch(commentsFetch(urlComment));
  }, []);

  useEffect(
    function () {
      if (postStatus === LoadingStatus.Completed) {
        const post: Post = postsState.data[0];
        const userID: number = post.userId;
        const urlUser: string = `/${userID.toString()}`;
        dispatch(usersFetch(urlUser));
      }
    },
    [postStatus]
  );

  return (
    <Box component="div">
      <Header />
      <Main />
    </Box>
  );
}
