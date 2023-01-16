import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Link as MUILink,
  Badge,
  Card,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import ForumIcon from "@mui/icons-material/Forum";
import ScrollToTop from "react-scroll-to-top";

import { Post, Posts } from "../../types/Posts";
import { User } from "../../types/Users";
import { Comments, Comment } from "../../types/Comments";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { LoadingStatus } from "../../types/States";
import MainPost from "./MainPost";
import MainComments from "./MainComments";
import MainPosts from "./MainPosts";
import { PropPost } from "../../types/Props";

export default function Main(params: { id: string }): JSX.Element {
  const [isRender, setRender] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<number>(3);
  const state: RootState = useAppSelector(function (state: RootState) {
    return state;
  });
  const posts: Posts = state.posts.data;
  const post: Post = posts.find(function (p: Post) {
    return params.id === p.id.toString();
  })!;
  const user: User = state.users.data[0];
  const comments: Comments = state.comments.data;

  useEffect(
    function () {
      if (
        state.posts.loadingStatus === LoadingStatus.Completed &&
        state.users.loadingStatus === LoadingStatus.Completed &&
        state.comments.loadingStatus === LoadingStatus.Completed
      ) {
        setRender(true);
      } else {
        setRender(false);
      }
    },
    [state]
  );

  return (
    <Box
      component="div"
      bgcolor="#e5e5e5"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {isRender ? (
        <>
          <ScrollToTop />
          <Box component="div" role="article" width="90%">
            <MainPost {...post} />
          </Box>
          <Box
            component="div"
            display="flex"
            width="89%"
            justifyContent="space-between"
            margin="0.5rem 0 0 0"
          >
            <Box className="TextLink">Comments ({comments.length})</Box>
            <Button variant="outlined">Add a comment</Button>
            <Badge badgeContent={comments.length} color="info">
              <ForumIcon />
            </Badge>
          </Box>
          <Box
            component="div"
            bgcolor="fff"
            margin="1rem 0"
            sx={{ width: "90%", bgcolor: "#fff" }}
          >
            <Card sx={{ bgcolor: "#fff", padding: "0 0 1rem 0" }}>
              {comments.slice(0, showComments).map(function (comment: Comment) {
                return <MainComments key={comment.id} {...comment} />;
              })}
              {comments.length > showComments ? (
                <MUILink onClick={() => setShowComments(showComments + 3)}>
                  Read more {comments.length % 3}{" "}
                  {comments.length % 3 === 1 ? "comment" : "comments"}
                </MUILink>
              ) : null}
            </Card>
          </Box>

          {posts.length > 1 ? (
            <>
              <Box
                width="90%"
                display="flex"
                alignItems="flex-start"
                margin="0.5rem 0 0 0"
              >
                <Link
                  to={`../../users/${user.id}`}
                  className="LinkLine TextLink"
                >
                  Other posts by {user.name}
                </Link>
              </Box>
              <Card
                sx={{
                  bgcolor: "#fff",
                  width: "90%",
                  margin: "1rem 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {posts
                  .filter(function (p: Post) {
                    return p.id.toString() !== params.id;
                  })
                  .map(function (p: Post, i: number) {
                    const index: number = i + 1;
                    const propPost: PropPost = { ...p, index };
                    return <MainPosts key={p.id} {...propPost} />;
                  })}
              </Card>
            </>
          ) : null}
        </>
      ) : (
        <Typography variant="h5" component="h5" className="TextEll">
          Loading...
        </Typography>
      )}
    </Box>
  );
}
