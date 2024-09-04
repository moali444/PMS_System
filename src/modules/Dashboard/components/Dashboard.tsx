import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IMAGES from "../../../assets/images/images";
import "./Dashboard.scss";
import useUserInformation from "../../../constants/useUserInformation";
import { ScaleLoader } from "react-spinners";
import { getToken } from "../../../constants/Tokenhandler";
import { TASKS_URLS, USERS_LIST } from "../../../constants/END_POINTS";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface ErrorResponse {
  message: string;
}
interface UsersCountType {
  deactivatedEmployeeCount: number;
  activatedEmployeeCount: number;
}

interface TaskCountType {
  toDo: number;
  inProgress: number;
  done: number;
}

const Dashboard = () => {
  const { userInformation, loading } = useUserInformation();
  const [usersCount, setUsersCount] = useState<UsersCountType | null>(null);
  const [taskCount, setTaskCount] = useState<TaskCountType | null>(null);

  const getUsersCount = async () => {
    try {
      const response = await axios.get(USERS_LIST.usersCount, {
        headers: { Authorization: getToken() },
      });

      setUsersCount(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  };

  const getTaskCount = async () => {
    try {
      const response = await axios.get(TASKS_URLS.tasksCount, {
        headers: { Authorization: getToken() },
      });
      console.log(response.data);
      setTaskCount(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (userInformation?.group?.name === "Manager") {
      getUsersCount();
    }

    getTaskCount();
  }, []);

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
    <div id="home_page" style={{ height: "692px" }}>
      <div className="banner">
        <h3>
          Welcome <span>{userInformation?.userName}</span>
        </h3>
        <p>You can add project and assign tasks to your team</p>
      </div>

      <Row>
        <Col md={6}>
          <div className="data-cart">
            <div className="title">
              <h3>Tasks</h3>
              <p>Lorem ipsum dolor sit amet,consecteture</p>
            </div>

            <Row>
              <Col md={4}>
                <div className="static-bx color-1">
                  <span className="icon">
                    <img src={IMAGES.static1} alt="pic" />
                  </span>
                  <p>To do</p>
                  <h3>{taskCount?.toDo}</h3>
                </div>
              </Col>

              <Col md={4}>
                <div className="static-bx color-2">
                  <span className="icon">
                    <img src={IMAGES.static2} alt="pic" />
                  </span>
                  <p>In progress</p>
                  <h3>{taskCount?.inProgress}</h3>
                </div>
              </Col>

              <Col md={4}>
                <div className="static-bx color-3">
                  <span className="icon">
                    <img src={IMAGES.static3} alt="pic" />
                  </span>
                  <p>Done</p>
                  <h3>{taskCount?.done}</h3>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        {userInformation?.group?.name === "Manager" && (
          <Col md={6}>
            <div className="data-cart">
              <div className="title">
                <h3>Users</h3>
                <p>Lorem ipsum dolor sit amet,consecteture</p>
              </div>

              <Row>
                <Col md={4}>
                  <div className="static-bx color-1">
                    <span className="icon">
                      <img src={IMAGES.static1} alt="pic" />
                    </span>
                    <p>active</p>
                    <h3>{usersCount?.activatedEmployeeCount}</h3>
                  </div>
                </Col>

                <Col md={4}>
                  <div className="static-bx color-2">
                    <span className="icon">
                      <img src={IMAGES.static2} alt="pic" />
                    </span>
                    <p>inactive</p>
                    <h3>{usersCount?.deactivatedEmployeeCount}</h3>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Dashboard;
