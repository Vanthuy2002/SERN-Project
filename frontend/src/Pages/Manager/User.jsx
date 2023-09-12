import { titlePages } from '@/utils/contants';
import { Fragment, useEffect } from 'react';

export default function User() {
  useEffect(() => {
    document.title = titlePages.MANAGER_USER;
  }, []);
  return (
    <Fragment>
      <h1>This is User</h1>
    </Fragment>
  );
}
