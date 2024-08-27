import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import IMAGES from "../../../../assets/images/images";

interface ISideBarProps {
  toggleSidebar: () => void;
}

const SideBar = ({ toggleSidebar }: ISideBarProps) => {
  const [toggled, setToggled] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const location = useLocation();

  const handleToggle = () => {
    setCollapsed(!collapsed);
    toggleSidebar();
  };

  return (
    <div className="sidebar_bx">
      <Sidebar toggled={toggled} collapsed={collapsed} className="vh-100">
        <Menu>
          <MenuItem
            active={location.pathname === "/dashboard"}
            icon={<img src={IMAGES.homeIcon} alt="pic" />}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>
          <MenuItem
            active={location.pathname === "/dashboard/users"}
            icon={<img src={IMAGES.usersIcon} alt="pic" />}
            component={<Link to="/dashboard/users" />}
          >
            Users
          </MenuItem>
          <MenuItem
            active={location.pathname === "/dashboard/projects"}
            icon={<img src={IMAGES.projectsIcon} alt="pic" />}
            component={<Link to="/dashboard/projects" />}
          >
            Projects
          </MenuItem>
          <MenuItem
            active={location.pathname === "/dashboard/tasks"}
            icon={<img src={IMAGES.tasksIcon} alt="pic" />}
            component={<Link to="/dashboard/tasks" />}
          >
            Tasks
          </MenuItem>
        </Menu>
      </Sidebar>
      <button className="sb-button toggle_btn" onClick={handleToggle}>
        <img src={IMAGES.menuArrow} alt="pic" />
      </button>
    </div>
  );
};

export default SideBar;
