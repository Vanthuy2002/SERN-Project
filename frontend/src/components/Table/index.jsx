import { formatTime } from '@/utils/contants';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';

function TableBase({ users }) {
  return (
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
              <td>{user?.Group.name}</td>
              <td>{formatTime(user?.createdAt)}</td>
              <td>{formatTime(user?.updatedAt)}</td>
              <td>
                <div className='d-flex gap-2 align-items-center'>
                  <Button variant='warning'>Edit</Button>
                  <Button variant='danger'>Remove</Button>
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
  );
}

TableBase.propTypes = {
  users: PropTypes.array,
};

export default TableBase;
