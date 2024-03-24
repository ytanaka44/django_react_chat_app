import React, { createContext, useState, useContext, useEffect } from "react";
import {
  fetchAsyncTokenRefresh,
  fetchAsyncTokenVerify,
  fetchAsyncUserInfo,
} from "./api";
import { UserProps } from "../types";

// AuthContextの型を定義
interface AuthContextProps {
  isAuth: boolean;
  isLoading: boolean;
  signin: () => void;
  signout: () => void;
  user: UserProps | null;
  updateIcon: (newIcon: string) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuth: false,
  isLoading: true,
  signin: () => {},
  signout: () => {},
  user: null,
  updateIcon: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ユーザーがログインした時に呼び出される関数
  const signin = async () => {
    const user = await fetchAsyncUserInfo();
    setIsAuth(true);
    setUser(user);
  };

  // ユーザーがログアウトした時に呼び出される関数
  const signout = () => {
    setIsAuth(false);
    setUser(null);
  };

  const updateIcon = (newIcon: string) => {
    if (user) {
      // userがnullまたはundefinedでないことを確認
      setUser({
        ...user, // 現在のuserオブジェクトをコピー
        icon: newIcon, // iconプロパティのみ新しい値で更新
      });
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      // アクセストークンを使用してユーザー情報を取得するAPIリクエスト
      try {
        const response = await fetchAsyncTokenVerify();
        const user = await fetchAsyncUserInfo();
        setIsLoading(false);
        setIsAuth(true);
        setUser(user);
        return response;
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          try {
            // リフレッシュトークンを使用して新しいアクセストークンを取得
            await fetchAsyncTokenRefresh();
            // 新しいアクセストークンでユーザー情報取得のリクエストを再試行
            const retryResponse = await fetchAsyncTokenVerify();
            const user = await fetchAsyncUserInfo();
            setIsLoading(false);
            setIsAuth(true);
            setUser(user);
            return retryResponse;
          } catch (error: any) {
            setIsLoading(false);
            setIsAuth(false);
            setUser(null);
          }
        }
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, isLoading, signin, signout, user, updateIcon }}
    >
      {children}
    </AuthContext.Provider>
  );
};
