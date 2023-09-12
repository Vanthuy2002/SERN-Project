import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@/components/Loading';
import MainLayout from '@/Layout';

const Home = lazy(() => import('@/Pages/Home'));
const Login = lazy(() => import('@/Pages/Login'));
const Register = lazy(() => import('@/Pages/Register'));
const User = lazy(() => import('@/Pages/Manager/User'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='manage/user' element={<User />} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Suspense>
  );
}
