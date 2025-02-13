'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que ce chemin est correct

class Etagere extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // Définition des associations
    Etagere.hasMany(models.Livre, {
      foreignKey: 'etagereId',
      as: 'livres'
    });

    // Association avec SuperAdmin
    Etagere.belongsTo(models.SuperAdmin, {
      foreignKey: 'superAdminId',
      as: 'superAdmin'
    });
  }
}

Etagere.init({
  idEt: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  libelEt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  superAdminId: { // Ajout de la colonne superAdminId
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'SuperAdmins', // Assurez-vous que ce nom correspond à votre table SuperAdmins
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Etagere',
  tableName: 'etageres' // Assurez-vous que ce nom correspond à votre table dans la base de données
});

module.exports = Etagere;
