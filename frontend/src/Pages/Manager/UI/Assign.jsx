/* eslint-disable react-hooks/exhaustive-deps */
import Pagination from '@/components/Paginate';
import {
  assignRole,
  getAllRoles,
  getRoleByGroup,
} from '@/services/role.service';
import { getAllGroups } from '@/services/user.services';
import { cloneDeep } from '@/utils/contants';
import { Fragment, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

const LIMIT = 10;

const AssignRole = () => {
  const [groupRole, setGroupRole] = useState([]);
  const [listRole, setListRole] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [group, setGroup] = useState(0);

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
    setAllRoles(roles);
    setPagination((prev) => ({ ...prev, totalPages }));
  };

  const handleChange = async (e) => {
    setGroup(e.target.value);
    const { message, codeNum, group } = await getRoleByGroup(e.target.value);
    setListRole(group?.Roles);
    if (group.Roles.length === 0) {
      toast.info('No roles was found');
    } else {
      codeNum === 1 ? toast.success(message) : toast.info(message);
    }
    const roleAssign = buildDataAssign(allRoles, group.Roles);
    setListRole(roleAssign);
  };

  const onChangeCheck = (e) => {
    let _listRole = cloneDeep(listRole);
    let index = _listRole.findIndex((item) => item.id == e.target.value);

    if (index > -1) _listRole[index].isAssign = !_listRole[index].isAssign;
    setListRole(_listRole);
  };

  const buildDataAssign = (all, list) => {
    let newArrRole = [];
    if (!Array.isArray(all) || !Array.isArray(list)) return null;
    all.map((role) => {
      const obj = { ...role, isAssign: false };
      obj.isAssign = list.some((item) => item.url === obj.url);
      newArrRole.push(obj);
    });
    return newArrRole;
  };

  const buildData = () => {
    let result = [];
    let _listRole = cloneDeep(listRole);
    _listRole.filter((role) => {
      if (role.isAssign === true) {
        const { id } = role;
        result.push({ groupId: +group, roleId: id });
      }
    });
    const body = {
      groupId: +group,
      data: result,
    };
    return body;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const body = buildData();
      const { message, codeNum } = await assignRole(body);
      codeNum === 1 ? toast.success(message) : toast.info(message);
    } catch (err) {
      toast.error(err.data.message);
    }
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

        <Form onSubmit={handleSave}>
          {group > 0 &&
            listRole &&
            listRole.length > 0 &&
            listRole.map((role) => (
              <Form.Check
                key={role.id}
                type='switch'
                id={role.url}
                label={role.url}
                value={role.id}
                onChange={onChangeCheck}
                checked={role?.isAssign}
                className='none-select'
              />
            ))}

          <Button type='submit' className='mt-3' variant='outline-primary'>
            Save changes
          </Button>
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
