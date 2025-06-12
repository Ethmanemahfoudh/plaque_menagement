import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, User, Plaque } from '../types';
import QRCode from 'qrcode';

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: [],
      plaques: [],
      darkMode: false,
      
      addUser: (userData: Omit<User, 'id' | 'createdAt'>) => {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        
        set(state => ({
          users: [...state.users, newUser]
        }));
      },
      
      updateUser: (id: string, userData: Partial<User>) => {
        set(state => ({
          users: state.users.map(user => 
            user.id === id ? { ...user, ...userData } : user
          )
        }));
      },
      
      deleteUser: (id: string) => {
        set(state => ({
          users: state.users.filter(user => user.id !== id)
        }));
      },
      
      addPlaque: async (plaqueData: Omit<Plaque, 'id' | 'createdAt'>) => {
        try {
          const qrCode = await QRCode.toDataURL(plaqueData.numero);
          const newPlaque: Plaque = {
            ...plaqueData,
            id: Date.now().toString(),
            qrCode,
            createdAt: new Date().toISOString(),
          };
          
          set(state => ({
            plaques: [...state.plaques, newPlaque]
          }));
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      },
      
      updatePlaque: async (id: string, plaqueData: Partial<Plaque>) => {
        try {
          let qrCode = '';
          if (plaqueData.numero) {
            qrCode = await QRCode.toDataURL(plaqueData.numero);
          }
          
          set(state => ({
            plaques: state.plaques.map(plaque => 
              plaque.id === id ? { ...plaque, ...plaqueData, ...(qrCode && { qrCode }) } : plaque
            )
          }));
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      },
      
      deletePlaque: (id: string) => {
        set(state => ({
          plaques: state.plaques.filter(plaque => plaque.id !== id)
        }));
      },
      
      toggleDarkMode: () => {
        set(state => ({ darkMode: !state.darkMode }));
      },
      
      generatePlateNumber: () => {
        const year = new Date().getFullYear().toString().slice(-2);
        const sequence = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return `${sequence}/${year}/${letter}`;
      },
    }),
    {
      name: 'app-storage',
    }
  )
);