import { Box, Typography } from "@mui/material";

import HeaderNav from "./HeaderNav";

export default function Header(): JSX.Element {
  return (
    <Box component="header" className="App-header">
      <Typography component="h3" variant="h3">
        App
      </Typography>
      <HeaderNav />
    </Box>
  );
}
