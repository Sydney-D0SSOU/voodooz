'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que ce chemin est correct

class Livre extends Model {
  static associate(models) {
    Livre.belongsTo(models.Etagere, {
      foreignKey: 'etagereId',
      as: 'etagere'
    });

    Livre.belongsTo(models.SuperAdmin, {
      foreignKey: 'superAdminId',
      as: 'superAdmin'
    });
  }
}

Livre.init({
  idLiv: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titreLiv: {
    type: DataTypes.STRING,
    allowNull: false
  },
  auteurLivre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateLiv: {
    type: DataTypes.DATE,
    allowNull: false
  },
  imageLiv: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fileLiv: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  etagereId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'etageres',
      key: 'idEt'
    }
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
  modelName: 'Livre',
  tableName: 'livres'
});

module.exports = Livre;
