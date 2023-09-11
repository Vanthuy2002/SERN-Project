import { create } from 'zustand';

const useAppStore = create((set) => ({
  user: {},
  accessToken: '',
  setUser: (data) => set(() => ({ user: data })),
}));

export default useAppStore;
