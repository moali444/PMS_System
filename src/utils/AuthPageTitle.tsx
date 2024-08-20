import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AuthPageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/login":
        document.title = "Login Page";
        break;
      case "/register":
        document.title = "Register Page";
        break;
      case "/forget-pass":
        document.title = "Forget Password Page";
        break;
      case "/reset-pass":
        document.title = "Reset Password Page";
        break;
      case "/change-pass":
        document.title = "Change Password Page";
        break;
      case "/verify-account":
        document.title = "Verify Account Page";
        break;
      default:
        document.title = "PMS";
    }
  }, [location.pathname]);

  return <div>AuthPageTitle</div>;
};

export default AuthPageTitle;
