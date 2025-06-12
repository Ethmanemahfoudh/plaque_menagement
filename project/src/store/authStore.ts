import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '../types';

// Default admin user
const defaultAdmin: User = {
  id: '1',
  email: 'admin@transport.cd',
  password: 'admin123',
  role: 'admin',
  nom: 'ADMIN',
  postNom: 'SYSTEM',
  prenom: 'Administrator',
  createdAt: new Date().toISOString(),
};

// Default regular user
const defaultUser: User = {
  id: '2',
  email: 'user@transport.cd',
  password: 'user123',
  role: 'user',
  nom: 'UTILISATEUR',
  postNom: 'TEST',
  prenom: 'Standard',
  createdAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Simulate API call
        const users = [defaultAdmin, defaultUser];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      register: async (userData: Omit<User, 'id' | 'createdAt'>) => {
        // In a real app, this would call an API
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);