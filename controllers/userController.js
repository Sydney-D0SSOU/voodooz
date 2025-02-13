const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Client = require('../models/client');
const SuperAdmin = require('../models/superadmin');
require('dotenv').config(); // Charger les variables d'environnement à partir du fichier .env

/**
 * Connexion d'un utilisateur
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );

    const id = user.id;

    let userDetails = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      phone: user.phone,
      pays: user.pays,
      ville: user.ville
    };

    let roleDetails = {};
    let roleId = null;

    // Vérifier les différents rôles et récupérer l'ID associé


    const client = await Client.findOne({ where: { userId: id } });
    if (client) {
      roleDetails = { role: 'Client' };
      roleId = client.idClient;
    }

   

    const superAdmin = await SuperAdmin.findOne({ where: { userId: id } });
    if (superAdmin) {
      roleDetails = { role: 'SuperAdmin' };
      roleId = superAdmin.idSuper;
    }

    // Inclure le roleId dans les détails de l'utilisateur
    res.status(200).json({ 
      token, 
      user: { 
        ...userDetails, 
        ...roleDetails, 
        roleId 
      } 
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erreur du serveur' });
  }
};

module.exports = {
  loginUser,
};
