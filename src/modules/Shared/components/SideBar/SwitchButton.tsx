import React from "react";
import "./SwitchButton.scss";
import { useTheme } from "../../../../constants/ThemeContext";
export default function SwitchButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="toggle">
      <input
        onChange={toggleTheme}
        checked={theme === "light"}
        type="checkbox"
        id="btn"
      />
      <label for="btn">
        <span className="thumb"></span>
      </label>
      <div className="light"></div>
    </div>
  );
}
