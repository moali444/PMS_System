import IMAGES from "../../../../assets/images/images";
import "./LayoutHeader.scss";
import { BASE_IMG_URL } from "../../../../constants/END_POINTS";
import userAvatar from "../../../../assets/images/userAvatar.png";
import { Dropdown, DropdownButton } from "react-bootstrap";
import useUserInformation from "../../../../constants/useUserInformation";
import useScreenSize from "../../../../constants/useScreenSize";
import { setToken } from "../../../../constants/Tokenhandler";
import { useNavigate } from "react-router-dom";

interface UserInforamtion {
  userName: string;
  email: string;
  imagePath: string | null;
}

const UserDetails = ({
  userInformation,
}: {
  userInformation: UserInforamtion;
}) => {
  const { userName, email, imagePath } = userInformation;

  return (
    <div className="user-details d-flex flex-row align-items-center">
      <img
        className="user-avatar"
        src={imagePath ? `${BASE_IMG_URL}/${imagePath}` : userAvatar}
        alt={`${userName}'s avatar`}
      />

      <div className="user-credentials d-flex flex-column">
        <span className="user-name">{userName}</span>
        <span className="user-email">{email}</span>
      </div>
    </div>
  );
};

const LayoutHeader = () => {
  const { userInformation } = useUserInformation();
  const { screenSizeCategory } = useScreenSize();
  const navigate = useNavigate();

  const logOut = () => {
    setToken("");
    navigate("/login");
  };
  return (
    <div id="layout_header">
      <img src={IMAGES.headerLogo} alt="pic" />
      {userInformation && (
        <div className="user-info-container d-flex flex-row align-items-center">
          <i className="notification-icon fa-solid fa-bell" />

          {screenSizeCategory === "large" ? (
            <>
              <UserDetails userInformation={userInformation} />
              <DropdownButton
                title={<i className="fa-solid fa-chevron-down" />}>
                {" "}
                <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
              </DropdownButton>
            </>
          ) : (
            <DropdownButton title={<i className="fa-solid fa-chevron-down" />}>
              <UserDetails userInformation={userInformation} />
              <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
            </DropdownButton>
          )}
        </div>
      )}
    </div>
  );
};

export default LayoutHeader;
