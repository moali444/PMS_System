import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { USERS_URLS } from "../../../../constants/END_POINTS";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface IFormInput {
  email: string;
}
interface IForgetPassResponse {
  message: string;
}
interface IErrorResponse {
  message: string;
  statusCode: number;
  additionalInfo: Record<string, any>;
}

const ForgetPassForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<IFormInput>();
  const navigate = useNavigate();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      const response = await axios.post<IForgetPassResponse>(
        USERS_URLS.forgetPass,
        data
      );
      console.log(response);
      toast.info(response.data.message);
      navigate("/reset-pass");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorResponse: IErrorResponse = error.response
          .data as IErrorResponse;
        toast.error(errorResponse.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="mb-5" controlId="formBasicEmail">
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
            "Verify"
          )}
        </Button>
      </Form>
      <div className="back-to-link">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgetPassForm;
