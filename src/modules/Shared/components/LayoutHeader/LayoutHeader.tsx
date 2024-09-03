import IMAGES from "../../../../assets/images/images";
import "./LayoutHeader.scss";
import { BASE_IMG_URL } from "../../../../constants/END_POINTS";
import userAvatar from "../../../../assets/images/userAvatar.png";
import { Dropdown, DropdownButton } from "react-bootstrap";
import useUserInformation from "../../../../constants/useUserInformation";
import useScreenSize from "../../../../constants/useScreenSize";
import { setToken } from "../../../../constants/Tokenhandler";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles

interface UserInformation {
  userName: string;
  email: string;
  imagePath: string | null;
}

interface IUserDetailsProps {
  userInformation: UserInformation;
  loading: boolean;
}

const UserDetails = () => {
  const { userInformation, loading }: IUserDetailsProps = useUserInformation();
  // console.log(userInformation);

  // console.log("Loading:", loading);
  // console.log("User Information:", userInformation);

  // Show loading skeleton while data is being fetched
  if (loading) {
    return (
      <div className="user-details d-flex flex-row align-items-center">
        <Skeleton
          circle
          height={40}
          width={40}
          containerClassName="avatar-skeleton"
          className="mx-3"
        />
        <div className="user-credentials d-flex flex-column">
          <Skeleton width={120} height={20} />
          <Skeleton width={170} height={20} />
        </div>
      </div>
    );
  }

  // Handle case where userInformation is not available
  if (!userInformation) {
    return <div>User information not found.</div>;
  }

  const { userName, email, imagePath } = userInformation;

  return (
    <div className="user-details d-flex flex-row align-items-center ">
      <div>
        <img
          className="user-avatar mx-3 rounded-circle"
          src={imagePath ? `${BASE_IMG_URL}/${imagePath}` : userAvatar}
          alt={`${userName}'s avatar`}
        />
      </div>

      <div className="user-credentials d-flex flex-column">
        <span className="user-name">{userName}</span>
        <span className="user-email">{email}</span>
      </div>
    </div>
  );
};

const LayoutHeader = () => {
  const { screenSizeCategory } = useScreenSize();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div id="layout_header">
      <img src={IMAGES.headerLogo} alt="pic" />

      <div className="user-info-container d-flex flex-row align-items-center">
        <i className="notification-icon fa-solid fa-bell " />

        {screenSizeCategory === "large" ? (
          <>
            <UserDetails />

            <DropdownButton title={<i className="fa-solid fa-chevron-down" />}>
              <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
            </DropdownButton>
          </>
        ) : (
          <DropdownButton title={<i className="fa-solid fa-chevron-down" />}>
            <UserDetails />
            <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
          </DropdownButton>
        )}
      </div>
    </div>
  );
};

export default LayoutHeader;
