import { Outlet } from "react-router-dom";
import UsePageTitle from "../../../../utils/UsePageTitle";
import SideBar from "../SideBar/SideBar";
import "./MasterLayout.scss";

const MasterLayout = () => {
    UsePageTitle();

  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default MasterLayout;
