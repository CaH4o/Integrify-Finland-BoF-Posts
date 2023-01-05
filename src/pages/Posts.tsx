import { useEffect } from "react";
import { Box } from "@mui/material";

import { useAppDispatch } from "../app/hooks";
import Header from "../components/Header";
import { usersFetch } from "../redux/reducers/users";
import { commentsFetch } from "../redux/reducers/comments";
import { postsFetch } from "../redux/reducers/posts";
import { QueryPosts, QueryPost, Queries } from "../types/Queries";
import useQueries from "../app/queries";

export default function (): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(usersFetch());
    dispatch(postsFetch());
    dispatch(commentsFetch());
  }, []);

  const posts: QueryPosts = useQueries(Queries.Posts);

  return (
    <Box component="div">
      <Header />
      {posts.length ? (
        posts.map(function (p: QueryPost) {
          return (
            <p
              key={p.id}
            >{`Title:${p.title} User:${p.user.username}; Comments:${p.countComments}.`}</p>
          );
        })
      ) : (
        <p>No data posts</p>
      )}
    </Box>
  );
}
