import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert, Col, Row } from "react-bootstrap";
import { USERS_URLS } from "../../../../constants/END_POINTS";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

interface IFormInput {
  userName: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
  profileImage: Array<string>;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  //const [uploadedFile, SetUploadedFile] = useState('');

  const appendToFormData = (data: IFormInput) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("phoneNumber", data.userName);
    formData.append("country", data.country);
    formData.append("profileImage", data.profileImage[0]);

    return formData;
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const registerData = appendToFormData(data);
    //console.log("Success:", data);
    try {
      const response = await axios.post(USERS_URLS.register, registerData);
      toast.success(response?.data?.message || "registered successfuly");
      navigate("/verify-account");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              {/* <Form.Label>E-mail</Form.Label> */}
              <Form.Control
                type="file"
                placeholder="upload your image"
                {...register("profileImage", {
                  required: "image is required",
                })}
              />
              {errors.profileImage && (
                <Alert className="mt-3 py-2">
                  {errors.profileImage.message}
                </Alert>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register("userName", {
                  required: "user name is required",
                })}
              />
              {errors.userName && (
                <Alert className="mt-3 py-2">{errors.userName.message}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your country"
                {...register("country", {
                  required: "country name is required",
                })}
              />
              {errors.country && (
                <Alert className="mt-3 py-2">{errors.country.message}</Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
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
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
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

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your phone number"
                {...register("phoneNumber", {
                  required: "OTP is required",
                })}
              />
              {errors.phoneNumber && (
                <Alert className="mt-3 py-2">
                  {errors.phoneNumber.message}
                </Alert>
              )}
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("confirmPassword", {
                    required: "Password is required",
                    validate: (value) => {
                      return (
                        value === watch("password") || "Password does not match"
                      );
                    },
                  })}
                />
                <span
                  className="show-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <i className="fa-regular fa-eye-slash" />
                  ) : (
                    <i className="fa-regular fa-eye" />
                  )}
                </span>
              </InputGroup>
              {errors.confirmPassword && (
                <Alert className="p-2 mt-3">
                  {errors?.confirmPassword?.message}
                </Alert>
              )}
            </Form.Group>
          </Col>
        </Row>

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
            "Save"
          )}
        </Button>
      </Form>

      <div className="back-to-link">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
