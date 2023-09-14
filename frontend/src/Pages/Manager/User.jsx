/* eslint-disable react-hooks/exhaustive-deps */
import { ModalUser } from '@/components/Modal';
import Pagination from '@/components/Paginate';
import TableBase from '@/components/Table';
import { getAllUsers } from '@/services/user.services';
import { titlePages } from '@/utils/contants';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

export default function User() {
  const [data, setData] = useState([]);
  const [allPages, setAllPages] = useState(0);
  const [page, setPage] = useState(1);
  const [isShow, setIsShow] = useState(false);

  const handleUsers = async () => {
    const { totalPages, users } = await getAllUsers(page);
    setAllPages(totalPages);
    setData(users);
  };

  useEffect(() => {
    handleUsers();
    document.title = titlePages.MANAGER_USER;
  }, [page]);

  const handlePageChange = (e) => setPage(e.selected + 1);

  const onToggle = () => setIsShow(!isShow);

  return (
    <Container className='pt-2'>
      <Row>
        <Col>
          <p className='h4 fw-bold'>Manage Users</p>
        </Col>
        <Col>
          <div className='d-flex gap-2 justify-content-end'>
            <Button onClick={handleUsers}>Refresh</Button>
            <Button onClick={onToggle} variant='warning'>
              Create
            </Button>
          </div>
        </Col>
      </Row>

      <TableBase users={data} />
      <Pagination pageCount={allPages} onClick={handlePageChange} />
      <ModalUser isShow={isShow} onClose={onToggle} />
    </Container>
  );
}
