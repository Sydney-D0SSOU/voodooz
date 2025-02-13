'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que ce chemin est correct

class SuperAdmin extends Model {
  static associate(models) {
    SuperAdmin.belongsTo(models.User, { 
      foreignKey: 'userId', 
      as: 'user' 
    });
  }
}

SuperAdmin.init({
  idSuper: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // Nom du modèle cible
      key: 'id'      // Clé primaire du modèle cible
    }
  }
}, {
  sequelize,
  modelName: 'SuperAdmin',
  tableName: 'superadmins' // Assurez-vous que ce nom correspond à votre table dans la base de données
});

module.exports = SuperAdmin;
