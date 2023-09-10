import MainLayout from '@/Layout';
import { titlePages } from '@/utils/contants';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = titlePages.HOME;
  }, []);
  return <MainLayout>Home Page</MainLayout>;
}
