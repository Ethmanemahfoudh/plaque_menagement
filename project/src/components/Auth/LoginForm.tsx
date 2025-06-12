import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-sm font-medium text-left">
              <div className="text-gray-800">République Démocratique du Congo</div>
              <div className="text-gray-600">Ministère de Transport</div>
            </div>
            <div className="w-16 h-12 bg-blue-500 relative rounded">
              <div className="absolute inset-0 bg-blue-500"></div>
              <div className="absolute top-0 left-0 w-3 h-3 bg-yellow-400"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
              <div className="absolute bottom-0 left-2 right-2 h-1 bg-red-500"></div>
              <div className="absolute top-2 left-2 right-2 h-1 bg-red-500"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Connexion</h1>
        </div>

        {/* Demo Credentials */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Comptes de démonstration:</h3>
          <div className="text-sm text-blue-700">
            <p><strong>Admin:</strong> admin@transport.cd / admin123</p>
            <p><strong>Utilisateur:</strong> user@transport.cd / user123</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Connexion...' : 'Se connecter'}</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToRegister}
            className="text-blue-500 hover:text-blue-600 text-sm"
          >
            Pas encore de compte ? S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;