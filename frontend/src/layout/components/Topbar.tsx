import React from "react";
import { Box, IconButton, Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWWIDTH } from "../constants";
import Profile from "../../features/profile/Profile";

interface TopbarProps {
  open: boolean;
  handleOpenClose: () => void;
}

const Topbar: React.FC<TopbarProps> = (props) => {
  return (
    <MuiAppBar
      component={Box}
      sx={{
        transition: (theme) =>
          theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        ...(props.open && {
          width: `calc(100% - ${DRAWWIDTH})`,
          marginLeft: `${DRAWWIDTH}`,
          transition: (theme) =>
            theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }),
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.handleOpenClose}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Profile />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default Topbar;
