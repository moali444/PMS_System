import { Dropdown, Form } from "react-bootstrap";
import "./UsersData.scss";
import Table from "react-bootstrap/Table";
import SortIcon from "./SortIcon";
import useUserInformation from "../../../../constants/useUserInformation";
import axios, { AxiosError } from "axios";
import {
  BASE_HEADERS,
  USERS_LIST,
  toggleStatusUrls,
} from "../../../../constants/END_POINTS";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import UserDeleteModal from "../UserDeleteModal/UserDeleteModal";
import { toast } from "react-toastify";

interface ErrorResponse {
  message: string;
}
interface UserType {
  id: number;
  userName: string;
  phoneNumber: string;
  email: string;
  creationDate: string;
  isActivated: boolean;
}
interface paginationInformation {
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  pageSize: number;
  pageNumber: number;
}

interface searchParams {
  pageSize: string;
  pageNumber: string;
  title: string;
}

const UsersData = () => {
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUserId, setSelectedUsersId] = useState<number | null>(null);
  const [paginationInfo, setPaginationInfo] = useState<paginationInformation>({
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
    pageSize: 10,
    pageNumber: 1,
  });
  const [filtrationSearch, setFiltrationSeacrh] = useState({
    title: "",
  });
  const [searchParams, setSearchParams] = useSearchParams({
    pageSize: paginationInfo.pageSize.toString(),
    pageNumber: paginationInfo.pageNumber.toString(),
    title: filtrationSearch.title,
  });

  const { userInformation } = useUserInformation();

  const isManager = userInformation?.group.name === "Manager";

  const navigate = useNavigate();

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(USERS_LIST.getUsersUrls, {
        params: {
          pageSize: searchParams.get("pageSize") || 10,
          pageNumber: searchParams.get("pageNumber"),
          title: searchParams.get("title"),
        },
        ...BASE_HEADERS,
      });
      console.log(response.data);
      setUsersList(response.data.data);
      setPaginationInfo({
        ...paginationInfo,
        totalNumberOfPages: response.data.totalNumberOfPages,
        totalNumberOfRecords: response.data.totalNumberOfRecords,
      });
      setIsLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "something went wrong");
      console.log(error);
    }
  };

  const toggleUserStatus = async (id: string) => {
    try {
      const response = await axios.put(
        USERS_LIST.toggleStatusUrls(id),
        {},
        {
          ...BASE_HEADERS,
        }
      );
      console.log(response.data);
      getAllUsers();
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [
    userInformation,
    paginationInfo.pageNumber,
    paginationInfo.pageSize,
    filtrationSearch,
  ]);

  const toggleActivation = (userId: number) => {
    setUsersList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isActivated: !user.isActivated } : user
      )
    );
  };

  return (
    <div id="project-data">
      <div className="form-background">
        <Form noValidate>
          <Form.Group className="search-input" controlId="">
            <i className="fa-solid fa-magnifying-glass"></i>
            <Form.Control
              type="text"
              placeholder="Search By Title"
              value={searchParams.get("title") || ""}
              onChange={(e) => {
                setFiltrationSeacrh({ title: e.target.value });
                setSearchParams({ ...searchParams, title: e.target.value });
              }}
            />
          </Form.Group>
        </Form>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              User Name <SortIcon />
            </th>
            <th>
              Status <SortIcon />
            </th>
            <th>
              Phone Number <SortIcon />
            </th>
            <th>
              Email <SortIcon />
            </th>
            <th>
              Date Created <SortIcon />
            </th>
            <th></th>
          </tr>
        </thead>
        {isLoading ? (
          <ScaleLoader className="loader" />
        ) : (
          <tbody>
            {usersList.map((user) => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>
                  {user.isActivated ? (
                    <span className="active-label">Active</span>
                  ) : (
                    <span className="deactive-label">Not Active</span>
                  )}
                </td>
                <td>{user.phoneNumber}</td>
                <td>{user.email}</td>
                <td>{user.creationDate}</td>
                <td>
                  {user.isActivated ? (
                    <i
                      className="fa-solid fa-toggle-on text-success fa-2x"
                      onClick={() => toggleUserStatus(user.id)}></i>
                  ) : (
                    <i
                      className="fa-solid fa-toggle-off text-danger fa-2x"
                      onClick={() => toggleUserStatus(user.id)}></i>
                  )}
                  {/* {isManager ? (
                    <Form.Check 
                      type="switch"
                      id={`switch-${user.id}`} // Unique ID for each switch
                      label=""
                      checked={user.isActivated}
                      onChange={() => toggleActivation(user.id)} // Attach the toggle function
                    />
                  ) : (
                    ""
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      <div className="pagination">
        <div className="pagination-info">
          Showing{" "}
          <select
            disabled={isLoading}
            onChange={(e) => {
              setPaginationInfo({
                ...paginationInfo,
                pageSize: Number(e.target.value),
                pageNumber: 1,
              });
              setSearchParams({
                ...searchParams,
                pageSize: e.target.value,
                pageNumber: "1",
              });
            }}>
            <option
              selected={searchParams.get("pageSize") === "5" || false}
              value={5}>
              5
            </option>
            <option
              selected={searchParams.get("pageSize") === "10" || false}
              value={10}>
              10
            </option>
            <option
              selected={searchParams.get("pageSize") === "20" || false}
              value={20}>
              20
            </option>
          </select>{" "}
          of {paginationInfo.totalNumberOfRecords} Results
        </div>
        <div className="pagination-page-number">
          Page {searchParams.get("pageNumber")} of{" "}
          {paginationInfo.totalNumberOfPages}
        </div>
        <button
          disabled={Number(searchParams.get("pageNumber")) === 1 || isLoading}
          className="pagination-prev"
          onClick={() => {
            setPaginationInfo({
              ...paginationInfo,
              pageNumber: paginationInfo.pageNumber - 1,
            });
            setSearchParams({
              ...searchParams,
              pageNumber: (
                Number(searchParams.get("pageNumber")) - 1
              ).toString(),
            });
          }}>
          <i className="fa-solid fa-chevron-left" />
        </button>
        <button
          disabled={
            Number(searchParams.get("pageNumber")) ===
              paginationInfo.totalNumberOfPages || isLoading
          }
          onClick={() => {
            setPaginationInfo({
              ...paginationInfo,
              pageNumber: paginationInfo.pageNumber + 1,
            });
            setSearchParams({
              ...searchParams,
              pageNumber: (
                Number(searchParams.get("pageNumber")) + 1
              ).toString(),
            });
          }}
          className="pagination-next">
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
      {/* {modalShow && (
        <UserDeleteModal
          selectedUserId={selectedUserId}
          modalShow={modalShow}
          setModalShow={setModalShow}
          getAllUsers={getAllUsers}
        />
      )} */}
    </div>
  );
};

export default UsersData;
