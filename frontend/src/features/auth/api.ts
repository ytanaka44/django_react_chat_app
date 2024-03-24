import axios from "axios";
import { SignupProps } from "../types";

export const fetchAsyncLoginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/auth/login/`,
      {
        email,
        password,
      },
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

export const fetchAsyncLogoutUser = async () => {
  try {
    await axios.post(
      `http://localhost:8000/api/auth/logout/`,
      {}, // 空のPOSTリクエストを使用
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (error: any) {
    throw error.response.data;
  }
};

export const fetchAsyncTokenVerify = async () => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/verify/",
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const fetchAsyncTokenRefresh = async () => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/refresh/",
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.status;
};

export const fetchAsyncSignup = async (props: SignupProps) => {
  await axios.post("http://localhost:8000/api/auth/users/", props, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const fetchAsyncUserInfo = async () => {
  const user = await axios.get("http://localhost:8000/api/user/", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return user.data;
};
