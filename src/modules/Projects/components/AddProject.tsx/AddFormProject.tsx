import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BASE_HEADERS, BASE_PROJECTS } from "../../../../constants/END_POINTS";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
export default function AddFormProject() {
  const navigate = useNavigate();

  // call api
  interface AddProject {
    title: string;
    description: string;
  }
  interface ErrorResponse {
    message: string;
  }
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddProject>();
  const onSubmit: SubmitHandler<AddProject> = (data) => {
    axios
      .post(BASE_PROJECTS, data, BASE_HEADERS)
      .then(() => {
        toast.success("Adding is Successfully");
        navigate("/dashboard/projects");
        localStorage.removeItem("onBeforeUnload");
      })
      .catch((error) => {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(
          axiosError.response?.data?.message ||
            "An error occurred. Please try again."
        );

        console.log(error);
      });
  };
  useEffect(() => {
    const onBeforeUnload = () => {
      localStorage.setItem("onBeforeUnload", JSON.stringify(getValues()));
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);
  useEffect(() => {
    if (localStorage.getItem("onBeforeUnload")) {
      const data_unload = JSON.parse(localStorage.getItem("onBeforeUnload"));
      setValue("title", data_unload.title);
      setValue("description", data_unload.description);
      console.log(data_unload);
    }
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
            <button
              type={"button"}
              onClick={() => {
                navigate(-1);
              }}>
              Cancel
            </button>
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  <ClipLoader size={15} color={"#fff"} />
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
