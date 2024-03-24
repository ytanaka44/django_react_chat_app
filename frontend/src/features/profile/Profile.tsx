import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../auth/AuthContext";
import ProfilePopover from "./ProfilePopover";

const Profile: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <ProfilePopover />
    </Box>
  );
};

export default Profile;
