import UsersData from "../UsersData/UsersData";
import "./UsersList.scss";

const UsersList = () => {
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
