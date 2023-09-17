import { Fragment } from 'react';
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

export default function BasicNav() {
  const navigate = useNavigate();
  const changeURL = (path) => navigate(path);

  const { authInfo } = useAppStore((state) => state);

  return (
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
  );
}
