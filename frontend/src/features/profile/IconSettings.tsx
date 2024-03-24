import { Box, Button } from "@mui/material";
import React from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { fetchAsyncIconChange } from "./api";
import { useAuthContext } from "../auth/AuthContext";

const IconSettings: React.FC = () => {
  const { updateIcon } = useAuthContext();

  const handleIconChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      const file = e.target.files[0];

      formData.append("icon", file);
      const res = await fetchAsyncIconChange(formData);
      updateIcon(res.icon);
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="icon-button"
        type="file"
        onChange={handleIconChange}
      />
      <label htmlFor="icon-button">
        <Button
          startIcon={<InsertEmoticonIcon />}
          fullWidth
          component="span"
          sx={{ display: "flex", justifyContent: "flex-start" }}
        >
          Icon settings
        </Button>
      </label>
    </Box>
  );
};

export default IconSettings;
