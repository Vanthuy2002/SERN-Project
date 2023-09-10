import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@/components/Loading';

const Home = lazy(() => import('@/Pages/Home'));
const Login = lazy(() => import('@/Pages/Login'));
const Register = lazy(() => import('@/Pages/Register'));

export default function Routing() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Suspense>
  );
}
