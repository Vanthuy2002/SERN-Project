/* eslint-disable react-hooks/exhaustive-deps */
import Pagination from '@/components/Paginate';
import TableBase from '@/components/Table';
import { api } from '@/config';
import { titlePages } from '@/utils/contants';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

export default function User() {
  const [data, setData] = useState([]);
  const [allPages, setAllPages] = useState(0);
  const [page, setPage] = useState(1);

  const getAllUsers = async () => {
    const res = await api.get(`api/user?page=${page}`);
    const { users, totalPages } = res.data;
    setData(users);
    setAllPages(totalPages);
  };

  useEffect(() => {
    getAllUsers();
    document.title = titlePages.MANAGER_USER;
  }, [page]);

  const handlePageChange = (e) => setPage(e.selected + 1);
  return (
    <Container className='pt-2'>
      <Row>
        <Col>
          <p className='h4 fw-bold'>Manage Users</p>
        </Col>
        <Col>
          <div className='d-flex gap-2 justify-content-end'>
            <Button onClick={getAllUsers}>Refresh</Button>
            <Button variant='warning'>Create</Button>
          </div>
        </Col>
      </Row>

      <TableBase users={data} />
      <Pagination pageCount={allPages} onClick={handlePageChange} />
    </Container>
  );
}
