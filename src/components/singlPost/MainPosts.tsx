import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { PropPost } from "../../types/Props";

export default function MainPosts(post: PropPost): JSX.Element {
  return (
    <Link to={`/posts/${post.id}`} className="Link" style={{ width: "95%" }}>
      <Card sx={{ padding: "1rem", margin: "1rem 0" }}>
        <Typography
          variant="h5"
          component="h5"
          className="TextLeft TextInLine PostsPad"
        >
          {post.index}. {post.title}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          className="TextLeft TextInLine PostsPad"
        >
          {post.body}
        </Typography>
      </Card>
    </Link>
  );
}
