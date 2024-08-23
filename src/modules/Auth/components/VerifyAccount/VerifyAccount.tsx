import AuthFormCart from '../../../Shared/components/AuthFormCart/AuthFormCart';
import './VerifyAccount.scss';
import VerifyAccountForm from './VerifyAccountForm';
const VerifyAccount = () => {

  return (
   <>
   <div id="login_page">

   <AuthFormCart
   title_text='verify account'
   content ={
     <VerifyAccountForm/>
    }
    />
    </div>
   
   
   </>

  )
}

export default VerifyAccount