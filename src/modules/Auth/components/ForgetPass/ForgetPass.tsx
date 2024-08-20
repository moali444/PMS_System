import AuthFormCart from '../../../Shared/components/AuthFormCart/AuthFormCart';
import ForgetPassForm from './ForgetPassForm';
import './ForgetPass.scss';

const ForgetPass = () => {
  return (
    <div id='forget_pass_page'>
      <AuthFormCart 
        title_text='Forget Password'
        content={
          <ForgetPassForm />
        } 
      />
    </div>
  )
}

export default ForgetPass