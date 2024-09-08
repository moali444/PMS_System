import React from "react";
import "./AuthAddProject.scss";
import { useNavigate } from "react-router-dom";
export default function AuthAddProject({ title_text, content }: any) {
  let navigate = useNavigate();
  return (
    <>
      <div className="header-project">
        <div style={{cursor:"pointer"}} onClick={() => navigate("/dashboard/projects")} className="project-view">
          <span >
            <i className="fa-solid fa-angle-left"></i>
          </span>
          <strong>View All Projects</strong>
        </div>
        <div className="main-text">
          <h1>{title_text}</h1>
        </div>
      </div>
      <div>{content}</div>
    </>
  );
}
