import { titlePages } from '@/utils/contants';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    document.title = titlePages.HOME;
  }, []);
  return <Outlet></Outlet>;
}
