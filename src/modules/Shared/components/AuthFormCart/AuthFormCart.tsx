import { ReactNode } from "react";
import IMAGES from '../../../../assets/images/images';
import './AuthFormCart.scss';

interface Item{
    title_text?: string
    content?: ReactNode,
}

const AuthFormCart = ({title_text,content}:Item) => {
  return (
    <div id='auth_cart'>
        <img src={ IMAGES.formLogo } alt='pic' />

        <div className="cart-bx">
            <div className="title">
                <p>welcome to PMS</p>
                <h3>{ title_text }</h3>
            </div>

            <div>{ content }</div>
        </div>
    </div>
  )
}

export default AuthFormCart