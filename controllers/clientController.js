const Client = require('../models/client');
const User = require('../models/user') ;
const bcrypt = require('bcrypt');
const mailer = require('../config/mailer'); // Importer votre configuration nodemailer
const path = require('path');
const fs = require('fs');
require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env
const handlebars = require('handlebars');

// Inscription d'un client (création d'un utilisateur et d'un client)
exports.registerClient = async (req, res) => {
  try {
    const { nom, prenom, email, password, phone, pays, ville } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      phone,
      pays,
      ville
    });

    const newClient = await Client.create({
      userId: newUser.id
    });
// Lire le contenu du fichier HTML (template d'email)
const templatePath = path.join(__dirname, '../template/createClient.html');
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

// Compiler le template avec Handlebars
const template = handlebars.compile(htmlTemplate);

// Remplacer les variables dans le template
const replacements = {
  nom: nom,
  email: email,
  password: password, // Mot de passe en clair envoyé par email
};

const htmlToSend = template(replacements);

// Envoyer l'email à l'adminpays nouvellement créée
await mailer.sendMail({
  from: 'sydneydossou400@gmail.com', // Adresse de l'expéditeur
  to: email, // Adresse de l'adminpays (email de destination)
  subject: 'Votre compte a été créé avec succès',
  html: htmlToSend, // Contenu HTML du mail
});
    res.status(201).json({
      client: newClient,
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer tous les clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un client par son ID
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id, {
      include: [{ model: User, as: 'user' }]
    });

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un client par son ID
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email, phone, pays, ville } = req.body;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    const user = await User.findByPk(client.userId);

    // Mettre à jour les informations utilisateur associées
    await user.update({ nom, prenom, email, phone, pays, ville });

    res.status(200).json({ message: 'Client mis à jour avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un client par son ID
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client non trouvé.' });
    }

    const user = await User.findByPk(client.userId);

    // Supprimer le client et l'utilisateur associé
    await client.destroy();
    await user.destroy();

    res.status(200).json({ message: 'Client supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
