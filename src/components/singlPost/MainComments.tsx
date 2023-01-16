import { Avatar, Box, Typography, Button } from "@mui/material";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";

import { Comment } from "../../types/Comments";

export default function MainComments(comment: Comment): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        margin: "1rem",
        padding: "0.3rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Box width="100px">
          <Avatar
            sx={{ bgcolor: "#b3b4d3", margin: "1rem", padding: "0.5rem" }}
          >
            {comment.name[0]}
          </Avatar>
        </Box>

        <hr
          style={{
            border: "1px solid gray",
            backgroundColor: "gray",
            height: "90%",
          }}
        />

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
      <Button
        size="large"
        sx={{
          justifySelf: "flex-end",
          alignSelf: "center",
          padding: "1rem",
        }}
      >
        <SpeakerNotesOffIcon />
      </Button>
    </Box>
  );
}
