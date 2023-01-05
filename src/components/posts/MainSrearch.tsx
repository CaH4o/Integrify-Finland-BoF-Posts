import { ChangeEvent } from "react";
import { Box, TextField } from "@mui/material";

import { PropPostsSearch } from "../../types/Props";

export default function MainSrearch(prop: PropPostsSearch): JSX.Element {
  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    prop.setSearch(event.target.value);
  }

  return (
    <Box component="div" m="1rem" width="auto">
      <TextField
        label="Search for a post"
        value={prop.search}
        onChange={handleChange}
      />
    </Box>
  );
}
