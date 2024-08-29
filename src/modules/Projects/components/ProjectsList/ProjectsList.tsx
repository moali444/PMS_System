import ProjectData from "../ProjectData/ProjectData";
import "./ProjectsList.scss";

const ProjectsList = () => {
  return (
    <div id="projects-list">
      <div className="head">
        <span className="title">Projects</span>
        <button>
          <i className="fa-solid fa-plus" /> Add New Project
        </button>
      </div>
      <ProjectData />
    </div>
  );
};

export default ProjectsList;
