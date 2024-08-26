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
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar
        toggled={toggled}
        customBreakPoint="800px"
        onBreakPoint={setBroken}
        collapsed={collapsed}
      >
        <Menu>
          <MenuItem
            icon={<i className="fa-sharp fa-solid fa-house-chimney"></i>}
            component={<Link to="/" />}
          >
            Home
          </MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ padding: 10 }}>
        <div>
          {broken && (
            <button className="sb-button" onClick={() => setToggled(!toggled)}>
              Toggle
            </button>
          )}

          <button
            className="sb-button"
            onClick={() => setCollapsed(!collapsed)}
          >
            Collapse
          </button>
        </div>
      </main>
    </div>
  );
};

export default SideBar;
