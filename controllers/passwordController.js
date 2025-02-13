const crypto = require('crypto'); // Pour générer un token aléatoire
const bcrypt = require('bcrypt'); // Pour hacher les mots de passe
const User = require('../models/user'); // Modèle de la table User
const mailer = require('../config/mailer'); // Importer votre configuration nodemailer
const { Op } = require('sequelize');
const fs = require('fs'); // Module pour lire les fichiers

// Fonction pour générer un token et l'envoyer par email (dans User ou Agence)
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    // Rechercher l'utilisateur dans les deux tables (User et Agences)
    const user = await User.findOne({ where: { email } });

    // Si aucun utilisateur ou agence trouvé avec cet email
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }

    // Si l'utilisateur ou l'agence existe, génère un token et une expiration
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = Date.now() + 3600000; // Le token expire dans 1 heure

    let entity;
    if (user) {
      // Mise à jour des champs pour l'utilisateur
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetPasswordExpires;
      await user.save();
      entity = user; // On affecte l'utilisateur comme entité trouvée
    } 

    // Envoyer l'email de réinitialisation
    await sendResetPasswordEmail(entity.email, resetToken);

    res.status(200).send('Email de réinitialisation envoyé');
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation de mot de passe:', error);
    res.status(500).send('Erreur serveur');
  }
};

// Fonction pour envoyer l'email de réinitialisation de mot de passe
const sendResetPasswordEmail = async (email, token) => {
  const resetURL = `http:localhost:3004?token=${token}`;

  // Lire le contenu du template HTML
  const templatePath = __dirname + '/../template/linksReset.html';
  let message = fs.readFileSync(templatePath, 'utf-8');

  // Remplacer le placeholder du lien par l'URL réelle
  message = message.replace('{{resetURL}}', resetURL);

  await mailer.sendMail({
    to: email,
    subject: 'Réinitialisation de mot de passe',
    html: message
  });
};

// Fonction pour gérer la réinitialisation du mot de passe avec le token
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Recherche de l'utilisateur avec un token valide dans User et Agence
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() } // Le token doit être non expiré
      }
    });



    // Si aucun utilisateur ni agence trouvé avec ce token
    if (!user ) {
      return res.status(400).send('Token invalide ou expiré');
    }

    let entity;
    if (user) {
      // Hachage du nouveau mot de passe pour l'utilisateur
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      // Réinitialisation des champs liés au token
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      entity = user;
    }

    res.status(200).send('Mot de passe réinitialisé avec succès');
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    res.status(500).send('Erreur serveur');
  }
};

module.exports = {
  requestPasswordReset,
  resetPassword
};
