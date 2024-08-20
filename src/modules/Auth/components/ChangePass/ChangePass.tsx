import AuthFormCart from '../../../Shared/components/AuthFormCart/AuthFormCart';
import ChangePassForm from './ChangePassForm';
import './ChangePass.scss';

const ChangePass = () => {
  return (
    <div id='change_pass_page'>
      <AuthFormCart 
        title_text='Change Password'
        content={
          <ChangePassForm />
        } 
      />
    </div>
  )
}

export default ChangePass