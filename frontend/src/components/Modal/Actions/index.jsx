import { getAllGroups } from '@/services/user.services';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Modal, Form, Row, Col, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { validate } from '@/utils/contants';

const schema = yup.object({
  email: yup.string().required(validate.REQUIRED).email(validate.EMAIL),
  password: yup.string().required(validate.REQUIRED).min(5, validate.MIN),
  username: yup.string().required(validate.REQUIRED),
  phone: yup.string().required(validate.REQUIRED),
  addr: yup.string().required(validate.REQUIRED),
});

function ModalUser({ isShow, onClose, updateMode }) {
  const [groupRole, setGroupRole] = useState([]);
  const { formState, register, handleSubmit } = useForm({
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

  const handleCreateUser = async (values) => {
    console.log('🚀 ~ handleCreateUser ~ values:', values);
  };

  useEffect(() => {
    handleGetGroup();
  }, []);

  return (
    <Modal size='lg' show={isShow} onHide={onClose} backdrop='static' centered>
      <Modal.Header closeButton>
        <Modal.Title>{updateMode ? 'Update User' : 'Create User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete='off'>
          <Row>
            <Col md={6}>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email address *</Form.Label>
                <Form.Control
                  type='text'
                  {...register('email')}
                  placeholder='name@example.com'
                  autoFocus
                />
                {errors && (
                  <p className='text-danger'>{errors?.email?.message}</p>
                )}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  type='passsword'
                  {...register('password')}
                  placeholder={updateMode ? 'Read only' : 'Type password'}
                  disabled={updateMode}
                />
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
              <Form.Group className='mb-3' controlId='role'>
                <Form.Label>Role *</Form.Label>
                <Form.Select
                  {...register('role')}
                  aria-label='Default select example'
                >
                  <option>Choose role</option>
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
                {errors && (
                  <p className='text-danger'>{errors?.addr?.message}</p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
        <Button
          onClick={handleSubmit(handleCreateUser)}
          disabled={isSubmitting}
          variant='primary'
        >
          {isSubmitting ? (
            <Spinner as='span' animation='border' size='sm' variant='light' />
          ) : (
            'Save Changes'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
ModalUser.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func,
  updateMode: PropTypes.bool,
};

export default ModalUser;
