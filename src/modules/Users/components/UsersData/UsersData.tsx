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
import { useSearchParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";

import { toast } from "react-toastify";
import { getToken } from "../../../../constants/Tokenhandler";

interface ErrorResponse {
  message: string;
}
interface UserType {
  id: number;
  userName: string;
  phoneNumber: string;
  email: string;
  country: string;
  isActivated: boolean;
}
interface paginationInformation {
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  pageSize: number;
  pageNumber: number;
}

const UsersData = () => {
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortedValue, setSortedValue] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState<paginationInformation>({
    totalNumberOfPages: 0,
    totalNumberOfRecords: 0,
    pageSize: 10,
    pageNumber: 1,
  });
  const [searchParams, setSearchParams] = useSearchParams({
    pageSize: paginationInfo.pageSize.toString(),
    pageNumber: paginationInfo.pageNumber.toString(),
  });

  const { userInformation } = useUserInformation();

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(USERS_LIST.getUsersUrls, {
        params: {
          pageSize: searchParams.get("pageSize") || 10,
          pageNumber: searchParams.get("pageNumber"),
        },
        headers: { Authorization: getToken() },
      });
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
    }
  };

  const toggleUserStatus = async (id: string) => {
    try {
      const response = await axios.put(
        USERS_LIST.toggleStatusUrls(id),
        {},
        {
          headers: { Authorization: getToken() },
        }
      );
      getAllUsers();
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "something went wrong");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [userInformation, paginationInfo.pageNumber, paginationInfo.pageSize]);

  const handleSort = (
    value: "status" | "userName" | "country" | "phoneNumber"
  ): void => {
    const sortUserName = () => {
      setUsersList(
        usersList.sort((p1, p2) =>
          (sortedValue ? p2 : p1).userName.localeCompare(
            (sortedValue ? p1 : p2).userName
          )
        )
      );
    };
    const sortCountry = () => {
      setUsersList(
        usersList.sort((p1, p2) =>
          (sortedValue ? p2 : p1).country.localeCompare(
            (sortedValue ? p1 : p2).country
          )
        )
      );
    };
    const sortStatus = () => {
      setUsersList(
        usersList.sort((p1, p2) =>
          (sortedValue ? p2 : p1).isActivated
            .toString()
            .localeCompare((sortedValue ? p1 : p2).isActivated.toString())
        )
      );
    };
    const sortPhoneNumber = () => {
      setUsersList(
        usersList.sort((a, b) =>
          sortedValue
            ? Number(b.phoneNumber) - Number(a.phoneNumber)
            : Number(a.phoneNumber) - Number(b.phoneNumber)
        )
      );
    };
    setSortedValue(!sortedValue);
    if (value === "userName") {
      return sortUserName();
    } else if (value === "status") {
      return sortStatus();
    } else if (value === "country") {
      return sortCountry();
    } else if (value === "phoneNumber") return sortPhoneNumber();
  };
  return (
    <div id="users-data">
      <Table striped bordered hover>
        <thead style={{ background: "blue !important" }}>
          <tr>
            <th>
              User Name{" "}
              <span onClick={() => handleSort("userName")}>
                <SortIcon />
              </span>
            </th>
            <th>
              Status{" "}
              <span onClick={() => handleSort("status")}>
                <SortIcon />
              </span>
            </th>
            <th>
              Phone Number{" "}
              <span onClick={() => handleSort("phoneNumber")}>
                <SortIcon />
              </span>
            </th>
            <th>Email</th>
            <th>
              Country{" "}
              <span onClick={() => handleSort("country")}>
                <SortIcon />
              </span>
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
                <td>{user.country}</td>
                <td>
                  {user.isActivated ? (
                    <i
                      className="fa-solid fa-toggle-on text-success fa-2x"
                      onClick={() => toggleUserStatus(user.id.toString())}></i>
                  ) : (
                    <i
                      className="fa-solid fa-toggle-off text-danger fa-2x"
                      onClick={() => toggleUserStatus(user.id.toString())}></i>
                  )}
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
            value={searchParams.get("pageSize") || 10}
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
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
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
    </div>
  );
};

export default UsersData;
