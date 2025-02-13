'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que ce chemin est correct

class SuperAdmin extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // Définition des associations ici si nécessaire
    // Par exemple, association avec le modèle User
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
      model: 'user', // Nom du modèle cible
      key: 'id'      // Clé primaire du modèle cible
    }
  }
}, {
  sequelize,
  modelName: 'SuperAdmin',
  tableName: 'superadmins' // Assurez-vous que ce nom correspond à votre table dans la base de données
});

module.exports = SuperAdmin;
