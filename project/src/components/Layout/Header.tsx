import React from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useAppStore } from '../../store/appStore';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuthStore();
  const { darkMode, toggleDarkMode } = useAppStore();

  const tabs = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'plaques', label: 'Plaques' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'departement', label: 'Département' },
    { id: 'statistiques', label: 'Statistiques' },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-sm`}>
      {/* App Title and Logo */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium text-left">
            <div className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>République Démocratique du Congo</div>
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Ministère de Transport</div>
          </div>
          <div className="w-16 h-12 bg-blue-500 relative rounded">
            {/* DRC Flag representation */}
            <div className="absolute inset-0 bg-blue-500"></div>
            <div className="absolute top-0 left-0 w-3 h-3 bg-yellow-400"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-0 left-2 right-2 h-1 bg-red-500"></div>
            <div className="absolute top-2 left-2 right-2 h-1 bg-red-500"></div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {user?.nom} {user?.prenom} ({user?.role})
          </span>
          
          <button
            onClick={logout}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6">
        <div className="flex space-x-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : `${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;