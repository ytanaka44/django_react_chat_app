import { Box, Button } from "@mui/material";
import React from "react";

interface SubmitButtonProps {
  startIcon?: React.ReactElement;
  name: string;
  handleClose: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const handleCancel = () => {
    props.handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        pt: 3,
      }}
    >
      <Button sx={{ mr: 2 }} onClick={handleCancel}>
        Cancel
      </Button>
      <Button
        startIcon={props.startIcon}
        variant="contained"
        color="primary"
        type="submit"
      >
        {props.name}
      </Button>
    </Box>
  );
};

export default SubmitButton;
