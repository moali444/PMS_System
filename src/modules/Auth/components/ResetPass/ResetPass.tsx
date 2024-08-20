import AuthFormCart from '../../../Shared/components/AuthFormCart/AuthFormCart';
import ResetPassForm from './ResetPassForm';
import './ResetPass.scss';

const ResetPass = () => {
  return (
    <div id='reset_page'>
      <AuthFormCart 
        title_text='Reset Password'
        content={
          <ResetPassForm />
        } 
      />
    </div>
  )
}

export default ResetPass