import { logoutServices, refreshTokenServices } from '@/services/auth.services';
import { create } from 'zustand';

const useAppStore = create((set) => ({
  authInfo: null,
  setAuthInfo: (data) => set(() => ({ authInfo: data })),
  refreshAuth: async () => {
    const dataInfo = await refreshTokenServices();
    dataInfo && set({ authInfo: dataInfo });
  },
  logoutAuth: async () => {
    const { message, codeNum } = await logoutServices();
    localStorage.removeItem('token');
    set({ authInfo: null });
    return { message, codeNum };
  },
}));

export default useAppStore;
