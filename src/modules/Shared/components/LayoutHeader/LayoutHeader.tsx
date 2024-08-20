import IMAGES from '../../../../assets/images/images';
import './LayoutHeader.scss';

const LayoutHeader = () => {
  return (
    <div id='layout_header'>
      <img src={ IMAGES.headerLogo } alt='pic' />
    </div>
  );
}

export default LayoutHeader;
