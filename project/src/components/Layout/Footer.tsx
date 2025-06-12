import React from 'react';
import { useAppStore } from '../../store/appStore';

const Footer: React.FC = () => {
  const { darkMode } = useAppStore();

  return (
    <footer className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} border-t border-gray-200 dark:border-gray-700 py-6 mt-8`}>
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center">
            <div className="text-yellow-400 text-xs font-bold">🌿</div>
          </div>
        </div>
        <p className="text-sm">
          <span className="text-blue-500">Copyright © 2024.</span> Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;