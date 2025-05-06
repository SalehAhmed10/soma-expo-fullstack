import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: any;
  login: (user: any, token: string) => void;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: (user, token) => set({ user, token, loading: false }),
      logout: async () => {
        console.log('Logging out. Current user:', useAuthStore.getState().user);
        try {
          await AsyncStorage.removeItem('authToken'); // Remove the token directly
          await AsyncStorage.removeItem('auth-storage'); // Remove the persisted store
          set({ user: null, token: null, loading: false, error: null }); // Clear state
        } catch (e) {
          console.error("Error during logout:", e);
          set({ error: e }); // Set an error if logout fails
        }
      },
      setLoading: (loading) => set({ loading }),
    }),
    {
      name: 'auth-storage',
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
      },
    }
  )
);

export default useAuthStore;