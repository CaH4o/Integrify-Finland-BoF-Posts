import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { User } from "../../types/Users";
import { Posts } from "../../types/Posts";
import { Comments } from "../../types/Comments";
import { PropUsersCard } from "../../types/Props";
import { RootState } from "../../redux/store";
import { LoadingStatus } from "../../types/States";
import { useAppSelector } from "../../redux/hooks";
import MainCard from "../users/MainCard";
import MainPosts from "./MainPosts";

export default function Main() {
  const [isRender, setRender] = useState<boolean>(false);
  const state: RootState = useAppSelector(function (state: RootState) {
    return state;
  });
  const comments: Comments = state.comments.data;
  const posts: Posts = state.posts.data;
  const countPosts: number = posts.length;
  const user: User = state.users.data[0];
  const userCard: PropUsersCard = { ...user, countPosts };

  useEffect(
    function () {
      if (
        state.posts.loadingStatus === LoadingStatus.Completed &&
        state.users.loadingStatus === LoadingStatus.Completed &&
        state.comments.loadingStatus === LoadingStatus.Completed
      ) {
        setRender(true);
      }
    },
    [posts, comments, user]
  );

  return (
    <>
      {isRender ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <MainCard {...userCard} />
          {posts.length > 1 ? (
            <>
              <Typography variant="h4" component="h4" className="LinkLine">
                Posts by {user.name}
              </Typography>
              <MainPosts />
            </>
          ) : null}
        </Box>
      ) : null}
    </>
  );
}
