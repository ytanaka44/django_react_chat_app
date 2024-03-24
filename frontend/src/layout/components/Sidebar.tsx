import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { DRAWWIDTH, SIDENAVBARWIDTH } from "../constants";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import Signout from "../../features/auth/Signout";
import { UserProps } from "../../features/types";
import ChatUsers from "../../features/chat/ChatUsers";

interface SidebarProps {
  open: boolean;
}

const chatUsers = [
  {
    name: "hoge",
    icon: <RecyclingOutlinedIcon />,
    to: "/hoge",
    uuid: "uuid",
    date: new Date(2021, 0, 1), // 日付例
  },
];

const Sidebar: React.FC<SidebarProps> = (props) => {
  const navigate = useNavigate();
  // const [chatUsers, setChatUsers] = useState<UserProps[]>([]);

  const handleItemClick = (to: string) => {
    navigate(to);
  };

  return (
    <Box>
      <Drawer
        sx={{
          width: DRAWWIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWWIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={props.open}
      >
        <Toolbar
          variant="regular"
          sx={{ fontSize: "22px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          App
        </Toolbar>
        <Divider />
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <ChatUsers />
          </Box>
          <Signout />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
