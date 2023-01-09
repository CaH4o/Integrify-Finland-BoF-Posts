import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";

import { Post } from "../../types/Posts";

export default function MainPost(post: Post): JSX.Element {
  return (
    <Card
      sx={{bgcolor: "#fff", margin: "1rem 0", padding: "1rem" }}
    >
      <Typography variant="h5" component="h5" className="TextLeft TextUpp LinkLine">
        {post.title}
      </Typography>
      <Typography variant="body1" component="p" className="TextLeft">
        {post.body}
      </Typography>
    </Card>
  );
}
