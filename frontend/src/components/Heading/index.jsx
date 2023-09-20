import PropTypes from 'prop-types';
import { Button, Col, Row } from 'react-bootstrap';

const Heading = ({ title, onRefresh, className = '' }) => {
  return (
    <Row className={`${className} align-items-center`}>
      <Col>
        <p className='h4 fw-semibold'>{title}</p>
      </Col>
      <Col className='text-end'>
        <Button onClick={onRefresh}>Refresh</Button>
      </Col>
    </Row>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  onRefresh: PropTypes.func,
  className: PropTypes.string,
};

export default Heading;
