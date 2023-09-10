import { Col, Row, Spinner } from 'react-bootstrap';

export default function Loading() {
  return (
    <Row
      as={'section'}
      className='min-vh-100 w-100 justify-content-center align-items-center'
    >
      <Col className='text-center'>
        <Spinner animation='border' variant='primary' />
      </Col>
    </Row>
  );
}
