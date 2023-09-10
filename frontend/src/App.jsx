import { Fragment } from 'react';
import Routing from '@/Routes';
import Toasty from '@/components/Toasty';

export default function App() {
  return (
    <Fragment>
      <Routing />
      <Toasty />
    </Fragment>
  );
}
