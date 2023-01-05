import { useState } from "react";
import { Box } from "@mui/material";

import useQueries from "../../app/queries";
import { Queries, QueryPost, QueryPosts } from "../../types/Queries";
import MainCard from "./MainCard";
import MainSrearch from "./MainSrearch";

export default function Main() {
  const [posts, setPosts] = useState<QueryPosts>(useQueries(Queries.Posts));

  return (
    <Box component="div">
      <MainSrearch setPosts={setPosts} />
      {posts.length ? (
        posts.map(function (post: QueryPost) {
          return <MainCard key={post.id} {...post} />;
        })
      ) : (
        <p>No data posts</p>
      )}
    </Box>
  );
}
