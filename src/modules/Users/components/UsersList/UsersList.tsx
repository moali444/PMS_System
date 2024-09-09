import { ScaleLoader } from "react-spinners";
import useUserInformation from "../../../../constants/useUserInformation";
import UsersData from "../UsersData/UsersData";
import "./UsersList.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UsersList = () => {
  const { loading, userInformation } = useUserInformation();
  const isManager = userInformation?.group.name === "Manager";
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
    <>
      {isManager ? (
        <div id="projects-list">
          <div className="head">
            <span className="title">Users</span>
          </div>
          <UsersData />
        </div>
      ) : (
        navigate("/dashboard")
      )}
    </>
  );
};

export default UsersList;
