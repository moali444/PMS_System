import { useNavigate } from "react-router-dom";
import ProjectData from "../ProjectData/ProjectData";
import "./ProjectsList.scss";
import useUserInformation from "../../../../constants/useUserInformation";
import { ScaleLoader } from "react-spinners";

const ProjectsList = () => {
  const { userInformation, loading } = useUserInformation();

  const navigate = useNavigate();

  if (loading) {
    return (
      <div
        className="loadingContainer d-flex justify-content-center align-items-center"
        style={{ minHeight: "692px" }}>
        <ScaleLoader className="loader" color="rgba(49, 89, 81, 0.9)" />
      </div>
    );
  }

  return (
    <div id="projects-list">
      <div className="head">
        <span className="title">Projects</span>
        {userInformation?.group?.name == "Manager" && (
          <button onClick={() => navigate("/dashboard/add-project")}>
            <i className="fa-solid fa-plus" /> Add New Project
          </button>
        )}
      </div>
      <ProjectData />
    </div>
  );
};

export default ProjectsList;
