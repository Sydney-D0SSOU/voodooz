'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('livres', {
      idLiv: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      titreLiv: {
        type: Sequelize.STRING,
        allowNull: false
      },
      auteurLivre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateLiv: {
        type: Sequelize.DATE,
        allowNull: false
      },
      imageLiv: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fileLiv: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'categories', // Nom de la table cible
          key: 'idCat'         // Clé primaire de la table cible
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      etagereId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'etageres', // Nom de la table cible
          key: 'idEt'         // Clé primaire de la table cible
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('livres');
  }
};
