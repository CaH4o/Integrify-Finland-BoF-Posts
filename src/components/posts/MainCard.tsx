import {
  Card,
  CardActions,
  CardContent,
  Badge,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { Link } from "react-router-dom";

import { PropPostsCard } from "../../types/Props";

export default function MainCard(post: PropPostsCard): JSX.Element {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 400, m: "2rem" }}>
      <CardActions>
        <Link to={`${post.id}`} className="LinkLine TextEll PostsPad">
          {post.title}
        </Link>
      </CardActions>
      <hr style={{ width: "90%", color: "lightgray" }} />
      <CardContent className="TextEll" sx={{height: "100px"}}>
        <Typography variant="body2">{post.body}</Typography>
      </CardContent>
      <hr style={{ width: "90%", color: "lightgray" }} />
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", p: "1rem" }}
      >
        <Link to={`../users/${post.user.id}`} className="LinkLine">
          By {post.user.username}
        </Link>
        <Badge badgeContent={post.countComments} color="info">
          <ForumIcon />
        </Badge>
      </CardActions>
    </Card>
  );
}
