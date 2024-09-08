import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { USERS_URLS } from "../../../../constants/END_POINTS";
import { getToken } from "../../../../constants/Tokenhandler";

interface IFormInput {
  email?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  oldPassword?: string;
  seed?: number;
}
interface ErrorResponse {
  message: string;
}
const ChangePassForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.put(USERS_URLS.changePass, data, {
        headers: { Authorization: getToken() },
      });
      toast.success(
        response?.data?.message || "Password has been updated successfully"
      );
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "some_thing_wrong");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Old Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter your New Password"
              {...register("oldPassword", {
                required: "oldPassword is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            <span
              className="show-icon"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? (
                <i className="fa-regular fa-eye-slash" />
              ) : (
                <i className="fa-regular fa-eye" />
              )}
            </span>
          </InputGroup>
          {errors.oldPassword && (
            <Alert className="p-2 mt-3">{errors?.oldPassword?.message}</Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>New Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your New Password"
              {...register("newPassword", {
                required: "newPassword is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            <span
              className="show-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-regular fa-eye-slash" />
              ) : (
                <i className="fa-regular fa-eye" />
              )}
            </span>
          </InputGroup>
          {errors.newPassword && (
            <Alert className="p-2 mt-3">{errors?.newPassword?.message}</Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-5" controlId="">
          <Form.Label>Confirm New Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              {...register("confirmNewPassword", {
                required: "confirmNewPassword is required",
                validate: (value) => {
                  return (
                    value === watch("newPassword") || "Password does not match"
                  );
                },
              })}
            />
            <span
              className="show-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <i className="fa-regular fa-eye-slash" />
              ) : (
                <i className="fa-regular fa-eye" />
              )}
            </span>
          </InputGroup>
          {errors.confirmNewPassword && (
            <Alert className="p-2 mt-3">
              {errors?.confirmNewPassword?.message}
            </Alert>
          )}
        </Form.Group>

        <Button
          className="form-btn"
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="m-2">Loading... </span>
              <ClipLoader size={15} color={"#fff"} />
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </Form>

      <div className="back-to-link">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ChangePassForm;
