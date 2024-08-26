import IMAGES from "../../../../assets/images/images";
import "./LayoutHeader.scss";
import { BASE_IMG_URL } from "../../../../constants/END_POINTS";
import userAvatar from "../../../../assets/images/userAvatar.png";
import { Dropdown, DropdownButton } from "react-bootstrap";
import useUserInformation from "../../../../constants/useUserInformation";

const LayoutHeader = () => {
  const { userInformation } = useUserInformation();

  return (
    <div id="layout_header">
      <img src={IMAGES.headerLogo} alt="pic" />
      {userInformation && (
        <div className="user-info-container d-flex flex-row align-items-center">
          <i className="notification-icon fa-solid fa-bell" />

          <div className="user-details d-flex flex-row align-items-center">
            <img
              className="user-avatar"
              src={
                userInformation?.imagePath
                  ? `${BASE_IMG_URL}/${userInformation.imagePath}`
                  : userAvatar
              }
            />
            <div className="user-credentials d-flex flex-column">
              <span className="user-name">{userInformation.userName}</span>
              <span className="user-email">{userInformation.email}</span>
            </div>
            <DropdownButton title={<i className="fa-solid fa-chevron-down" />}>
              <Dropdown.Item href="#/action-1">Log Out</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutHeader;
