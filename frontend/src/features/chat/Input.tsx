import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { fetchAsyncSendMessage } from "./api";
import { MessageProps } from "../types";
import { useAuthContext } from "../auth/AuthContext";

const Input: React.FC<MessageProps> = (props) => {
  const [message, setMessage] = useState("");
  const { user } = useAuthContext();
  const webSocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket接続を開始
    webSocketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${props.chatRoomId}`
    );

    webSocketRef.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    webSocketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      props.setMessages((messages) => [...messages, data.message]);
    };

    webSocketRef.current.onerror = (e) => {
      console.log("WebSocket Error: ", e);
    };

    webSocketRef.current.onclose = (e) => {
      console.log("WebSocket Disconnected");
    };

    // コンポーネントのアンマウント時にWebSocket接続を閉じる
    return () => {
      if (webSocketRef.current?.readyState === 1) {
        webSocketRef.current?.close();
      }
    };
  }, [props.chatRoomId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (message.trim() === "") return; // 空のメッセージは送信しない

    if (props.chatRoomId && user) {
      if (
        webSocketRef.current &&
        webSocketRef.current.readyState === WebSocket.OPEN
      ) {
        webSocketRef.current.send(
          JSON.stringify({
            type: "message",
            room_id: props.chatRoomId,
            message: message,
            sender_id: user.id,
          })
        );
      }
    }
    setMessage(""); // メッセージ送信後、入力フィールドをクリア
  };

  return (
    <Box
      sx={{
        height: "50px",
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "solid 1px",
      }}
    >
      <TextField
        value={message}
        fullWidth
        onChange={handleChange}
        placeholder="Type something..."
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        }}
      />
      <IconButton onClick={handleSubmit} sx={{ p: 1, cursor: "pointer" }}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default Input;
