import React from "react";
import { useAuthContext } from "./AuthContext";
import Loading from "../../components/Loading";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ReactElement;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuth, isLoading } = useAuthContext();
  if (isLoading) {
    return <Loading />;
  }

  if (isAuth) {
    return element;
  }

  return <Navigate to="/signin" />;
};
