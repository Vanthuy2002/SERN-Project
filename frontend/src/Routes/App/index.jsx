import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loading from '@/components/Loading';
import MainLayout from '@/Layout';
import EditUser from '@/Pages/Manager/Action/EditUser';

const Home = lazy(() => import('@/Pages/Home'));
const Login = lazy(() => import('@/Pages/Login'));
const Register = lazy(() => import('@/Pages/Register'));
const User = lazy(() => import('@/Pages/Manager/UI/User'));
const Roles = lazy(() => import('@/Pages/Manager/UI/Roles'));
const AssignRole = lazy(() => import('@/Pages/Manager/UI/Assign'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='manage/user' element={<User />} />
          <Route path='manage/user/:id' element={<EditUser />} />
          <Route path='manage/role' element={<Roles />} />
          <Route path='manage/action' element={<AssignRole />} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Suspense>
  );
}
