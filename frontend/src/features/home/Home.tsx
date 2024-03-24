import { Box, Button } from "@mui/material";
import React from "react";

const Home: React.FC = () => {
  const handleStartChat = () => {};
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Button size="large" onClick={handleStartChat}>
        start chat
      </Button>
    </Box>
  );
};

export default Home;
