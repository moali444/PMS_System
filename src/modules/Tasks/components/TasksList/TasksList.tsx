import { Dropdown } from "react-bootstrap";
import SortIcon from "./SortIcone";
import "./TasksList.scss";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_HEADERS, TASKS_URLS } from "../../../../constants/END_POINTS";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import TaskModelView from "../TaskModelView/TaskModelView";
import TaskDeleteModel from "../TaskDeleteModel/TaskDeleteModel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import NoData from "../../../Shared/components/NoData/NoData";
import { ScaleLoader } from "react-spinners";
import useUserInformation from "../../../../constants/useUserInformation";

interface Manager {
  id: number;
  userName: string;
  imagePath: string;
}

interface Project {
  id: number;
  title: string;
  manager: Manager;
}

interface Employee {
  userName: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "ToDo" | "InProgress" | "Done";
  creationDate: string;
  project: Project;
  employee: Employee | null;
}

interface TasksResponse {
  pageNumber: number;
  pageSize: number;
  data: Task[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}
interface ErrorResponse {
  message: string;
}

const TasksList = () => {
  const { userInformation, loading: userLoading } = useUserInformation();
  console.log(userInformation);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");
  const [title, setTitle] = useState<string>(
    localStorage.getItem("searchTitle") || ""
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("searchTitle", title);
  }, [title]);

  const getAllManagerTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<TasksResponse>(TASKS_URLS.tasksManger, {
        params: {
          pageSize,
          pageNumber: currentPage,
          status: filter || undefined,
          title: title || undefined,
        },
        ...BASE_HEADERS,
      });

      console.log(response.data.data);
      setTasks(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error(axiosError.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await axios.delete(TASKS_URLS.delete(id), BASE_HEADERS);

      toast.success("Task deleted successfully!");
      getAllManagerTasks();
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error(axiosError.response?.data.message);
    }
  };

  useEffect(() => {
    getAllManagerTasks();
  }, [filter, title, currentPage, pageSize]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    console.log(filter);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTitle(event.target.value);
    console.log(title);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };
  if (userLoading) {
    return (
      <div
        className="loadingContainer d-flex justify-content-center align-items-center"
        style={{ minHeight: "692px" }}
      >
        <ScaleLoader className="loader" color="rgba(49, 89, 81, 0.9)" />
      </div>
    );
  }

  return (
    <div id="tasks-bx" style={{ minHeight: "692px" }}>
      {userInformation?.group?.name === "Manager" ? (
        <>
          <header className="d-flex justify-content-between p-4">
            <h2>Tasks</h2>
            <button
              onClick={() => {
                navigate("/dashboard/add-task");
              }}
            >
              <i className="fa-solid fa-plus mx-3"></i>Add New Task
            </button>
          </header>
          <div className="tasksInfo shadow-sm mt-5  m-auto">
            <div className="filtration  d-flex py-4 px-3">
              <div className="inputContiner me-3">
                <div className="input-group flex-nowrap">
                  <span className="input-group-text" id="addon-wrapping">
                    <i className="fas fa-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 me-2"
                    placeholder="Search Fleets"
                    value={title}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <div className="filterOption">
                <select
                  className="form-select"
                  onChange={handleFilterChange}
                  value={filter}
                  aria-label="Filter by status"
                >
                  <option value="">
                    <i className="fas fa-filter me-2" aria-hidden="true"></i>{" "}
                    Filter
                  </option>
                  <option value="ToDo">To Do</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
            </div>

            <table className={`table ${!loading ? "table-striped" : ""}`}>
              <thead>
                <tr>
                  <th scope="col">
                    Title
                    <span className="ms-5">
                      <SortIcon />
                    </span>
                  </th>
                  <th scope="col">
                    Status
                    <span className="ms-2">
                      <SortIcon />
                    </span>
                  </th>
                  <th scope="col">
                    User
                    <span className="ms-3">
                      <SortIcon />
                    </span>
                  </th>
                  <th scope="col">
                    Project
                    <span className="ms-4">
                      <SortIcon />
                    </span>
                  </th>
                  <th scope="col">
                    Date Created
                    <span className="ms-2">
                      <SortIcon />
                    </span>
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Array.from({ length: 5 }).map((_, index) => (
                  //   <tr key={index}>
                  //     <td>
                  //       <Skeleton />
                  //     </td>
                  //     <td>
                  //       <Skeleton />
                  //     </td>
                  //     <td>
                  //       <Skeleton />
                  //     </td>
                  //     <td>
                  //       <Skeleton />
                  //     </td>
                  //     <td>
                  //       <Skeleton />
                  //     </td>
                  //     <td>
                  //       <Skeleton />
                  //     </td>
                  //   </tr>
                  // ))
                  <tr>
                    <td colSpan={6} className="customTd">
                      <div className="loadingContainer">
                        <ScaleLoader className="loader" />
                      </div>
                    </td>
                  </tr>
                ) : tasks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center ">
                      <div style={{ height: "350px" }}>
                        <NoData />
                      </div>
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => (
                    <tr key={task.id}>
                      <td scope="row">{task.title}</td>
                      <td>
                        <div
                          className={`status ${
                            task.status === "ToDo"
                              ? "toDo"
                              : task.status === "InProgress"
                              ? "inProgress"
                              : task.status === "Done"
                              ? "done"
                              : ""
                          }`}
                        >
                          {task.status}
                        </div>
                      </td>
                      <td>{task?.employee?.userName}</td>
                      <td>{task.project.title}</td>
                      <td>
                        {new Date(task.creationDate).toLocaleDateString()}
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle>
                            <i className="fa-solid fa-ellipsis-vertical fw-bold" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <TaskModelView task={task} />
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <button>
                                <i className="fa-regular fa-pen-to-square me-3"></i>
                                Edit
                              </button>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <TaskDeleteModel
                                deleteTask={() => {
                                  deleteTask(task.id);
                                }}
                              />
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {tasks.length > 0 && (
              <div className="pagination-controls d-flex justify-content-end mt-4 pb-3 pe-3 align-items-center ">
                <div className="me-5">
                  <label className="me-3">Showing </label>
                  <select
                    className="me-3 form-select   d-inline-block w-auto"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                  >
                    {[1, 5, 10, 15, 20].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <label> per page</label>
                </div>

                <div>
                  <span className="me-3 ">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn  me-2 fs-3 "
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  <button
                    className="btn fs-3 "
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="p-5">
          <h3>Task Board</h3>
        </div>
      )}
    </div>
  );
};

export default TasksList;
