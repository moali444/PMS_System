import { Outlet } from "react-router-dom";
import UsePageTitle from "../../../../utils/UsePageTitle";
import SideBar from "../SideBar/SideBar";
import "./MasterLayout.scss";
import Navbar from "../Navbar/Navbar";
import LayoutHeader from "../LayoutHeader/LayoutHeader";
import { useState } from "react";

const MasterLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setCollapsed(!collapsed);
  };

  UsePageTitle();

  return (
    <div id="master_bx">
      <LayoutHeader />
      <div className={`d-flex ${collapsed ? "collapsed" : ""} content-bx   `}>
        <div className="sideBar-container position-fixed ">
          <SideBar toggleSidebar={toggleSidebar} />
        </div>
        <div className="content ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
