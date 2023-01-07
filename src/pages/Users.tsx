import { useEffect } from "react";
import { Box } from "@mui/material";

import { useAppDispatch } from "../redux/hooks";
import { usersFetch } from "../redux/reducers/users";
import { postsFetch } from "../redux/reducers/posts";
import Header from "../components/Header";
import Main from "../components/users/Main";

export default function Users() {
  const dispatch = useAppDispatch();

  useEffect(function () {
    dispatch(usersFetch());
    dispatch(postsFetch());
  }, []);

  return (
    <Box component="div">
      <Header />
      <Main />
    </Box>
  );
}
