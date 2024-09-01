import { Dropdown, Form } from "react-bootstrap";
import "./ProjectData.scss";
import Table from "react-bootstrap/Table";
import SortIcon from "./SortIcon";
import useUserInformation from "../../../../constants/useUserInformation";
import axios, { AxiosError } from "axios";
import { BASE_HEADERS, PROJECTS_URLS } from "../../../../constants/END_POINTS";
import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";

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
      const axiosError = error as AxiosError<ErrorResponse>;

      console.log(error);
    }
  };
  useEffect(() => {
    getProject();
  }, [userInformation]);
  console.log(projectsList);
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
    </div>
  );
};

export default ProjectData;
