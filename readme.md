# Projet Vodooz

## Description

Le projet Voodooz est une application de gestion de bibliothèque. Il permet de gérer les livres, les étagères, les catégories, les notes et les utilisateurs (clients, superadmins, etc.). L'application utilise Node.js, Express, Sequelize et une base de données relationnelle pour stocker les données.

# Acteurs du Système

| Acteur     | Description                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------ |
| SuperAdmin | Utilisateur ayant des privilèges élevés pour gérer les catégories, étagères, livres, etc. |
| Client     | Utilisateur qui peut consulter les livres, ajouter des notes, etc.                               |

## Commandes pour Démarrer le Projet et Autres

### Installation des Dépendances

Pour installer les dépendances du projet, exécutez la commande suivante :

```bash
npm install
```

### Démarrer le Serveur

```bash
npm run dev`
```

### Exéuter les migrations

```bash
npx sequelize-cli db:migrate
```

## Structure du Projet

/d:/voodooz
├── controllers
│   ├── categoryController.js
│   ├── etagereController.js
│   ├── livreController.js
│   ├── noteController.js
│   └── ...
├── migrations
│   ├── 20240809211157-create-user-table.js
│   ├── 20240809233641-create-superadmin-table.js
│   ├── ...
├── models
│   ├── category.js
│   ├── etagere.js
│   ├── livre.js
│   ├── note.js
│   └── ...
├── routes
│   ├── categoryRoutes.js
│   ├── etagereRoutes.js
│   ├── livreRoutes.js
│   ├── noteRoutes.js
│   └── ...
├── config
│   ├── config.js
│   ├── database.js
│   └── ...
├── middleware
│   ├── multerConfig.js
│   └── ...
├── app.js
├── package.json
└── README.md

```

```
