import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { PropUsersCard } from "../../types/Props";

export default function MainCard(user: PropUsersCard): JSX.Element {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 400, m: "2rem" }}>
      <CardContent className="TextCard TextLeft">
        <Typography variant="h6" component="h6">
          {user.name}
        </Typography>
      </CardContent>
      <hr style={{ width: "90%", color: "lightgray", margin: "0 auto", padding: 0 }} />
      <CardContent className="TextCard TextLeft">
        <Typography variant="body2" component="p">
          {user.company.name}
        </Typography>
        <Typography variant="body2" component="p">
          {user.email}
        </Typography>
        <Typography variant="body2" component="p">
          {user.phone}
        </Typography>
        <Typography variant="body2" component="p">
          {user.website}
        </Typography>
      </CardContent>
      <hr style={{ width: "90%", color: "lightgray" }} />
      <CardActions className="TextCard TextLeft">
        <Link to={"/posts"} className="LinkLine">
          {`${user.countPosts} ${user.countPosts === 1 ? "post" : "posts"}`}
        </Link>
      </CardActions>
    </Card>
  );
}
