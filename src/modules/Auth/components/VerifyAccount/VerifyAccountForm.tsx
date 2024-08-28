import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import {USERS_URLS} from "../../../../constants/END_POINTS"
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function VerifyAccountForm() {
   
   const navigate = useNavigate()


   interface IFormInput {
      email: string;
      code: string;
   }

   const {
      register,
      handleSubmit,
      formState: { errors ,isSubmitting},
   } = useForm<IFormInput>()

   // call Api Verify Account

   const onSubmit: SubmitHandler<IFormInput> = (data: any) => {

      axios.put(USERS_URLS.verify, data)

         .then(() =>{
            toast.success("Verify account is Successfully", {
               position: "top-right",
               autoClose: 3000,
               theme: "colored",
             });
            navigate("/login")
         })
         .catch((error) =>{
            toast.error(
               error?.response?.data?.message ||
                 "An error occurred. Please try again.",
               {
                 position: "top-right",
                 autoClose: 3000,
                 theme: "colored",
               }
             );
            
         })



   }

   return (
      <div  >
         <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3 mt-4" controlId="">
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
                  <Alert className="mt-3 mt-4 py-2">{errors.email.message}</Alert>
               )}
            </Form.Group>

            <Form.Group className="mb-3 mt-4" controlId="">
               <Form.Label>OTP Verification</Form.Label>
               <InputGroup>
                  <Form.Control
                     type="text"
                     placeholder="Enter Verification"
                     {...register("code", {
                        required: "pleace enter your code",

                     })}
                  />

               </InputGroup>

            </Form.Group>

            <Button
          disabled={isSubmitting}
          className="form-btn"
          variant="primary"
          type="submit">
          {isSubmitting ? (
            <BeatLoader size={15} margin={"2px"} color="white" />
          ) : (
            "save"
          )}
        </Button>
         </Form>
      </div>
   )
}

export default VerifyAccountForm
