import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./AddProject.scss";
import { BASE_HEADERS, BASE_PROJECTS } from "../../../../constants/END_POINTS";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AddProject() {
  const navigate = useNavigate();
  // call api
  interface AddProject {
    title: String;
    description: String;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProject>();
  const onSubmit: SubmitHandler<AddProject> = (data) => {
    axios
      .post(BASE_PROJECTS, data, BASE_HEADERS)
      .then(() => {
        toast.success("adding is true", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/dashboard/projects");
      })
      .catch((error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
        console.log(error);
      });
  };
  return (
    <>
      <div className="header-project">
        <div className="project-view">
          <span>
            <i className="fa-solid fa-angle-left"></i>
          </span>
          <strong>View All Projects</strong>
        </div>
        <div className="main-text">
          <h1>Add a New Project</h1>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-AddProject">
            <div className="info">
              <span>Title</span>
              <InputGroup>
                <Form.Control
                  {...register("title", { required: "pleace enter title" })}
                  placeholder="Title"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  style={{ borderRadius: "1rem", outline: "none" }}
                />
              </InputGroup>
              <span style={{ color: "red" }}>{errors.title?.message}</span>
              <div className="mt-4">
                <span>Description</span>

                <InputGroup>
                  <Form.Control
                    {...register("description", {
                      required: "description is required",
                    })}
                    as="textarea"
                    aria-label="With textarea"
                    style={{ borderRadius: "1rem", height: "100px" }}
                    placeholder="Description"
                  />
                </InputGroup>
                <span
                  style={{
                    color: "red",
                    textTransform: "capitalize",
                    margin: "10px",
                  }}
                >
                  {errors.description?.message}
                </span>
              </div>
            </div>
            <div className="footerAddProject d-flex justify-content-between align-items-center">
              <button>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
