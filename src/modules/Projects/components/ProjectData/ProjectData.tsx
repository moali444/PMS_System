import { Dropdown, Form } from "react-bootstrap";
import "./ProjectData.scss";
import Table from "react-bootstrap/Table";
import SortIcon from "./SortIcon";
import useUserInformation from "../../../../constants/useUserInformation";
import axios, { AxiosError } from "axios";
import { BASE_HEADERS, PROJECTS_URLS } from "../../../../constants/END_POINTS";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import ProjectDeleteModal from "../ProjectDeleteModal/ProjectDeleteModal";
import { toast } from "react-toastify";
import NoData from "../../../Shared/components/NoData/NoData";

interface ErrorResponse {
  message: string;
}
interface ProjectListType {
  title: string;
  description: string;
  creationDate: string;
  id: number;
}
interface paginationInformation {
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  pageSize: number;
  pageNumber: number;
}

const ProjectData = () => {
  const [projectsList, setProjectsList] = useState<ProjectListType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [sortedValue, setSortedValue] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
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
  const getProject = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        isManager
          ? PROJECTS_URLS.getProjectsForManager
          : PROJECTS_URLS.getProjectsForEmployee,
        {
          params: {
            pageSize: searchParams.get("pageSize") || 10,
            pageNumber: searchParams.get("pageNumber"),
            title: searchParams.get("title"),
          },
          ...BASE_HEADERS,
        }
      );
      console.log(response.data);
      setProjectsList(response.data.data);
      setPaginationInfo({
        ...paginationInfo,
        totalNumberOfPages: response.data.totalNumberOfPages,
        totalNumberOfRecords: response.data.totalNumberOfRecords,
      });
      setIsLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "some thing wrong");
      console.log(error);
    }
  };

  const handlePagination = (value: string): void => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === "next") {
      setPaginationInfo({
        ...paginationInfo,
        pageNumber: paginationInfo.pageNumber + 1,
      });
      newParams.set(
        "pageNumber",
        (Number(searchParams.get("pageNumber")) + 1).toString()
      );
      newParams.set("pageSize", paginationInfo.pageSize.toString());
      setSearchParams(newParams);
    } else {
      setPaginationInfo({
        ...paginationInfo,
        pageNumber: paginationInfo.pageNumber - 1,
      });
      newParams.set(
        "pageNumber",
        (Number(searchParams.get("pageNumber")) - 1).toString()
      );
      newParams.set("pageSize", paginationInfo.pageSize.toString());
      setSearchParams(newParams);
    }
  };
  const handleSort = (value: string): void => {
    if (value === "title") {
      if (sortedValue) {
        console.log("sorted");
        setProjectsList(
          projectsList.sort((p1, p2) => p2.title.localeCompare(p1.title))
        );
        setSortedValue(false);
      } else if (!sortedValue) {
        setProjectsList(
          projectsList.sort((p1, p2) => p1.title.localeCompare(p2.title))
        );
        setSortedValue(true);
      }
    } else {
      if (sortedValue) {
        setProjectsList(
          projectsList.sort(
            (a, b) =>
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
          )
        );
        setSortedValue(false);
      } else if (!sortedValue) {
        setProjectsList(
          projectsList.sort(
            (a, b) =>
              new Date(a.creationDate).getTime() -
              new Date(b.creationDate).getTime()
          )
        );
        setSortedValue(true);
      }
    }
  };
  useEffect(() => {
    if (userInformation) {
      getProject();
    }
  }, [
    userInformation,
    paginationInfo.pageNumber,
    paginationInfo.pageSize,
    filtrationSearch,
  ]);

  return (
    <div id="project-data">
      <div className="form-background">
        <Form noValidate>
          <Form.Group className="search-input" controlId="">
            <i className="fa-solid fa-magnifying-glass"></i>
            <Form.Control
              type="email"
              placeholder="Search By Title"
              value={searchParams.get("title") || ``}
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
              Title{" "}
              <span onClick={() => handleSort("title")}>
                <SortIcon />
              </span>
            </th>
            <th>Description</th>
            <th>
              creationDate{" "}
              <span onClick={() => handleSort("creationDate")}>
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
            {projectsList.length > 0 ? (
              projectsList.map((project) => (
                <tr>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>{new Date(project.creationDate).toLocaleString()}</td>

                  <td>
                    {isManager ? (
                      <Dropdown>
                        <Dropdown.Toggle>
                          <i className="fa-solid fa-ellipsis-vertical" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              navigate("/dashboard/update-project")
                            }>
                            <i className="fa-regular fa-pen-to-square me-3" />
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              setModalShow(true);
                              setSelectedProjectId(project.id);
                            }}>
                            <i className="fa-solid fa-trash me-2" />
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        )}
        {""}
      </Table>
      {projectsList.length > 0 ? (
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
            onClick={() => handlePagination("prev")}>
            <i className="fa-solid fa-chevron-left" />
          </button>
          <button
            disabled={
              Number(searchParams.get("pageNumber")) ===
                paginationInfo.totalNumberOfPages || isLoading
            }
            onClick={() => handlePagination("next")}
            className="pagination-next">
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      ) : (
        ""
      )}

      {modalShow && selectedProjectId !== null && (
        <ProjectDeleteModal
          selectedProjectId={selectedProjectId}
          modalShow={modalShow}
          setModalShow={setModalShow}
          getProject={getProject}
        />
      )}
    </div>
  );
};

export default ProjectData;
