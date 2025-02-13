const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que ce chemin est correct

class User extends Model {}

User.init({
  nom: DataTypes.STRING,
  prenom: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
  pays: DataTypes.STRING,
  ville: DataTypes.STRING,
  resetPasswordToken: DataTypes.STRING,    // Champ pour stocker le token de réinitialisation
  resetPasswordExpires: DataTypes.DATE     // Champ pour stocker la date d'expiration du token
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;
