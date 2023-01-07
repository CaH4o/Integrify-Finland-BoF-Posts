import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import { RootState } from "../../redux/store";
import { Comment, Comments } from "../../types/Comments";
import { Post, Posts } from "../../types/Posts";
import { User, Users } from "../../types/Users";
import { PropPostsCard } from "../../types/Props";
import { useAppSelector } from "../../redux/hooks";
import { LoadingStatus } from "../../types/States";
import MainCard from "./MainCard";
import MainSrearch from "./MainSrearch";

export default function Main(): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [renderPosts, setPosts] = useState<Posts>([]);
  const state: RootState = useAppSelector(function (state) {
    return state;
  });
  const posts: Posts = state.posts.data;
  const users: Users = state.users.data;
  const comments: Comments = state.comments.data;

  useEffect(
    function () {
      if (
        state.posts.loadingStatus === LoadingStatus.Completed &&
        state.users.loadingStatus === LoadingStatus.Completed &&
        state.comments.loadingStatus === LoadingStatus.Completed
      ) {
        setPosts(posts);
      }
    },
    [posts, comments, users]
  );

  useEffect(
    function () {
      const searchPosts: Posts = posts.filter(function (p: Post) {
        return p.title.toLowerCase().includes(search.toLowerCase());
      });
      setPosts(searchPosts);
    },
    [search]
  );

  function PropPosts(post: Post): PropPostsCard {
    const user: User = users.find(function (u: User) {
      return u.id === post.userId;
    })!;
    const countComments: number = comments.reduce(function (
      prev: number,
      c: Comment
    ) {
      return prev + (c.postId === post.id ? 1 : 0);
    },
    0);
    return { ...post, user, countComments };
  }

  return (
    <Box component="div">
      <MainSrearch setSearch={setSearch} search={search} />
      {renderPosts.length ? (
        <Grid container spacing={2}>
          {renderPosts.map(function (post: Post) {
            const propPosts: PropPostsCard = PropPosts(post);
            return (
              <Grid
                item
                key={post.id}
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
