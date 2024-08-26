import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_HEADERS, USERS_URLS } from "../../../../constants/END_POINTS";

interface IFormInput {
  email?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  oldPassword?: string;
  seed?: number;
}

const ChangePassForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const response = await axios.put(
        USERS_URLS.changePass,
        data,
        {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      toast.success(response?.data?.message || "welcome back again");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "some_thing_wrong");
      console.log(error);
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

        <Button className="form-btn" variant="primary" type="submit">
          Save
        </Button>
      </Form>

      <div className="back-to-link">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ChangePassForm;
