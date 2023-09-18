import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { cloneDeep, createUUID, titlePages } from '@/utils/contants';

const initVal = {
  url: '',
  desc: '',
};

const Roles = () => {
  const uuid = createUUID();
  const [list, setList] = useState({
    child: initVal,
  });

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
    setList(listClone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(list);
  };

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
                  placeholder={`Role follow url...`}
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

        <Button type='submit' className='d-flex gap-2 align-items-center'>
          <span>Save</span>
          <CheckCircleIcon className='icon text-light' />
        </Button>
      </Form>
    </Container>
  );
};

export default Roles;
