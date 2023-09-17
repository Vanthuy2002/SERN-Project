import { refreshTokenServices } from '@/services/auth.services';
import { create } from 'zustand';

const useAppStore = create((set) => ({
  authInfo: {},
  setAuthInfo: (data) => set(() => ({ authInfo: data })),
  refreshAuth: async () => {
    const dataInfo = await refreshTokenServices();
    dataInfo && set({ authInfo: dataInfo });
  },
}));

export default useAppStore;
