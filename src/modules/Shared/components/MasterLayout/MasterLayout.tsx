import { Outlet } from "react-router-dom";
import UsePageTitle from "../../../../utils/UsePageTitle";
import SideBar from "../SideBar/SideBar";
import LayoutHeader from "../LayoutHeader/LayoutHeader";
import "./MasterLayout.scss";

const MasterLayout = () => {
    UsePageTitle();

  return (
    <div id="master_bx">
      <LayoutHeader />
      <div className="content-bx">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default MasterLayout;
