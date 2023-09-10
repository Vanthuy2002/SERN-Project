import { ToastContainer } from 'react-toastify';

export default function Toasty() {
  return (
    <ToastContainer
      position='top-right'
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme='light'
    />
  );
}
