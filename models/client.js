'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assurez-vous que ce chemin est correct

class Client extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // Association avec la table User
    Client.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

    // Association avec la table Commande
    Client.hasMany(models.Commande, { foreignKey: 'clientId', as: 'commandes' });
  }
}

Client.init({
  idClient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user', // Assurez-vous que ce nom correspond au modèle défini dans 'models/User'
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Client',
  tableName: 'clients' // Assurez-vous que ce nom correspond à votre table
});

module.exports = Client;
