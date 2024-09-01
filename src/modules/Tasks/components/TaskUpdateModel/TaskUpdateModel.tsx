import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Form, InputGroup, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TASKS_URLS, USERS_URLS } from "../../../../constants/END_POINTS";
import { getToken } from "../../../../constants/Tokenhandler";
import { toast } from "react-toastify";

// interface Employe {
//   employeeId: Number;
// }

// interface updateTask {
//   title?: string;
//   description?: string;
// }

// interface Task {
//   id: number;
//   title: string;
//   employee: Employe;
//   description: string;
// }

interface IFormInput {
  title: string;
  description: string;
  employeeId: number;
}

export default function TaskUpdateModel({ taskData }) {
  const [userList, setUserList] = useState([]);
  // console.log(taskData);

  const [modalShow, setModalShow] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();

  // const onSubmit: SubmitHandler<IFormInput> = async (data) => {
  //   alert("welcome");
  //   // console.log(data);
  //   // try {
  //   //   const response = await axios.put(TASKS_URLS.update(taskData), data, {
  //   //     headers: { Authorization: getToken() },
  //   //   });
  //   //   console.log(response);

  //   //   toast.success("task Item updated");
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  const seyHi = () => {
    console.log("hi");
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
      // console.log(userList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  });

  useEffect(() => {
    if (taskData) {
      setValue("title", taskData.title);
      setValue("description", taskData.description);
      setValue("employeeId", taskData.employee.id);
    }
  });

  return (
    <>
      <button className="dropdown-item" onClick={() => setModalShow(true)}>
        <i className="fa-regular fa-pen-to-square me-3"></i>Edit
      </button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="d-flex justify-content-end mx-4 my-4">
          <button
            className="btn btn-model d-flex justify-content-center align-items-center"
            onClick={() => setModalShow(false)}
          >
            <i className="fa-solid fa-close"></i>
          </button>
        </div>
        <Modal.Body>
          <Form onSubmit={handleSubmit(seyHi)}>
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
                      <option value="Choose the User" hidden>
                        Choose the User
                      </option>
                      {userList.map((user) => (
                        <option value={user.id}>{user.userName}</option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>
              </div>
            </div>
            <div className="btn-group d-flex justify-content-between flex-row-reverse">
              <div className="btn-cancel">
                <Button
                  className="form-btn rounded-5 px-4 text-white"
                  variant="warning"
                  type="submit"
                  // disabled={isSubmitting}
                >
                  Save
                </Button>
              </div>
              <div className="btn-save rounded-4">
                <Button
                  className="form-btn btn-outline-dark rounded-5 px-4"
                  variant=""
                  onClick={() => {
                    setModalShow(false);
                  }}
                >
                  cancel
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
