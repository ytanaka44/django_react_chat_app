import React, { useEffect, useState } from "react";
import { fetchAsyncChatRoom, fetchAsyncUsers } from "./api";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { UserProps } from "../types";
import { useAuthContext } from "../auth/AuthContext";

const ChatUsers: React.FC = () => {
  const navigate = useNavigate();
  const [chatUsers, setChatUsers] = useState<UserProps[]>([]);

  const handleStartChat = async (userId: string) => {
    const chatRoomProps = {
      userId: userId,
    };
    try {
      const chatRoomId = await fetchAsyncChatRoom(chatRoomProps);
      navigate(`/${chatRoomId}`);
    } catch (error: any) {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await fetchAsyncUsers();
      setChatUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <List>
      {chatUsers.map((user) => (
        <ListItem key={user.id} disablePadding>
          <ListItemButton
            sx={{ py: 0, minHeight: 32 }}
            onClick={() => {
              handleStartChat(user.id);
            }}
          >
            <ListItemIcon sx={{ pl: 1 }}>
              <img
                src={`http://localhost:8000${user.icon}`}
                alt={`${user.firstName}'s icon`}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  padding: 2,
                }}
              />
            </ListItemIcon>
            <ListItemText primary={user.firstName} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ChatUsers;
