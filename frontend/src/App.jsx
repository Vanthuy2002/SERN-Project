import { Fragment } from 'react';
import { AppRoutes } from '@/Routes';
import Toasty from '@/components/Toasty';

export default function App() {
  return (
    <Fragment>
      <AppRoutes />
      <Toasty />
    </Fragment>
  );
}
