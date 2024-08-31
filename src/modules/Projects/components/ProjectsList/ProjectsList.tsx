import { useNavigate } from "react-router-dom";
import ProjectData from "../ProjectData/ProjectData";
import "./ProjectsList.scss";

const ProjectsList = () => {
  const navigate = useNavigate();
  return (
    <div id="projects-list ">
      <div className="head">
        <span className="title">Projects</span>
        <button onClick={() => navigate("/dashboard/add-project")}>
          <i className="fa-solid fa-plus" /> Add New Project
        </button>
      </div>
      <ProjectData />
    </div>
  );
};

export default ProjectsList;
