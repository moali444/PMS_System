import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "react-bootstrap";

import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { USERS_URLS } from "../../../../constants/END_POINTS";

import { ClipLoader } from "react-spinners";

interface IFormInput {
  email: string;
  password: string;
}
interface ErrorResponse {
  message: string;
}
interface LoginResponse {
  token: string;
  message: string;
}
const LoginForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    try {
      const response = await axios.post<LoginResponse>(USERS_URLS.login, data);
      const { token, message } = response.data;
      toast.success(message || "welcome back again");
      navigate("/dashboard");
      localStorage.setItem("token", token);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "some_thing_wrong");
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your E-mail"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "please enter a valid email",
              },
            })}
          />
          {errors.email && (
            <Alert className="mt-3 py-2">{errors.email.message}</Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <button
              className="show-icon"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Hide password button" : "Show password button"
              }>
              {showPassword ? (
                <i className="fa-regular fa-eye-slash" title="Hide password" />
              ) : (
                <i className="fa-regular fa-eye" title="Show password" />
              )}
            </button>
          </InputGroup>
          {errors.password && (
            <Alert className="p-2 mt-3">{errors?.password?.message}</Alert>
          )}
        </Form.Group>

        <div className="form-links">
          <Link to="/register">Register Now?</Link>
          <Link to="/forget-pass">Forgot Password?</Link>
        </div>
        <Button
          disabled={isSubmitting}
          className="form-btn"
          variant="primary"
          type="submit">
          {isSubmitting ? (
            <>
              <span className="m-2">Loading... </span>
              <ClipLoader size={15} color={"#fff"} />
            </>
          ) : (
            "Login"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
