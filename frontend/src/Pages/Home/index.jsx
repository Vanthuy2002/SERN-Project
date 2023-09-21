import { titlePages } from '@/utils/contants';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const explore = () => navigate('/register');
  useEffect(() => {
    document.title = titlePages.HOME;
  }, []);

  return (
    <Container fluid className='bg'>
      <Row className='align-items-center justify-content-center h-100'>
        <Col className='text-center'>
          <h1 className='fw-bold'>Wellcome to my React App</h1>
          <p className='fs-5 fw-semibold text-light'>
            Register an accounts or login to get full access
          </p>

          <Button onClick={explore} variant='secondary' size='lg'>
            Explore now
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
