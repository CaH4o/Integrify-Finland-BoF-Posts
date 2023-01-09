import { Avatar, Box, Typography } from "@mui/material";

import { Comment } from "../../types/Comments";

export default function MainComments(comment: Comment): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "1rem",
        margin: "0.5rem 0",
      }}
    >
      <Box width="5%">
        <Avatar sx={{ bgcolor: "#b3b4d3", margin: "1rem", padding: "0.3rem" }}>
          {comment.name[0]}
        </Avatar>
      </Box>
      <Box>
        <hr
          style={{
            border: "1px solid gray",
            backgroundColor: "gray",
            height: "90%",
          }}
        />
      </Box>
      <Box padding="1rem">
        <Typography
          variant="h5"
          component="h5"
          className="TextLeft LinkLine"
          padding="0 0 1rem 0"
        >
          {comment.name}
        </Typography>
        <Typography variant="body1" component="p" className="TextLeft">
          {comment.body}
        </Typography>
      </Box>
    </Box>
  );
}
