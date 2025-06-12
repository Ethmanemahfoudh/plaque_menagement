import React, { useState } from 'react';
import { useAuthStore } from './store/authStore';
import { useAppStore } from './store/appStore';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import PlaquesManager from './components/Plaques/PlaquesManager';
import UsersManager from './components/Users/UsersManager';

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('accueil');
  const { isAuthenticated, user } = useAuthStore();
  const { darkMode } = useAppStore();

  if (!isAuthenticated) {
    return authMode === 'login' ? (
      <LoginForm onSwitchToRegister={() => setAuthMode('register')} />
    ) : (
      <RegisterForm onSwitchToLogin={() => setAuthMode('login')} />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'accueil':
        return <Dashboard />;
      case 'plaques':
        return <PlaquesManager />;
      case 'dashboard':
        return <Dashboard />;
      case 'departement':
        if (user?.role === 'admin') {
          return <UsersManager />;
        } else {
          return (
            <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} min-h-screen flex items-center justify-center`}>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-lg`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Accès Restreint
                </h2>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Cette section est réservée aux administrateurs.
                </p>
              </div>
            </div>
          );
        }
      case 'statistiques':
        return (
          <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} min-h-screen`}>
            <div className="container mx-auto px-6 py-6">
              <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Statistiques
              </h1>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-12`}>
                  Module de statistiques en cours de développement
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;