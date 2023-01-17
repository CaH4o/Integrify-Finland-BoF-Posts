import { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, Typography, Modal, TextField } from "@mui/material";
import { Params, useParams } from "react-router-dom";

import { Comment } from "../../types/Comments";
import { commentPost } from "../../redux/reducers/comments";
import { useAppDispatch } from "../../redux/hooks";

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
  display: "flex",
  flexDirection: "column",
  gap: "1.3rem",
};

export default function MainAddComment(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState<Comment>({
    id: 0,
    postId: 0,
    body: "",
    email: "",
    name: "",
  });
  const dispatch = useAppDispatch();
  const params: Readonly<Params<string>> = useParams();
  const postId: number = Number(params.id || "0");

  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const key: string = event.target.name;
    const value: string = event.target.value;

    setComment({ ...comment, [key]: value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Boolean(postId)) {
      const commentSend: Comment = { ...comment, postId };
      dispatch(commentPost(commentSend));
    }
    setComment({ ...comment, body: "" });
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Add a comment
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a comment
          </Typography>
          <TextField
            label="Comment"
            name="body"
            value={comment.body}
            onChange={handleChange}
            required
            helperText="Please fill your comment to the post here."
            multiline
            rows={3}
          />
          <TextField
            label="Name"
            name="name"
            value={comment.name}
            onChange={handleChange}
            required
            helperText="Please fill your name here."
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={comment.email}
            onChange={handleChange}
            required
            helperText="Please fill your email here."
          />

          <Button variant="outlined" size="large" type="submit">
            create the comment
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
