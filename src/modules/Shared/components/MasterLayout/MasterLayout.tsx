import { Outlet } from "react-router-dom";
import UsePageTitle from "../../../../utils/UsePageTitle";
import SideBar from "../SideBar/SideBar";
import "./MasterLayout.scss";
import Navbar from "../Navbar/Navbar";

import { useState } from "react";

const MasterLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  UsePageTitle();

  const toggleSidebar = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className="vh-100 ">
        <div className="col-12 ">
          <Navbar />
        </div>

        <div className={`d-flex ${collapsed ? "collapsed" : ""}   `}>
          <div className="sideBar-container position-fixed ">
            <SideBar toggleSidebar={toggleSidebar} />
          </div>
          <div className="content ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterLayout;
