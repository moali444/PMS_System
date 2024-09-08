import './NotFound.scss';
import IMAGES from '../../../../assets/images/images';
import { useNavigate } from 'react-router-dom';
 
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section id='login_page' className=" notFound py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
    <div className="container  ">
      <div id='auth-img-notfound'>
      <img src={IMAGES.formLogo} alt="" />

      </div>
      <div className="row">
        <div className="col-12">
          <div className="text-center">
            <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
              <span className="display-1 fw-bold">4</span>
              <i className="bi bi-exclamation-circle-fill text-danger display-4"></i>
              <span className="display-1 fw-bold bsb-flip-h">4</span>
            </h2>
            <h3 className="h2 mb-2">Oops! You're lost.</h3>
            <p className="mb-5">The page you are looking for was not found.</p>
         <button 
         onClick={() =>{ navigate("/")}}>

        

          Back to Home
         </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default NotFound