import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import Messages from "./Messages";
import { useParams } from "react-router-dom";
import { MessageState } from "../types";

const ChatRoom: React.FC = () => {
  const { chatRoomId } = useParams<string>();
  const [messages, setMessages] = useState<MessageState[]>([]);
  const [message, setMessage] = useState("");

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Messages
        chatRoomId={chatRoomId}
        messages={messages}
        setMessages={setMessages}
      />
      <Input
        chatRoomId={chatRoomId}
        messages={messages}
        setMessages={setMessages}
      />
    </Box>
  );
};

export default ChatRoom;
