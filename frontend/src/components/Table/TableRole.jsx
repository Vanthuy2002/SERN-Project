import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';
import { ModalBase } from '../Modal';
import { formatTime } from '@/utils/contants';
import { toast } from 'react-toastify';
import { deleteService } from '@/services/role.service';

const TableRole = ({ data }) => {
  const [isShow, setIsShow] = useState(false);
  const [id, setId] = useState(0);

  const onToggle = (roleId) => {
    setIsShow(!isShow);
    setId(roleId);
  };

  const deleteRoles = async (id) => {
    try {
      const { message, codeNum } = await deleteService(id);
      codeNum === 1 ? toast.success(message) : toast.info(message);
      onToggle();
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <Fragment>
      <Table striped bordered hover responsive className='my-4'>
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Desc</th>
            <th>CreatedAt</th>
            <th>UpdateAt</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((role) => (
              <tr key={role?.id}>
                <td>{role?.id}</td>
                <td>{role?.url}</td>
                <td>{role?.desc}</td>
                <td>{formatTime(role?.createdAt)}</td>
                <td>{formatTime(role?.updatedAt)}</td>
                <td>
                  <div className='d-flex gap-2 align-roles-center'>
                    <Button variant='warning'>Edit</Button>
                    <Button onClick={() => onToggle(role.id)} variant='danger'>
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>
                <p className='h3 text-center'>Not found roles</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <ModalBase
        isShow={isShow}
        onClose={onToggle}
        id={id}
        onHandle={deleteRoles}
      />
    </Fragment>
  );
};

TableRole.propTypes = {
  data: PropTypes.array,
};

export default TableRole;
