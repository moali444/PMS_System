import { ScaleLoader } from "react-spinners";
import useUserInformation from "../../../../constants/useUserInformation";
import UsersData from "../UsersData/UsersData";
import "./UsersList.scss";

const UsersList = () => {
  const { loading } = useUserInformation();

  if (loading) {
    return (
      <div
        className="loadingContainer d-flex justify-content-center align-items-center"
        style={{ minHeight: "692px" }}
      >
        <ScaleLoader className="loader" color="rgba(49, 89, 81, 0.9)" />
      </div>
    );
  }
  return (
    <div id="projects-list">
      <div className="head">
        <span className="title">Users</span>
      </div>
      <UsersData />
    </div>
  );
};

export default UsersList;
