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

const isLogin = false;

export default function BasicNav() {
  const navigate = useNavigate();
  const changeURL = (path) => navigate(path);
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
          React App
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='w-100 align-items-center'>
            <NavLink to='/' className='nav-link'>
              Home
            </NavLink>
            <NavDropdown
              title='Actions'
              id='basic-nav-dropdown'
              className='mb-2 mb-lg-0'
            >
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <div className='d-flex gap-2 flex-grow-1 justify-content-end align-items-center'>
              {isLogin ? (
                <Fragment>
                  <Image src='/Jisoo.jpg' className='avatar' roundedCircle />
                  <span className='text-primary-emphasis'>Thuy Nguyen</span>
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
