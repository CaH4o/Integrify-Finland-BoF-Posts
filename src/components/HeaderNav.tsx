import { Box, List } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function HeaderNav() {
  return (
    <Box component="nav">
      <List className="Nav">
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? "Link Active" : "Link")}
        >
          Users
        </NavLink>
        <NavLink
          to="/posts"
          className={({ isActive }) => (isActive ? "Link Active" : "Link")}
        >
          Posts
        </NavLink>
      </List>
    </Box>
  );
}
