import { formatTime } from '@/utils/contants';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ModalBase } from '../Modal';
import { deleteUser } from '@/services/user.services';
import { useLocation, useNavigate } from 'react-router-dom';

function TableBase({ users }) {
  const [isShow, setIsShow] = useState(false);
  const [idUser, setIdUser] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onToggle = (id) => {
    setIsShow(!isShow);
    setIdUser(id);
  };

  const changePath = async (id) => {
    navigate(`${pathname}/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const { message, codeNum } = await deleteUser(id);
      if (codeNum === 1) {
        toast.success(message);
      } else {
        toast.info(message);
      }
      setIsShow(false);
    } catch (e) {
      console.log('🚀 ~ handleDelete ~ err:', e);
    }
  };

  return (
    <Fragment>
      <Table striped bordered hover responsive className='my-4'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Group</th>
            <th>CreatedAt</th>
            <th>UpdateAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user?.id}>
                <td>{user?.id}</td>
                <td>{user?.username}</td>
                <td>{user?.email}</td>
                <td>{user?.Group?.name || 'No Group'}</td>
                <td>{formatTime(user?.createdAt)}</td>
                <td>{formatTime(user?.updatedAt)}</td>
                <td>
                  <div className='d-flex gap-2 align-items-center'>
                    <Button
                      onClick={() => changePath(user?.id)}
                      variant='warning'
                    >
                      Edit
                    </Button>
                    <Button onClick={() => onToggle(user.id)} variant='danger'>
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                <p className='h3 text-center'>Not found user</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <ModalBase
        id={idUser}
        isShow={isShow}
        onClose={onToggle}
        onDelete={handleDelete}
      />
    </Fragment>
  );
}

TableBase.propTypes = {
  users: PropTypes.array,
  onUpdateMode: PropTypes.func,
};

export default TableBase;
