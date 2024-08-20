import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "react-bootstrap";

interface IFormInput {
  email: string;
  password: string;
}

const ForgetPassForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    // try {
    //     const response = await axios.post('https://', data);
    //     toast.success(response?.data?.message || 'welcome back again');
    // } catch (error) {
    //     toast.error(error.response?.data?.message || 'some_thing_wrong');
    //     console.log(error);
    // }
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
          Verify
        </Button>
      </Form>
      <div className="back-to-link">
        <Link to="/login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgetPassForm;
