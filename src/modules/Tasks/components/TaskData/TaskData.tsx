import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TASKS_PROJECTS_URLS,
  USERS_URLS,
} from "../../../../constants/END_POINTS";
import { getToken } from "../../../../constants/Tokenhandler";
import "./TaskData.scss";
import { Alert, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

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

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(
        TASKS_PROJECTS_URLS.creatTaskByManger,
        data,
        {
          headers: { Authorization: getToken() },
        }
      );
      console.log(response);

      toast.success(response?.data?.message || "task added");

      navigate("/dashboard/tasks");
    } catch (error) {
      toast.error(error.response?.data?.message || "some_thing_wrong");
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(USERS_URLS.getUsers, {
        headers: { Authorization: getToken() },
      });

      console.log(response.data.data);
      setUserList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProject = async () => {
    try {
      const response = await axios.get(TASKS_PROJECTS_URLS.getAllProject, {
        headers: { Authorization: getToken() },
      });
      console.log(response.data.data);
      setUserProject(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getAllProject();
  }, []);

  return (
    <>
      <div className="taskData-header m-4 p-3">
        <i className="fa-solid fa-less-than  "></i>
        <Link to={"tasks"} className="text-decoration-none text-black mx-3 ">
          View All Tasks
        </Link>
        <h3 className="my-3 ">Add a New Task</h3>
      </div>
      <div className="container-fluid bg-light p-1">
        <div className="form-container w-75 m-auto my-5 p-4 bg-white rounded-3">
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
                    >
                      <option disabled hidden>
                        Choose the User
                      </option>
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
                    >
                      <option disabled hidden>
                        Choose the Project
                      </option>

                      {userProject?.map((proj) => (
                        <option key={proj.id} value={proj.id}>
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
                  Save
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
