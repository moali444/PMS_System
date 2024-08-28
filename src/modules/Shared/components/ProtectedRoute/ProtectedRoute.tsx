import { Navigate } from "react-router-dom";
import { getToken } from "../../../../constants/Tokenhandler";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return getToken() ? children : <Navigate to={"/login"} />;
};
