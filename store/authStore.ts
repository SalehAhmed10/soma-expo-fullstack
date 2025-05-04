import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  login: (user: any, token: string) => void;
  logout: () => Promise<void>; // Changed to Promise<void>
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      login: (user, token) => set({ user, token, loading: false }),
      logout: async () => { // Made async
        console.log('Logging out. Current user:', useAuthStore.getState().user);
        await AsyncStorage.removeItem('auth-storage'); // Await removal
        set({ user: null, token: null, loading: false });
      },
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'auth-storage', // unique name
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      }, // Custom storage adapter
    }
  )
);

export default useAuthStore;