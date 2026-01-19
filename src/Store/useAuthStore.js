import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null, // there is no user first
  setUser: (userData) => set({ user: userData, loading:false }),
  logout: () => set({ user: null }),
}));
