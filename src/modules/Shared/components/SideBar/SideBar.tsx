import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import IMAGES from "../../../../assets/images/images";
import useUserInformation from "../../../../constants/useUserInformation";
import SwitchButton from "./SwitchButton";
import { useTheme } from "../../../../constants/ThemeContext";

interface ISideBarProps {
  toggleSidebar: () => void;
}
const SideBar = ({ toggleSidebar }: ISideBarProps) => {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(
    window.matchMedia("(max-width: 800px)").matches
  );
  const { themeStyle } = useTheme();
  const { userInformation, loading } = useUserInformation();
  const isManager = userInformation?.group.name === "Manager";
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleToggle = () => {
    setCollapsed(!collapsed);
    toggleSidebar();
  };

  return (
    <div id="sidebar_bx">
      <Sidebar
        backgroundColor={`${themeStyle.boxBackgroundColor2} !important`}
        toggled={toggled}
        collapsed={collapsed}>
        {loading ? (
          ""
        ) : (
          <Menu>
            <MenuItem
              active={location.pathname === "/dashboard"}
              icon={<img src={IMAGES.homeIcon} alt="pic" />}
              component={<Link to="/dashboard" />}>
              Home
            </MenuItem>
            {isManager ? (
              <MenuItem
                active={location.pathname === "/dashboard/users"}
                icon={<img src={IMAGES.usersIcon} alt="pic" />}
                component={<Link to="/dashboard/users" />}>
                Users
              </MenuItem>
            ) : (
              ""
            )}

            <MenuItem
              active={location.pathname === "/dashboard/projects"}
              icon={<img src={IMAGES.projectsIcon} alt="pic" />}
              component={<Link to="/dashboard/projects" />}>
              Projects
            </MenuItem>
            <MenuItem
              active={location.pathname === "/dashboard/tasks"}
              icon={<img src={IMAGES.tasksIcon} alt="pic" />}
              component={<Link to="/dashboard/tasks" />}>
              Tasks
            </MenuItem>

            <MenuItem
              icon={<img src={IMAGES.tasksIcon} alt="pic" />}
              component={<Link to="/change-pass" />}>
              Change Password
            </MenuItem>
          </Menu>
        )}
      </Sidebar>
      <button className="sb-button toggle_btn" onClick={handleToggle}>
        <img src={IMAGES.menuArrow} alt="pic" />
      </button>
    </div>
  );
};

export default SideBar;
