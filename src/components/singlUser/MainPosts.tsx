import { Box, Grid } from "@mui/material";

import { User } from "../../types/Users";
import { Post, Posts } from "../../types/Posts";
import { Comments, Comment } from "../../types/Comments";
import { RootState } from "../../redux/store";
import { PropPostsCard } from "../../types/Props";
import { useAppSelector } from "../../redux/hooks";
import MainCard from "../posts/MainCard";

export default function MainPosts() {
  const state: RootState = useAppSelector(function (state: RootState) {
    return state;
  });
  const comments: Comments = state.comments.data;
  const posts: Posts = state.posts.data;
  const user: User = state.users.data[0];

  function PropPosts(post: Post): PropPostsCard {
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
    <Box>
      <Grid container spacing={2}>
        {posts.map(function (post: Post) {
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
    </Box>
  );
}
