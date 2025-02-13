const express = require('express');
const { sequelize } = require('./models'); // Instance Sequelize
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');  
const bodyParser = require('body-parser');
require('dotenv').config();

// Importation des routes
const clientRouter = require('./routes/clientRoutes');
const superRouter = require('./routes/superRoutes');
const loginRouter = require('./routes/loginRoutes');
const resetRouter = require('./routes/passwordRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const etagereRoutes = require('./routes/etagereRoutes');
const livreRoutes = require('./routes/livreRoutes');
const noteRoutes = require('./routes/noteRoutes');
const app = express();
const port = process.env.PORT || 3001;

// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation test  Backend_Voodooz',
      version: '1.0.0',
      description: 'Documentation for my Node.js backend API/backend of library app ',
    },
    servers: [
      {
        url: '', // Remplacez par l'URL de votre serveur
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);



// Middlewares globaux
app.use(helmet());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json());

// Configuration CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Routes principales
app.use('/client', clientRouter);
app.use('/auth', loginRouter);
app.use('/superadmin', superRouter);
app.use('/password', resetRouter);
app.use('/category', categoryRoutes);
app.use('/etagere', etagereRoutes);
app.use('/livre', livreRoutes);
app.use('/note', noteRoutes);
// Test de connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connexion à la base de données réussie.');
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Serveur en écoute sur le port ${port}`);
      console.log(`📖 Documentation Swagger disponible à l'adresse: \x1b[34m\x1b[4mhttp://localhost:${port}/api-docs\x1b[0m`);
    });
  })
  .catch((err) => {
    console.error('❌ Impossible de se connecter à la base de données:', err);
  });

module.exports = app;
