import {
  Box,
  Divider,
  IconButton,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../auth/AuthContext";
import IconSettings from "./IconSettings";

const ProfilePopover: React.FC = (props) => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <IconButton
        aria-label="action"
        onClick={handleOpen}
        sx={{
          position: "absolute",
          right: 24,
          top: 8,
        }}
      >
        <img
          src={`http://localhost:8000${user?.icon}`}
          alt={`${user?.firstName}'s icon`}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            padding: 2,
            backgroundColor: "white",
          }}
        />
      </IconButton>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack spacing={1}>
            <Typography>user settings..</Typography>
            <Divider />
            <IconSettings />
          </Stack>
        </Box>
      </Popover>
    </Box>
  );
};

export default ProfilePopover;
