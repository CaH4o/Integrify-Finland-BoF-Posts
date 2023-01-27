import { useEffect } from "react";
import { Box } from "@mui/material";
import { Params, useParams } from "react-router-dom";

import { useAppDispatch } from "../redux/hooks";
import { postsFetch, postsReset } from "../redux/reducers/posts";
import { usersFetch } from "../redux/reducers/users";
import { commentsFetch } from "../redux/reducers/comments";
import Main from "../components/singlUser/Main";

export default function SingleUser(): JSX.Element {
  const dispatch = useAppDispatch();
  const params: Readonly<Params<string>> = useParams();
  const urlUser: string = `/${params.id}`;
  const urlPosts: string = `/?userId=${params.id}`;

  useEffect(function () {
    dispatch(postsReset());
    dispatch(usersFetch(urlUser));
    dispatch(postsFetch(urlPosts));
    dispatch(commentsFetch(""));
  }, []);

  return (
    <Box component="div">
      <Main />
    </Box>
  );
}
