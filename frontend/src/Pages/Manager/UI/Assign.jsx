/* eslint-disable react-hooks/exhaustive-deps */
import Pagination from '@/components/Paginate';
import { getAllRoles } from '@/services/role.service';
import { getAllGroups } from '@/services/user.services';
import { Fragment, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const LIMIT = 3;

const AssignRole = () => {
  const [groupRole, setGroupRole] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [group, setGroup] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0,
  });

  const handleGetGroup = async () => {
    try {
      const { groups } = await getAllGroups();
      setGroupRole(groups);
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  const getRoles = async () => {
    const { totalPages, roles } = await getAllRoles(pagination.page, LIMIT);
    setListRole(roles);
    setPagination((prev) => ({ ...prev, totalPages }));
  };

  const handleChange = (e) => {
    setGroup(e.target.value);

    // call api
  };

  const handlePageChange = (e) =>
    setPagination((prev) => ({ ...prev, page: e.selected + 1 }));

  useEffect(() => {
    handleGetGroup();
    getRoles();
  }, [pagination.page]);

  return (
    <Fragment>
      <Container>
        <p className='h4 pt-3 fw-bold'>Assign Role</p>
        <Form className='mt-3'>
          <Row>
            <Col>
              <Form.Group className='mb-3' controlId='groupId'>
                <Form.Label>You are *</Form.Label>
                <Form.Select onChange={handleChange}>
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
          </Row>
        </Form>

        <Form>
          {listRole &&
            listRole.length > 0 &&
            listRole.map((role) => (
              <Form.Check
                key={role.id}
                type='switch'
                id={role.url}
                label={role.url}
                className='none-select'
              />
            ))}
        </Form>

        <Pagination
          pageCount={pagination.totalPages}
          onClick={handlePageChange}
        />
      </Container>
    </Fragment>
  );
};

export default AssignRole;
