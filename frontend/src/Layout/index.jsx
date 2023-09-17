import BasicNav from '@/components/Navs';
import useAppStore from '@/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function MainLayout() {
  const { authInfo } = useAppStore((state) => state);
  const { pathname } = useLocation();
  return (
    <main className='App'>
      <BasicNav />
      <section className='spacing-to-nav'>
        {(authInfo && authInfo?.user) || pathname === '/' ? (
          <Outlet />
        ) : (
          <Navigate to='/login' />
        )}
      </section>
    </main>
  );
}

export default MainLayout;
