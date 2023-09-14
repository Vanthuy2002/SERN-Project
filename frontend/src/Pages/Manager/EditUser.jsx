import { ModalUser } from '@/components/Modal';
import { useEffect } from 'react';

export default function EditUser() {
  useEffect(() => {
    document.title = 'Edit user';
  }, []);
  return <ModalUser></ModalUser>;
}
