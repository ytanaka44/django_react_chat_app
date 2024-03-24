import { Box } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Main from "./components/Main";
import SideNavbar from "./components/SideNavbar";

const AppLayout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const handleDrawerOpenClose = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* <SideNavbar /> */}
      <Sidebar open={open} />
      <Topbar open={open} handleOpenClose={handleDrawerOpenClose} />
      <Main open={open}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default AppLayout;
