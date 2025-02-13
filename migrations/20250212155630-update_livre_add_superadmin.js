'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('livres', 'superAdminId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'superadmins', // Assurez-vous que ce nom correspond à votre table superadmins
        key: 'idSuper'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('livres', 'superAdminId');
  }
};
