import { Dropdown, Form } from "react-bootstrap";
import "./ProjectData.scss";
import Table from "react-bootstrap/Table";
import SortIcon from "./SortIcon";
import useUserInformation from "../../../../constants/useUserInformation";
import axios, { AxiosError } from "axios";
import { BASE_HEADERS, PROJECTS_URLS } from "../../../../constants/END_POINTS";
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

import { useNavigate, useSearchParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import ProjectDeleteModal from "../ProjectDeleteModal/ProjectDeleteModal";


interface ErrorResponse {
  message: string;
}
interface ProjectListType {
  title: string;
  description: string;
  creationDate: string;

  id: Number;
}
const ProjectData = () => {
  const [projectsList, setProjectsList] = useState<ProjectListType[]>([]);
  const { userInformation } = useUserInformation();
  console.log(userInformation?.group.name);
  const isManager = userInformation?.group.name === "Manager";
  const navigate = useNavigate();
  const getProject = async () => {

  id: number;
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
const ProjectData = () => {
  const [projectsList, setProjectsList] = useState<ProjectListType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
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

        { params: { pageSize: 10, pageNumber: 1 }, ...BASE_HEADERS }
      );
      console.log(response.data.data);
      setProjectsList(response.data.data);
    } catch (error) {
      const axiosError  = error as AxiosError<ErrorResponse>;


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
  useEffect(() => {
    getProject();

  }, [userInformation]);
  console.log(projectsList);

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

            <Form.Control type="email" placeholder="Search By Title" />
          </Form.Group>
        </Form>
      </div>

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
              Title <SortIcon />
            </th>
            <th>Description</th>
            <th>
              creationDate <SortIcon />
            </th>

            <th></th>
          </tr>
        </thead>

        <tbody>
          {projectsList.map((project) => (
            <tr>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.creationDate}</td>

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
                        }}
                      >
                        Update
                      </Dropdown.Item>
                      <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination"></div>

        {isLoading ? (
          <ScaleLoader className="loader" />
        ) : (
          <tbody>
            {projectsList.map((project) => (
              <tr>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td>{project.creationDate}</td>

                <td>
                  {isManager ? (
                    <Dropdown>
                      <Dropdown.Toggle>
                        <i className="fa-solid fa-ellipsis-vertical" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => navigate("/dashboard/update-project")}>
                          Update
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setModalShow(true);
                            setSelectedProjectId(project.id);
                          }}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {""}
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
      {modalShow && (
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
