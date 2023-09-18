import { Fragment, useState } from 'react';
import {
  Button,
  Container,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { menuOptions } from '@/utils/contants';
import useAppStore from '@/store';
import { toast } from 'react-toastify';
import { ModalBase } from '../Modal';

export default function BasicNav() {
  const navigate = useNavigate();
  const changeURL = (path) => navigate(path);
  const [show, setShow] = useState(false);

  const { authInfo, logoutAuth } = useAppStore((state) => state);

  const handleLogout = async () => {
    const { message, codeNum } = await logoutAuth();
    codeNum === 1 ? toast.success(message) : toast.info(message);
    navigate('/login');
  };

  const onToggle = () => setShow(!show);

  return (
    <Fragment>
      <Navbar expand='lg' className='bg-body-tertiary' fixed='top'>
        <Container>
          <Link to='/' className='navbar-brand'>
            <img
              alt=''
              src='/vite.svg'
              width='30'
              height='30'
              className='d-inline-block align-top'
            />{' '}
            <span className='text-primary fw-bold'>React App</span>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='w-100 align-items-lg-center '>
              <NavLink to='/' className='nav-link'>
                Home
              </NavLink>
              <NavDropdown
                title='Manager'
                id='basic-nav-dropdown'
                className='mb-2 mb-lg-0'
              >
                {menuOptions.map((menu) => (
                  <Link
                    key={menu.id}
                    to={`/${menu.to}`}
                    className='dropdown-item'
                  >
                    {menu.name}
                  </Link>
                ))}
                <NavDropdown.Divider />
                <Button
                  onClick={onToggle}
                  variant='light'
                  className='dropdown-item'
                >
                  Logout
                </Button>
              </NavDropdown>

              <div className='d-flex gap-2 flex-grow-1 justify-content-end align-items-center'>
                {authInfo && authInfo.user ? (
                  <Fragment>
                    <Image
                      src='/Jisoo.jpg'
                      className='avatar'
                      roundedCircle
                      alt={authInfo?.user?.username}
                    />
                    <span className='text-primary-emphasis'>
                      {authInfo?.user.username}
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Button
                      onClick={() => changeURL('/login')}
                      variant='outline-secondary'
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => changeURL('/register')}
                      variant='primary'
                    >
                      Get Started
                    </Button>
                  </Fragment>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalBase
        isLogout
        isShow={show}
        onClose={onToggle}
        onHandle={handleLogout}
      />
    </Fragment>
  );
}
