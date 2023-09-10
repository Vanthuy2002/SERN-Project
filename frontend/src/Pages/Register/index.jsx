import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { titlePages, validate } from '@/utils/contants';
import { registerServices } from '@/services/auth.services';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Form, Button, Spinner } from 'react-bootstrap';

const schema = yup.object({
  username: yup.string().required(validate.REQUIRED),
  email: yup.string().required(validate.REQUIRED).email(validate.EMAIL),
  password: yup.string().required(validate.REQUIRED).min(5, validate.MIN),
  confirm: yup.string().required(validate.REQUIRED).min(5, validate.MIN),
});

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { errors, isSubmitting } = formState;

  const handleRegister = async (values) => {
    try {
      if (values.password !== values.confirm) {
        throw new Error(validate.COMFIRM);
      }
      const { message, codeNum } = await registerServices(values);
      if (codeNum === 1) {
        toast.success(message);
        navigate('/login');
      } else {
        toast.info(message);
      }
    } catch (exection) {
      toast.error(exection.toString());
    }
  };

  useEffect(() => {
    document.title = titlePages.REGISTER;
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
              <Form onSubmit={handleSubmit(handleRegister)} autoComplete='off'>
                <Form.Group className='mb-3' controlId='username'>
                  <Form.Label className='fw-semibold'>Username</Form.Label>
                  <Form.Control
                    type='text'
                    {...register('username')}
                    className='p-3'
                    placeholder='@something...'
                  />
                  {errors && (
                    <p className='text-danger'>{errors?.username?.message}</p>
                  )}
                </Form.Group>

                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label className='fw-semibold'>Email</Form.Label>
                  <Form.Control
                    {...register('email')}
                    className='p-3'
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

                <Form.Group className='mb-3' controlId='repass'>
                  <Form.Label className='fw-semibold'>
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type='password'
                    {...register('confirm')}
                    className='p-3'
                    placeholder='Enter password again...'
                  />
                  {errors && (
                    <p className='text-danger'>{errors?.confirm?.message}</p>
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
                    'Create accounts'
                  )}
                </Button>
              </Form>

              <p className='text-center text-primary my-3'>
                Forgot password???
              </p>
              <hr className='border border-primary'></hr>

              <div className='text-center'>
                <Button
                  onClick={() => navigate('/login')}
                  variant='warning'
                  className='text-white'
                >
                  Already have accounts
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
