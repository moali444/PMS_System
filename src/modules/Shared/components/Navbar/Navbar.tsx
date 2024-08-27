import { Link } from "react-router-dom";
import "./Navbar.scss";
import logoImage from "../../../../assets/images/navbar-logo.png";
import avatar from "../../../../assets/images/userAvatar.png";
import { Dropdown, DropdownButton } from "react-bootstrap";
import useUserInformation from "../../../../constants/useUserInformation";
import { BASE_IMG_URL } from "../../../../constants/END_POINTS";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton styles

const Navbar = () => {
  const { userInformation, loading } = useUserInformation();

  return (
    <div className="NavBar-Container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <img src={logoImage} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li
                className="nav-item me-1 pe-3"
                style={{ borderRight: "0.3px solid #9A9A9A" }}
              >
                <i className="fa-solid fa-bell notification-icon"></i>
              </li>
              <li className="nav-item">
                <div className="d-flex align-items-center user-details">
                  <div>
                    {loading ? (
                      <Skeleton
                        circle
                        height={40}
                        width={40}
                        containerClassName="avatar-skeleton"
                        className="mx-3"
                      />
                    ) : (
                      <img
                        src={
                          userInformation?.imagePath
                            ? `${BASE_IMG_URL}/${userInformation.imagePath}`
                            : avatar
                        }
                        className="mx-3 rounded-circle user-image"
                        alt="user-image"
                      />
                    )}
                  </div>
                  <div className="user-credentials d-flex flex-column">
                    <span className="user-name">
                      {loading ? (
                        <Skeleton width={150} />
                      ) : (
                        userInformation?.userName
                      )}
                    </span>
                    <span className="user-email text-muted">
                      {loading ? (
                        <Skeleton width={200} />
                      ) : (
                        userInformation?.email
                      )}
                    </span>
                  </div>
                  <div className="mx-2 dropdownContainer">
                    <DropdownButton
                      title={<i className="fa-solid fa-chevron-down" />}
                      variant="transparent"
                    >
                      <Dropdown.Item href="#/action-1">Log Out</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
