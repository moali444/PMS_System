import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "react-bootstrap";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    // try {
    //     const response = await axios.post('https://', data);
    //     toast.success(response?.data?.message || 'welcome back again');

    // toast.success("Login successfully", {
    //   position: "top-right",
    //   autoClose: 3000,
    //   theme: "colored",
    // });
    // } catch (error) {
    //     toast.error(error.response?.data?.message || 'some_thing_wrong');
    //     console.log(error);
    // toast.error(
    //   error?.response?.data?.message ||
    //     "An error occurred. Please try again.",
    //   {
    //     position: "top-right",
    //     autoClose: 3000,
    //     theme: "colored",
    //   }
    // );
    // }
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
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-regular fa-eye-slash" />
              ) : (
                <i className="fa-regular fa-eye" />
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
        <Button className="form-btn" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
