import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import IMAGES from "../../../../assets/images/images";

const SideBar = () => {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(
    window.matchMedia("(max-width: 800px)").matches
  );
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div id="sidebar_bx">
      <Sidebar
        toggled={toggled}
        customBreakPoint="800px"
        onBreakPoint={setBroken}
        collapsed={collapsed}>
        <Menu>
          <MenuItem
            icon={<img src={IMAGES.homeIcon} alt="pic" />}
            component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem
            icon={<img src={IMAGES.usersIcon} alt="pic" />}
            component={<Link to="/dashboard/users" />}>
            Users
          </MenuItem>
          <MenuItem
            icon={<img src={IMAGES.projectsIcon} alt="pic" />}
            component={<Link to="/dashboard/projects" />}>
            Projects
          </MenuItem>
          <MenuItem
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
      </Sidebar>
      <button
        className="sb-button toggle_btn"
        onClick={() => setCollapsed(!collapsed)}>
        <img src={IMAGES.menuArrow} alt="pic" />
      </button>
      <main style={{ padding: 10 }}>
        <div>
          {broken && (
            <button className="sb-button" onClick={() => setToggled(!toggled)}>
              Toggle
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default SideBar;
