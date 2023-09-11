import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

export default function User() {
  return (
    <Fragment>
      <Outlet></Outlet>
    </Fragment>
  );
}
