import axios from "axios";
import { ChatRoomProps, UserProps } from "../types";
import { fetchAsyncTokenRefresh } from "../auth/api";

export const fetchAsyncUsers: () => Promise<UserProps[]> = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/users/`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/signin";
      throw new Error("Authentication failed, redirecting to login.");
    }
  }
};

export const fetchAsyncChatRoom: (
  props: ChatRoomProps
) => Promise<string> = async (props: ChatRoomProps) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/chatroom/`,
      props,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data.chatRoomId;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/signin";
      throw new Error("Authentication failed, redirecting to login.");
    }
  }
};

export const fetchAsyncMessages = async (
  roomId: string,
  currentPage: number
) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/chat/history/${roomId}?page=${currentPage}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const fetchAsyncSendMessage = async (
  roomId: string,
  content: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/`,
      { room: roomId, content: content },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data.chatRoomId;
  } catch (error: any) {
    throw error.response.data;
  }
};
