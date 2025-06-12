import React from 'react';
import { X, Download } from 'lucide-react';
import { Plaque } from '../../types';
import { useAppStore } from '../../store/appStore';

interface PlaqueViewProps {
  plaque: Plaque;
  onClose: () => void;
}

const PlaqueView: React.FC<PlaqueViewProps> = ({ plaque, onClose }) => {
  const { darkMode } = useAppStore();

  const handleDownloadQR = () => {
    if (plaque.qrCode) {
      const link = document.createElement('a');
      link.href = plaque.qrCode;
      link.download = `plaque-${plaque.numero}.png`;
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-screen overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Détails de la Plaque
            </h2>
            <button
              onClick={onClose}
              className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Plate Number and QR Code */}
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Numéro de Plaque
                </h3>
                <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                  {plaque.numero}
                </p>
              </div>
              {plaque.qrCode && (
                <div className="text-center">
                  <img
                    src={plaque.qrCode}
                    alt="QR Code"
                    className="w-32 h-32 border rounded"
                  />
                  <button
                    onClick={handleDownloadQR}
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors flex items-center space-x-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Télécharger</span>
                  </button>
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Informations Personnelles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nom</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.nom}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Post-nom</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.postNom}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Prénom</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.prenom}</p>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Informations de Localisation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>District</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.district}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Territoire</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.territoire}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Secteur</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.secteur}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Village</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.village}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Province</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.province}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nationalité</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.nationalite}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Informations de Contact
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Adresse</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.adresse}</p>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Téléphone</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.telephone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>E-mail</label>
                  <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{plaque.email}</p>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className={`block font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Date de création</label>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(plaque.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div>
                  <label className={`block font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>ID de la plaque</label>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} font-mono`}>{plaque.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaqueView;