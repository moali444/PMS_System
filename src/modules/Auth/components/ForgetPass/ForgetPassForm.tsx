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
    console.log(data);
    try {
      const response = await axios.post(USERS_URLS.forgetPass, data);
      toast.info(response.data.message);
      navigate("/reset-pass");
    } catch (error:any) {
      toast.error(error.response.data.message);
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

        <Button className="form-btn" variant="primary" type="submit">
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
