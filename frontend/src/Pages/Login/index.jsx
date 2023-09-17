import { titlePages, validate } from '@/utils/contants';
import { useEffect } from 'react';
import { Col, Container, Row, Form, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { loginServices } from '@/services/auth.services';
import useAppStore from '@/store';

const schema = yup.object({
  email: yup.string().required(validate.REQUIRED).email(validate.EMAIL),
  password: yup.string().required(validate.REQUIRED).min(5, validate.MIN),
});

export default function Login() {
  const navigate = useNavigate();
  const { setAuthInfo, authInfo } = useAppStore((state) => state);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors, isSubmitting } = formState;

  const handleLogin = async (values) => {
    try {
      const { codeNum, message, user, roles, accessToken } =
        await loginServices(values);

      const data = { user, roles, accessToken };
      if (codeNum === 1) {
        toast.success(message);
        setAuthInfo(data);
        navigate('/');
      } else {
        toast.info(message);
      }
    } catch (exection) {
      toast.error(exection.toString());
    }
  };

  useEffect(() => {
    if (authInfo && authInfo?.user) {
      navigate('/');
    }
  }, [navigate, authInfo]);

  useEffect(() => {
    document.title = titlePages.LOGIN;
  }, []);
  return (
    <div className='bg-info-subtle'>
      <Container>
        <Row className='min-vh-100 align-items-md-center align-items-start'>
          <Col className='d-none d-md-block' md={6}>
            <Link to='/'>
              <p className='fw-bold h1 mb-2 text-start text-primary'>
                React App
              </p>
            </Link>
            <p className='text-start fw-semibold'>
              Login with get full access our power, do anything with your
              imagination
            </p>
          </Col>
          <Col md={6}>
            <Link to='/'>
              <p className='h1 my-5 d-md-none d-block fw-bold text-center text-primary'>
                React App
              </p>
            </Link>
            <div className='p-3 rounded shadow bg-white'>
              <Form autoComplete='off' onSubmit={handleSubmit(handleLogin)}>
                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label className='fw-semibold'>Email</Form.Label>
                  <Form.Control
                    className='p-3'
                    {...register('email')}
                    placeholder='name@example.com'
                  />
                  {errors && (
                    <p className='text-danger'>{errors?.email?.message}</p>
                  )}
                </Form.Group>

                <Form.Group className='mb-3' controlId='password'>
                  <Form.Label className='fw-semibold'>Password</Form.Label>
                  <Form.Control
                    type='password'
                    {...register('password')}
                    className='p-3'
                    placeholder='Your password...'
                  />
                  {errors && (
                    <p className='text-danger'>{errors?.password?.message}</p>
                  )}
                </Form.Group>

                <Button
                  style={{ padding: '12px 0' }}
                  className='w-100 fw-bolder'
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      variant='light'
                    />
                  ) : (
                    'Login with accounts'
                  )}
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
