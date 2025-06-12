import { Edit, Eye, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Plaque } from '../../types';
import PlaqueForm from './PlaqueForm';
import PlaqueView from './PlaqueView';

const PlaquesManager: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('contrôler');
  const [selectedPlaque, setSelectedPlaque] = useState<Plaque | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editingPlaque, setEditingPlaque] = useState<Plaque | null>(null);
  
  const { plaques, deletePlaque, darkMode } = useAppStore();
  const { user } = useAuthStore();

  const subTabs = [
    { id: 'contrôler', label: 'Contrôler' },
  ];

  const handleEdit = (plaque: Plaque) => {
    setEditingPlaque(plaque);
    setIsFormOpen(true);
    setActiveSubTab('modifier');
  };

  const handleView = (plaque: Plaque) => {
    setSelectedPlaque(plaque);
    setIsViewOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette plaque ?')) {
      deletePlaque(id);
    }
  };

  const handleAddNew = () => {
    setEditingPlaque(null);
    setIsFormOpen(true);
    setActiveSubTab('ajouter');
  };

  const renderContent = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Liste des Plaques
          </h2>
          <button
            onClick={handleAddNew}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Plaque</span>
          </button>
        </div>
        
        <div className="grid gap-4">
          {plaques.map((plaque) => (
            <div key={plaque.id} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-mono">
                      {plaque.numero}
                    </span>
                    <span className={`${darkMode ? 'text-white' : 'text-gray-800'} font-medium`}>
                      {plaque.nom} {plaque.postNom} {plaque.prenom}
                    </span>
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p>{plaque.district}, {plaque.territoire} - {plaque.province}</p>
                    <p>{plaque.telephone} | {plaque.email}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(plaque)}
                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(plaque)}
                    className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(plaque.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {plaques.length === 0 && (
            <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <p>Aucune plaque enregistrée</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} min-h-screen`}>
      <div className="container mx-auto px-6 py-6">
        {/* Content */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm min-h-96`}>
          <div className="p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Modals */}
      {isFormOpen && (
        <PlaqueForm
          plaque={editingPlaque}
          onClose={() => {
            setIsFormOpen(false);
            setEditingPlaque(null);
          }}
        />
      )}
      
      {isViewOpen && selectedPlaque && (
        <PlaqueView
          plaque={selectedPlaque}
          onClose={() => {
            setIsViewOpen(false);
            setSelectedPlaque(null);
          }}
        />
      )}
    </div>
  );
};

export default PlaquesManager;