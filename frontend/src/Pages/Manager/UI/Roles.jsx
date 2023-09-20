/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { cloneDeep, createUUID, titlePages } from '@/utils/contants';
import { toast } from 'react-toastify';
import { createRoles, getAllRoles } from '@/services/role.service';
import { TableRole } from '@/components/Table';
import Pagination from '@/components/Paginate';
import Heading from '@/components/Heading';

const initVal = {
  url: '',
  desc: '',
  isValid: false,
};

const LIMIT = 2;

const Roles = () => {
  const uuid = createUUID();
  const [list, setList] = useState({
    child: initVal,
  });
  const [isLoad, setIsLoad] = useState(false);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 0,
  });

  const getRoles = async () => {
    const { totalPages, roles } = await getAllRoles(pagination.page, LIMIT);
    setData(roles);
    setPagination((prev) => ({ ...prev, totalPages }));
  };

  const addNewRole = () => {
    let listClone = cloneDeep(list);
    listClone[uuid] = initVal;
    setList(listClone);
  };

  const removeRole = (key) => {
    let listClone = cloneDeep(list);
    delete listClone[key];
    setList(listClone);
  };

  const handleChange = (name, e, key) => {
    let listClone = cloneDeep(list);
    listClone[key][name] = e.target.value;
    if (name === 'url' && e.target.value) {
      listClone[key]['isValid'] = true;
    }
    setList(listClone);
  };

  const validate = () => {
    const findInvalid = Object.entries(list).find(([, value]) => {
      return (value && !value.url) || !value.desc;
    });
    return findInvalid;
  };

  const buildData = () => {
    const listClone = cloneDeep(list);
    const results = Object.entries(listClone).map(([, value]) => {
      return {
        url: value.url,
        desc: value.desc,
      };
    });
    return results;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoad(true);
    const invalid = validate();
    const data = buildData();
    if (!invalid) {
      const { message, codeNum } = await createRoles(data);
      codeNum === 1 ? toast.success(message) : toast.info(message);
      setIsLoad(false);
      await getRoles();
    } else {
      toast.info('This field is required');
      const listClone = cloneDeep(list);
      const key = invalid[0];
      listClone[key]['isValid'] = true;
      setList(listClone);
      setIsLoad(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, [pagination.page]);

  const handlePageChange = (e) =>
    setPagination((prev) => ({ ...prev, page: e.selected + 1 }));

  useEffect(() => {
    document.title = titlePages.MANAGER_ROLE;
  }, []);

  return (
    <Container>
      <h4 className='fw-bold py-2'>Add new role</h4>
      <Form autoComplete='off' onSubmit={handleSubmit}>
        {Object.entries(list).map(([key, value], index) => (
          <Row data-index={key} key={key} className='align-items-center'>
            <Col md={5}>
              <Form.Group className='mb-3' controlId='url'>
                <Form.Label>URL</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange('url', e, key)}
                  value={value.url}
                  type='text'
                  placeholder={`Eg : /user/read, ...`}
                  className={!value.isValid && 'is-invalid'}
                />
              </Form.Group>
            </Col>

            <Col md={5}>
              <Form.Group className='mb-3' controlId='desc'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={(e) => handleChange('desc', e, key)}
                  value={value.desc}
                  type='text'
                  placeholder='Some description...'
                  className={!value.isValid && 'is-invalid'}
                />
              </Form.Group>
            </Col>

            <Col md={2} className='mt-3 flex-grow-1 d-flex gap-2'>
              <Button onClick={addNewRole}>
                <PlusCircleIcon className='icon' />
              </Button>

              {index !== 0 && (
                <Button variant='danger' onClick={() => removeRole(key)}>
                  <TrashIcon className='icon' />
                </Button>
              )}
            </Col>
          </Row>
        ))}

        <Button
          disabled={isLoad}
          type='submit'
          className='d-flex gap-2 align-items-center'
        >
          <span>{isLoad ? 'Loading...' : 'Save'}</span>
          <CheckCircleIcon className='icon text-light' />
        </Button>
      </Form>

      <Heading title='Manage Role' className='py-3' onRefresh={getRoles} />
      <TableRole data={data} />
      <Pagination
        pageCount={pagination.totalPages}
        onClick={handlePageChange}
      />
    </Container>
  );
};

export default Roles;
