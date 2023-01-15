import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";

import { Post } from "../../types/Posts";
import { User, Users } from "../../types/Users";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { postPost } from "../../redux/reducers/posts";

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

export default function MainAddPost(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<Post>({
    userId: 1,
    id: 0,
    title: "",
    body: "",
  });
  const dispatch = useAppDispatch();
  const users: Users = useAppSelector(function (state: RootState) {
    return state.users.data;
  });

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
    let value: string | number;

    if (key === "userId") {
      value = Number(event.target.value);
    } else {
      value = event.target.value;
    }

    setPost({ ...post, [key]: value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(postPost(post));
    setPost({ ...post, title: "", body: "" });
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Add post
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a post
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            helperText="Please fill the post title here."
          />
          <TextField
            label="Body"
            name="body"
            value={post.body}
            onChange={handleChange}
            required
            multiline
            rows={3}
            helperText="Please fill post content here."
          />
          <TextField
            required
            select
            label="Select user"
            name="userId"
            value={post.userId.toString() || ""}
            onChange={handleChange}
            helperText="Please select a post author here."
          >
            {users.map((u: User) => (
              <MenuItem key={u.id.toString()} value={u.id}>
                {u.name}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="outlined" size="large" type="submit">
            create post
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
