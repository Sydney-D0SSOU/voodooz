'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prenom: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pays: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ville: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // Ajout du champ pour stocker le token de réinitialisation
      resetPasswordToken: {
        type: Sequelize.STRING,
        allowNull: true, // Peut être null tant que l'utilisateur n'a pas demandé de réinitialisation
      },
      // Ajout du champ pour stocker la date d'expiration du token
      resetPasswordExpires: {
        type: Sequelize.DATE,
        allowNull: true, // Peut être null tant que l'utilisateur n'a pas demandé de réinitialisation
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
