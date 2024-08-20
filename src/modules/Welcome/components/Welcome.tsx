import { Link } from 'react-router-dom';
import IMAGES from '../../../assets/images/images';
import './Welcome.scss';

const Welcome = () => {
  return (
    <div id='welcome_page'>
      <img src={IMAGES.welcomeLogo} alt='pic' />

      <div>
        <Link className='start-btn' to='/login'>Start With Us</Link>
      </div>
    </div>
  );
}

export default Welcome;
