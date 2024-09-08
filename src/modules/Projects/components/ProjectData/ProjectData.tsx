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
import { getToken } from "../../../../constants/Tokenhandler";

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
          headers: { Authorization: getToken() },
        }
      );
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
    }
  };

  const handlePagination = (direction: "next" | "prev"): void => {
    const newPageNumber =
      paginationInfo.pageNumber + (direction === "next" ? 1 : -1);
    setPaginationInfo((prev) => ({ ...prev, pageNumber: newPageNumber }));
    setSearchParams((prev) => {
      prev.set("pageNumber", newPageNumber.toString());
      return prev;
    });
  };
  const handleSort = (value: "creationDate" | "title"): void => {
    const sortTitle = () => {
      setProjectsList(
        projectsList.sort((p1, p2) =>
          (sortedValue ? p2 : p1).title.localeCompare(
            (sortedValue ? p1 : p2).title
          )
        )
      );
    };
    const sortDate = () => {
      setProjectsList(
        projectsList.sort(
          (a, b) =>
            new Date((sortedValue ? b : a).creationDate).getTime() -
            new Date((sortedValue ? a : b).creationDate).getTime()
        )
      );
    };
    setSortedValue(!sortedValue);
    return value === "title" ? sortTitle() : sortDate();
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
                <tr key={project.id}>
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
                            onClick={() => {
                              let id: Number = project.id;
                              localStorage.setItem(
                                "Update_project",
                                JSON.stringify(id)
                              );

                              navigate("/dashboard/update-project");
                            }}>
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
