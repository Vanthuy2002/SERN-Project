/* eslint-disable react-hooks/exhaustive-deps */
import BasicNav from '@/components/Navs';
import useAppStore from '@/store';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function MainLayout() {
  const { authInfo, refreshAuth } = useAppStore((state) => state);
  const { pathname } = useLocation();

  useEffect(() => {
    refreshAuth();
  }, []);

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
