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
import { saveTokenToLocalStorage } from "../../../../constants/Tokenhandler";
import { BeatLoader } from "react-spinners";

interface IFormInput {
  email: string;
  password: string;
}
interface ErrorResponse {
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
    console.log(data);
    try {
      const response = await axios.post(USERS_URLS.login, data);
      toast.success(response?.data?.message || "welcome back again");
      navigate("/dashboard");

      saveTokenToLocalStorage(response.data.token);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || "some_thing_wrong");
      console.log(error);
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
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            <span
              className="show-icon"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <i className="fa-regular fa-eye-slash" title="Hide password" />
              ) : (
                <i className="fa-regular fa-eye" title="Show password" />
              )}
            </span>
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
            <BeatLoader size={15} margin={"2px"} color="white" />
          ) : (
            "Login"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
