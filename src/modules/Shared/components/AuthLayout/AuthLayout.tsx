import { Outlet } from "react-router-dom";
import AuthPageTitle from "../../../../utils/AuthPageTitle";
import "./AuthLayout.scss";

const AuthLayout = () => {
    AuthPageTitle();

  return (
    <div id="auth_container">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
