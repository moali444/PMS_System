import AuthFormCart from '../../../Shared/components/AuthFormCart/AuthFormCart';
import LoginForm from './LoginForm';
import './Login.scss';

const Login = () => {
  return (
    <div id='login_page'>
      <AuthFormCart 
        title_text='Login'
        content={
          <LoginForm />
        } 
      />
    </div>
  )
}

export default Login