import AuthFormCart from '../../../Shared/components/AuthFormCart/AuthFormCart';
import RegisterForm from './RegisterForm';
import './Register.scss';

const Register = () => {
  return (
    <div id='Register_page'>
      <AuthFormCart 
        title_text='Create New Account'
        content={
          <RegisterForm />
        } 
      />
    </div>
  )
}

export default Register