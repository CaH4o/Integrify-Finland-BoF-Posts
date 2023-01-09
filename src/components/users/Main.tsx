import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

import { User, Users } from "../../types/Users";
import { Post, Posts } from "../../types/Posts";
import { RootState } from "../../redux/store";
import { useAppSelector } from "../../redux/hooks";
import { LoadingStatus } from "../../types/States";
import { PropUsersCard } from "../../types/Props";
import MainCard from "./MainCard";

export default function Main() {
  const [renderUsers, setUsers] = useState<Users>([]);
  const state: RootState = useAppSelector(function (state: RootState) {
    return state;
  });
  const users: Users = state.users.data;
  const posts: Posts = state.posts.data;

  useEffect(
    function () {
      if (
        state.posts.loadingStatus === LoadingStatus.Completed &&
        state.users.loadingStatus === LoadingStatus.Completed
      ) {
        setUsers(users);
      }
    },
    [posts, users]
  );

  function PropUsers(user: User): PropUsersCard {
    const countPosts: number = posts.reduce(function (
      prev: number,
      post: Post
    ) {
      return prev + (user.id === post.userId ? 1 : 0);
    },
    0);
    return { ...user, countPosts };
  }

  return (
    <Box>
      <Typography component="h3" variant="h3" m="1rem 0 0 0">
        All Users
      </Typography>
      {renderUsers.length ? (
        <Grid container spacing={2}>
          {renderUsers.map(function (user: User) {
            const propPosts: PropUsersCard = PropUsers(user);
            return (
              <Grid
                item
                key={user.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                display="flex"
                justifyContent="center"
              >
                <MainCard {...propPosts} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <p>No data posts</p>
      )}
    </Box>
  );
}
