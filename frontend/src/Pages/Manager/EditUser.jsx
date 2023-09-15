/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { validate } from '@/utils/contants';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllGroups, getUser, updateUser } from '@/services/user.services';
import { Button, Col, Container, Row, Spinner, Form } from 'react-bootstrap';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().required(validate.REQUIRED),
  phone: yup.string().required(validate.REQUIRED),
  addr: yup.string().required(validate.REQUIRED),
});

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [groupRole, setGroupRole] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const { pathname } = useLocation();
  const previousPath = pathname.split('/').slice(0, 3).join('/');

  const { register, formState, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors, isSubmitting } = formState;

  const handleGetGroup = async () => {
    try {
      const { groups } = await getAllGroups();
      setGroupRole(groups);
    } catch (exection) {
      toast.error(exection.toString());
    }
  };

  const handleGetUser = async () => {
    try {
      const { user } = await getUser(id);
      setUserEmail(user?.email);
      reset({ ...user });
    } catch (exection) {
      toast.error(exection.toString());
    }
  };

  const handleEditUser = async (values) => {
    try {
      const { message, codeNum } = await updateUser(id, values);
      if (codeNum === 1) {
        toast.success(message);
        navigate(previousPath);
      } else {
        toast.error(message);
      }
    } catch (e) {
      if (e.response) {
        toast.error(e?.response?.data?.message);
      }
    }
  };

  const onBackManage = () => navigate(previousPath);

  useEffect(() => {
    handleGetGroup();
    handleGetUser();
  }, []);

  useEffect(() => {
    document.title = `Edit user ${userEmail}`;
  }, [userEmail]);

  return (
    <Container>
      <p className='h4 py-3 fw-bold fs-4'>Update Users</p>
      <Form autoComplete='off' onSubmit={handleSubmit(handleEditUser)}>
        <Row>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Label>Email address *</Form.Label>
              <Form.Control type='text' placeholder={userEmail} disabled />
              {errors && (
                <p className='text-danger'>{errors?.email?.message}</p>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className='mb-3' controlId='password'>
              <Form.Label>Password *</Form.Label>
              <Form.Control type='passsword' placeholder='No update' disabled />
              {errors && (
                <p className='text-danger'>{errors?.password?.message}</p>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='username'>
              <Form.Label>Username *</Form.Label>
              <Form.Control
                {...register('username')}
                type='text'
                placeholder='@example...'
              />
              {errors && (
                <p className='text-danger'>{errors?.username?.message}</p>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className='mb-3' controlId='phone'>
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                {...register('phone')}
                type='text'
                placeholder='123456...'
              />
              {errors && (
                <p className='text-danger'>{errors?.phone?.message}</p>
              )}
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className='mb-3' controlId='sex'>
              <Form.Label>Sex </Form.Label>
              <Form.Select
                {...register('sex')}
                aria-label='Default select example'
              >
                <option>Choose gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className='mb-3' controlId='groupId'>
              <Form.Label>You are *</Form.Label>
              <Form.Select {...register('groupId')}>
                <option>Choose one</option>
                {groupRole &&
                  groupRole.length > 0 &&
                  groupRole.map((group) => (
                    <option key={group.id} value={group?.id}>
                      {group?.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='addr'>
              <Form.Label>Addr </Form.Label>
              <Form.Control
                type='text'
                {...register('addr')}
                placeholder='Thanh Tri, HN...'
              />
              {errors && <p className='text-danger'>{errors?.addr?.message}</p>}
            </Form.Group>
          </Col>
        </Row>

        <div className='d-flex align-items-center gap-2'>
          <Button onClick={onBackManage} variant='secondary'>
            Cancel
          </Button>
          <Button disabled={isSubmitting} type='submit' variant='primary'>
            {isSubmitting ? (
              <Spinner as='span' animation='border' size='sm' variant='light' />
            ) : (
              'Update Changes'
            )}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
