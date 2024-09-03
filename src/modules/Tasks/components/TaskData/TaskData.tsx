import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  PROJECTS_URLS,
  TASKS_PROJECTS_URLS,
  TASKS_URLS,
  USERS_URLS,
} from "../../../../constants/END_POINTS";
import { getToken } from "../../../../constants/Tokenhandler";
import "./TaskData.scss";

interface IFormInput {
  title?: string;
  description?: string;
  employeeId: Number;
  projectId: Number;
}

interface User {
  userName: string;
  id: number;
}

interface Project {
  title: string;
  id: number;
}

const TaskData = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [userProject, setUserProject] = useState<Project[]>([]);
  const location = useLocation();
  const { updateTask, type } = location.state ? location.state : "";
  const [valueDescription, setValueDescription] = useState(
    type === "update" ? updateTask.description : ""
  );
  const [valueTitle, setValueTitle] = useState(
    type === "update" ? updateTask.title : ""
  );
  const[ valueProject ,setValueProject ] =useState(
    type === "update" ? updateTask.project.id : ""
  ) ;
  const[ valueEmployee ,setValueEmployee ] =useState(
     type === "update" ? updateTask.employee.id : ""
  )

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios({
        method: type === "update" ? "PUT" : "POST",
        url:type === "update" ? TASKS_URLS.update(updateTask.id) : TASKS_PROJECTS_URLS.creatTaskByManger,
        data:data,
        headers: { Authorization: getToken() },
      });
      console.log(response);

      toast.success(response?.data?.message || "task added");

      navigate("/dashboard/tasks");
    } catch (error) {
      toast.error(error.response?.data?.message || "some_thing_wrong");
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(USERS_URLS.getUsers, {
        params: {
          pageSize: 1000,
        },
        headers: { Authorization: getToken() },
      });

      // console.log(response.data.data);
      setUserList(response.data.data);
    } catch (error) {
      console.log(error);
    }
    
  };

  const getAllProject = async () => {
    try {
      const response = await axios.get(PROJECTS_URLS.getProjectsForManager, {
        params: {
          pageSize: 1000,
        },
        headers: { Authorization: getToken() },
      });
      setUserProject(response.data.data);
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    getUsers();
    getAllProject();
  }, []);
  useEffect(() => {
    const beforeUnload = (e) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);
  return (
    <>
      <div className="taskData-header m-4 p-3">
        <i className="fa-solid fa-less-than  "></i>
        <Link
          to={"/dashboard/tasks"}
          className="text-decoration-none text-black mx-3 "
        >
          View All Tasks
        </Link>
        {type === "update" ? (
          <h3 className="my-3 ">Update a Task</h3>
        ) : (
          <h3 className="my-3 ">Add a New Task</h3>
        )}
      </div>
      <div className="container-fluid bg-light p-1">
        <div className="form-container w-50 m-auto my-4 p-4 bg-white rounded-3">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4" controlId="">
              <Form.Label>Title</Form.Label>
              <InputGroup>
                <Form.Control
                  type="name"
                  className="rounded-3"
                  placeholder="Name"
                  {...register("title", {
                    required: "title is required",
                  })}
                 
                  onChange={(e) => setValueTitle(e.target.value)}
                  value={valueTitle}
                />
              </InputGroup>
              {errors.title && (
                <Alert className="p-2 mt-3">{errors?.title?.message}</Alert>
              )}
            </Form.Group>
            <Form.Group className="my-4" controlId="">
              <Form.Label>Description</Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  style={{ height: "100px" }}
                  {...register("description", {
                    required: "description is required",
                  })}
                  
                  onChange={(e) => setValueDescription(e.target.value)}
                  value={valueDescription}
                />
              </InputGroup>
              {errors.description && (
                <Alert className="p-2 mt-3">
                  {errors?.description?.message}
                </Alert>
              )}
            </Form.Group>

            <div className="row ">
              <div className="user-option col-md-6 ">
                <Form.Group className="my-4" controlId="">
                  <Form.Label>User</Form.Label>
                  <InputGroup>
                    <Form.Select
                      {...register("employeeId", {
                        required: "user is required",
                      })}
                      onChange={(e) => setValueEmployee(e.target.value)}
                      value={valueEmployee}
                    >
                      <option value="">Choose the User</option>
                      {userList?.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.userName}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  {errors.employeeId && (
                    <Alert className="p-2 mt-3">
                      {errors?.employeeId?.message}
                    </Alert>
                  )}
                </Form.Group>
              </div>
              <div className="project-option col-md-6 ">
                <Form.Group className="my-4" controlId="">
                  <Form.Label>Project</Form.Label>
                  <InputGroup>
                    <Form.Select
                      {...register("projectId", {
                        required: "project is required",
                      })}
                      onChange={(e) => setValueProject(e.target.value)}
                      value={valueProject}
        
                    >
                      <option value="">Choose the Project</option>

                      {userProject?.map((proj) => (
                        <option key={proj.id} value={`${proj.id}`}>
                          {proj.title}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                  {errors.projectId && (
                    <Alert className="p-2 mt-3">
                      {errors?.projectId?.message}
                    </Alert>
                  )}
                </Form.Group>
              </div>
            </div>
            <div className="btn-group d-flex justify-content-between">
              <div className="btn-save rounded-4">
                <Button
                  className="form-btn btn-outline-dark rounded-5 px-4"
                  variant=""
                  onClick={() => {
                    navigate("/dashboard/tasks");
                  }}
                >
                  cancel
                </Button>
              </div>
              <div className="btn-cancel">
                <Button
                  className="form-btn rounded-5 px-4 text-white"
                  variant="warning"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <ClipLoader size={15} color={"#fff"} />
                    </>
                  ) : type === "update" ? (
                    "update"
                  ) : (
                    "Add"
                  )}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default TaskData;
