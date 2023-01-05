import { useEffect } from "react";
import { Box } from "@mui/material";

import { useAppDispatch } from "../app/hooks";
import Header from "../components/Header";
import { usersFetch } from "../redux/reducers/users";
import { commentsFetch } from "../redux/reducers/comments";
import { postsFetch } from "../redux/reducers/posts";
import Main from "../components/posts/Main";

export default function (): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(usersFetch());
    dispatch(postsFetch());
    dispatch(commentsFetch());
  }, []);

  return (
    <Box component="div">
      <Header />
      <Main />
    </Box>
  );
}
