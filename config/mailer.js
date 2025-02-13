const nodemailer = require('nodemailer');
require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Serveur SMTP de Gmail
  port: 465, // Port SSL/TLS
  secure: true, // true pour 465
  auth: {
    user: process.env.EMAIL_USER, // Utiliser une variable d'environnement pour l'email
    pass: process.env.EMAIL_PASS // Utiliser une variable d'environnement pour le mot de passe
  }
});

module.exports = transporter;
