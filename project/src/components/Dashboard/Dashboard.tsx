import React from 'react';
import { Users, Car, BarChart3, Activity } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';

const Dashboard: React.FC = () => {
  const { users, plaques, darkMode } = useAppStore();
  const { user } = useAuthStore();

  const stats = [
    {
      title: 'Total Utilisateurs',
      value: users.length,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Total Plaques',
      value: plaques.length,
      icon: Car,
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Plaques ce mois',
      value: plaques.filter(p => {
        const date = new Date(p.createdAt);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length,
      icon: BarChart3,
      color: 'bg-purple-500',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Activité récente',
      value: plaques.filter(p => {
        const date = new Date(p.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return date >= weekAgo;
      }).length,
      icon: Activity,
      color: 'bg-orange-500',
      textColor: 'text-orange-600 dark:text-orange-400',
    },
  ];

  const recentPlaques = plaques
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} min-h-screen`}>
      <div className="container mx-auto px-6 py-6">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Tableau de Bord
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            Bienvenue, {user?.nom} {user?.prenom} - Vue d'ensemble du système
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Plaques */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Plaques Récentes
            </h2>
            <div className="space-y-4">
              {recentPlaques.length === 0 ? (
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-4`}>
                  Aucune plaque enregistrée
                </p>
              ) : (
                recentPlaques.map((plaque) => (
                  <div key={plaque.id} className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-mono">
                        {plaque.numero}
                      </div>
                      <div>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {plaque.nom} {plaque.postNom}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {plaque.district}, {plaque.province}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(plaque.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6`}>
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Actions Rapides
            </h2>
            <div className="space-y-3">
              {user?.role === 'admin' && (
                <button className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors text-left">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Gérer les Utilisateurs</p>
                      <p className="text-sm opacity-80">Ajouter, modifier ou supprimer des utilisateurs</p>
                    </div>
                  </div>
                </button>
              )}
              
              <button className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <Car className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Nouvelle Plaque</p>
                    <p className="text-sm opacity-80">Enregistrer une nouvelle plaque d'immatriculation</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors text-left">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5" />
                  <div>
                    <p className="font-medium">Voir les Statistiques</p>
                    <p className="text-sm opacity-80">Analyser les données et tendances</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm p-6 mt-6`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Informations Système
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Version de l'application</p>
              <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>v1.0.0</p>
            </div>
            <div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Dernière mise à jour</p>
              <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{new Date().toLocaleDateString('fr-FR')}</p>
            </div>
            <div>
              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Statut du système</p>
              <p className="text-green-600 font-medium">Opérationnel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;