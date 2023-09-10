import { titlePages } from '@/utils/contants';
import { useEffect } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = titlePages.LOGIN;
  }, []);
  return (
    <div className='bg-info-subtle'>
      <Container>
        <Row className='min-vh-100 align-items-md-center align-items-start'>
          <Col className='d-none d-md-block' md={6}>
            <p className='h1 fw-bold text-start text-primary'>React App</p>
            <p className='text-start fw-semibold'>
              Login with get full access our power, do anything with your
              imagination
            </p>
          </Col>
          <Col md={6}>
            <p className='h1 my-5 d-md-none d-block fw-bold text-center text-primary'>
              React App
            </p>
            <div className='p-3 rounded shadow bg-white'>
              <Form autoComplete='off'>
                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label className='fw-semibold'>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    className='p-3'
                    placeholder='name@example.com'
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                  <Form.Label className='fw-semibold'>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    className='p-3'
                    placeholder='Your password...'
                  />
                </Form.Group>

                <Button
                  style={{ padding: '12px 0' }}
                  className='w-100 fw-bolder'
                  type='submit'
                >
                  Login with your accounts
                </Button>
              </Form>

              <p className='text-center text-primary my-3'>
                Forgot password???
              </p>
              <hr className='border border-primary'></hr>

              <div className='text-center'>
                <Button
                  onClick={() => navigate('/register')}
                  variant='warning'
                  className='text-white'
                >
                  Create an accounts
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
