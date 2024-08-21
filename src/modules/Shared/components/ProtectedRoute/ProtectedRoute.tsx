import { Navigate } from "react-router-dom";
import { checkTokenFromLocalStorage } from "../../../../constants/Tokenhandler";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return checkTokenFromLocalStorage() ? children : <Navigate to={"/login"} />;
};
