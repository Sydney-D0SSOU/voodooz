'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Vérifie le chemin

class Note extends Model {
  static associate(models) {
    // Une note appartient à un client
    Note.belongsTo(models.Client, {
      foreignKey: 'clientId',
      as: 'client'
    });

    // Une note concerne un livre
    Note.belongsTo(models.Livre, {
      foreignKey: 'livreId',
      as: 'livre'
    });

    // Ajout de l'association inverse pour récupérer les notes d'un livre
    models.Livre.hasMany(Note, {
      foreignKey: 'livreId',
      as: 'notes'
    });
  }
}

Note.init({
  idNote: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  textNote: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateNote: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clients',
      key: 'idClient'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  livreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'livres',
      key: 'idLiv'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'Note',
  tableName: 'notes'
});

module.exports = Note;
