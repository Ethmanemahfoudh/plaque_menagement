import React, { useState, useEffect } from 'react';
import { Save, X, RotateCcw, QrCode } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { useAuthStore } from '../../store/authStore';
import { Plaque } from '../../types';
import QRCode from 'qrcode';

interface PlaqueFormProps {
  plaque?: Plaque | null;
  onClose: () => void;
}

const PlaqueForm: React.FC<PlaqueFormProps> = ({ plaque, onClose }) => {
  const [formData, setFormData] = useState({
    numero: '',
    nom: '',
    postNom: '',
    prenom: '',
    district: '',
    territoire: '',
    secteur: '',
    village: '',
    province: '',
    nationalite: 'Congolaise',
    adresse: '',
    telephone: '',
    email: '',
  });
  
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { addPlaque, updatePlaque, generatePlateNumber, darkMode } = useAppStore();
  const { user } = useAuthStore();

  // Sample data for dropdowns
  const districts = ['Lukaya', 'Kasangulu', 'Madimba', 'Kimvula'];
  const territoires = ['Madimba', 'Kasangulu', 'Lukaya', 'Kimvula'];
  const provinces = ['Kongo-Central', 'Kinshasa', 'Bandundu', 'Bas-Congo'];
  const secteurs = ['Secteur 1', 'Secteur 2', 'Secteur 3'];
  const villages = ['Ngeba', 'Lemba', 'Matadi', 'Boma'];

  useEffect(() => {
    if (plaque) {
      setFormData({
        numero: plaque.numero,
        nom: plaque.nom,
        postNom: plaque.postNom,
        prenom: plaque.prenom,
        district: plaque.district,
        territoire: plaque.territoire,
        secteur: plaque.secteur,
        village: plaque.village,
        province: plaque.province,
        nationalite: plaque.nationalite,
        adresse: plaque.adresse,
        telephone: plaque.telephone,
        email: plaque.email,
      });
      if (plaque.qrCode) {
        setQrCodeUrl(plaque.qrCode);
      }
    }
  }, [plaque]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateNumber = () => {
    const newNumber = generatePlateNumber();
    setFormData({
      ...formData,
      numero: newNumber,
    });
  };

  const handleGenerateQR = async () => {
    if (!formData.numero) {
      alert('Veuillez d\'abord générer un numéro de plaque');
      return;
    }
    
    try {
      const qrCode = await QRCode.toDataURL(formData.numero);
      setQrCodeUrl(qrCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Erreur lors de la génération du code QR');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const plaqueData = {
        ...formData,
        qrCode: qrCodeUrl,
        createdBy: user?.id || '',
      };

      if (plaque) {
        await updatePlaque(plaque.id, plaqueData);
      } else {
        await addPlaque(plaqueData);
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving plaque:', error);
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {plaque ? 'Modifier la Plaque' : 'Ajouter une Plaque'}
        </h2>
        <button
          onClick={onClose}
          className={`p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Nom
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Post-nom
            </label>
            <input
              type="text"
              name="postNom"
              value={formData.postNom}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Prénom
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
        </div>

        {/* Location Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              District
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            >
              <option value="">Sélectionner le district</option>
              {districts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Territoire
            </label>
            <select
              name="territoire"
              value={formData.territoire}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            >
              <option value="">Sélectionner le territoire</option>
              {territoires.map(territoire => (
                <option key={territoire} value={territoire}>{territoire}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Secteur
            </label>
            <select
              name="secteur"
              value={formData.secteur}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            >
              <option value="">Sélectionner le secteur</option>
              {secteurs.map(secteur => (
                <option key={secteur} value={secteur}>{secteur}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Village
            </label>
            <select
              name="village"
              value={formData.village}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            >
              <option value="">Sélectionner le village</option>
              {villages.map(village => (
                <option key={village} value={village}>{village}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Province
            </label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            >
              <option value="">Sélectionner la province</option>
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Nationalité
          </label>
          <select
            name="nationalite"
            value={formData.nationalite}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required
          >
            <option value="Congolaise">Congolaise</option>
            <option value="Étrangère">Étrangère</option>
          </select>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Adresse
            </label>
            <input
              type="text"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Téléphone
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
        </div>

        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>

        {/* Plate Number Generation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Numéro de plaque
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="Format: 0001/01/A"
                required
              />
              <button
                type="button"
                onClick={handleGenerateNumber}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Générer</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Code QR
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleGenerateQR}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Générer le code-barre</span>
              </button>
            </div>
            {qrCodeUrl && (
              <div className="mt-2">
                <img src={qrCodeUrl} alt="QR Code" className="w-24 h-24 border rounded" />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className={`px-6 py-2 rounded-lg border transition-colors ${
              darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Enregistrement...' : 'Enregistrer'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaqueForm;