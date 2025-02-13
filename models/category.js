'use strict';

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Vérifie que ce chemin est correct

class Category extends Model {
  /**
   * Helper method for defining associations.
   * Cette méthode est appelée automatiquement par Sequelize.
   */
  static associate(models) {
    // Une catégorie peut contenir plusieurs livres
    Category.hasMany(models.Livre, {
      foreignKey: 'categoryId',
      as: 'livres'
    });

    // Une catégorie est ajoutée par un SuperAdmin
    Category.belongsTo(models.SuperAdmin, {
      foreignKey: 'superAdminId',
      as: 'superAdmin'
    });
  }
}

Category.init({
  idCat: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  libelCat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  superAdminId: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Un SuperAdmin est toujours requis pour créer une catégorie
    references: {
      model: 'superadmins', // Nom de la table cible
      key: 'idSuper'        // Clé primaire du modèle cible
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'Category',
  tableName: 'categories'
});

module.exports = Category;
