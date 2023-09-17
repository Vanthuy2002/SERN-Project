import { create } from 'zustand';

const useAppStore = create((set) => ({
  authInfo: {},
  setAuthInfo: (data) => set(() => ({ authInfo: data })),
}));

export default useAppStore;
