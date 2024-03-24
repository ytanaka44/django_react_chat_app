import { Box } from "@mui/material";
import React from "react";
import { DRAWWIDTH } from "../constants";

interface MainProps {
  open: boolean;
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = (props) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        overflowX: "auto",
        pt: 10,
        px: 3,
        pb: 3,
        transition: (theme) =>
          theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        marginLeft: `-${DRAWWIDTH}`,
        ...(props.open && {
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          marginLeft: 0,
        }),
      }}
    >
      {props.children}
    </Box>
  );
};

export default Main;
