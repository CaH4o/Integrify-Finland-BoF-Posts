import { useState } from "react";
import { Box, Button, Typography, Modal } from "@mui/material";

import { Post } from "../../types/Posts";
import { postData, Url } from "../../app/api";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MainAddPost(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<Post>({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleSubmit() {
    const time: string = new Date().toISOString();

    setPost({
      userId: 1,
      id: 0,
      title: "New test " + time,
      body: "New test New test New test New test New test New test New test New test ",
    });
    postData<Post>(Url.Posts, "", post);
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Add post
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a post
          </Typography>
          <Button onClick={handleSubmit}>add</Button>
        </Box>
      </Modal>
    </div>
  );
}
