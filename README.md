# Système de Gestion des Plaques d'Immatriculation

Une application web moderne développée avec React et TypeScript pour la gestion des plaques d'immatriculation.

## Fonctionnalités

- Gestion complète des plaques (ajout, modification, suppression, consultation)
- Génération automatique de numéros de plaque
- Génération de codes QR
- Interface utilisateur moderne et responsive
- Mode sombre/clair
- Gestion des utilisateurs
- Tableau de bord avec statistiques

## Technologies Utilisées

- React 18
- TypeScript
- Tailwind CSS
- Zustand (gestion d'état)
- Vite
- Lucide Icons

## Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## Installation

1. Cloner le repository
```bash
git clone https://github.com/Ethmanemahfoudh/plaque_menagement.git
cd plaque_menagement
```

2. Installer les dépendances
```bash
npm install
# ou
yarn install
```

3. Lancer l'application en mode développement
```bash
npm run dev
# ou
yarn dev
```

4. Ouvrir [http://localhost:5173](http://localhost:5173) dans votre navigateur

## Structure du Projet

```
src/
├── components/     # Composants React
├── store/         # Gestion d'état (Zustand)
├── types/         # Types TypeScript
└── utils/         # Fonctions utilitaires
```

## Fonctionnalités Principales

### Gestion des Plaques
- Création de nouvelles plaques
- Modification des informations
- Suppression de plaques
- Visualisation détaillée
- Génération de codes QR

### Interface Utilisateur
- Design moderne et responsive
- Mode sombre/clair
- Navigation intuitive
- Tableau de bord interactif

### Sécurité
- Authentification des utilisateurs
- Gestion des sessions
- Protection des routes

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.
