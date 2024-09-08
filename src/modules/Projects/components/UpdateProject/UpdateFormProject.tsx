import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BASE_HEADERS, PROJECTS_URLS } from "../../../../constants/END_POINTS";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
export default function UpdateProject() {
  const navigate = useNavigate();
  const [data_list, set_data_list] = useState<UpdateProject | undefined>();
  const storedValue = localStorage.getItem("Update_project");
  const project_id: any = storedValue ? JSON.parse(storedValue) : null;
  // call api
  interface UpdateProject {
    id?: number;
    title: string | undefined;
    description: string | undefined;
  }
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProject>();
  const set_Data = () => {
    setValue("title", data_list?.title);
    setValue("description", data_list?.description);
    setValue("id", data_list?.id);
  };
  set_Data();

  const onSubmit: SubmitHandler<UpdateProject> = () => {

    axios
      .put(PROJECTS_URLS.UpdateProject(project_id), getValues(), BASE_HEADERS)
      .then(() => {
        toast.success("Update is Successfully");
        navigate("/dashboard/projects");
        localStorage.removeItem("Update_project");
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "An error occurred. Please try again."
        );
      });
    set_data_list(undefined);
  };
  const get_project = () => {
    axios
      .get(PROJECTS_URLS.getProject(project_id), BASE_HEADERS)
      .then((responce) => {
        set_data_list(responce.data);
      })
      .catch((error) => {
      });
  };
  useEffect(() => {
    get_project();
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
                }}>
                {errors.description?.message}
              </span>
            </div>
          </div>
          <div className="footerAddProject d-flex justify-content-between align-items-center">
            <button>Cancel</button>
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  <ClipLoader size={15} color={"#fff"} />
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
