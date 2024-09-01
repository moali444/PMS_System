import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import IMAGES from '../../../assets/images/images';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <div id='home_page'>
      <div className="banner">
        <h3>Welcome <span>Upskilling</span></h3>
        <p>You can add project and assign tasks to your team</p>
      </div>

      <Row>
        <Col md={6}>
          <div className='data-cart'>
            <div className="title">
              <h3>Tasks</h3>
              <p>Lorem ipsum dolor sit amet,consecteture</p>
            </div>

            <Row>
              <Col md={4}>
                <div className="static-bx color-1">
                  <span className='icon'>
                    <img src={IMAGES.static1} alt='pic' />
                  </span>
                  <p>Progress</p>
                  <h3>$ 7328.32</h3>
                </div>
              </Col>

              <Col md={4}>
                <div className="static-bx color-2">
                  <span className='icon'>
                    <img src={IMAGES.static2} alt='pic' />
                  </span>
                  <p>Tasks Number</p>
                  <h3>1293</h3>
                </div>
              </Col>

              <Col md={4}>
                <div className="static-bx color-3">
                  <span className='icon'>
                    <img src={IMAGES.static3} alt='pic' />
                  </span>
                  <p>Projects Number</p>
                  <h3>32</h3>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col md={6}>
          <div className='data-cart'>
            <div className="title">
              <h3>Users</h3>
              <p>Lorem ipsum dolor sit amet,consecteture</p>
            </div>

            <Row>
              <Col md={4}>
                <div className="static-bx color-1">
                  <span className='icon'>
                    <img src={IMAGES.static1} alt='pic' />
                  </span>
                  <p>active</p>
                  <h3>$ 7328.32</h3>
                </div>
              </Col>

              <Col md={4}>
                <div className="static-bx color-2">
                  <span className='icon'>
                    <img src={IMAGES.static2} alt='pic' />
                  </span>
                  <p>inactive</p>
                  <h3>1293</h3>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

      </Row>
    </div>
  )
}

export default Dashboard