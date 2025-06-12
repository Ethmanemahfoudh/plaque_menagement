export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  nom: string;
  postNom: string;
  prenom: string;
  createdAt: string;
}

export interface Plaque {
  id: string;
  numero: string;
  nom: string;
  postNom: string;
  prenom: string;
  district: string;
  territoire: string;
  secteur: string;
  village: string;
  province: string;
  nationalite: string;
  adresse: string;
  telephone: string;
  email: string;
  qrCode: string;
  createdAt: string;
  createdBy: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
}

export interface AppState {
  users: User[];
  plaques: Plaque[];
  darkMode: boolean;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addPlaque: (plaque: Omit<Plaque, 'id' | 'createdAt'>) => void;
  updatePlaque: (id: string, plaque: Partial<Plaque>) => void;
  deletePlaque: (id: string) => void;
  toggleDarkMode: () => void;
  generatePlateNumber: () => string;
}